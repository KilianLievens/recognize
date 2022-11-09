import {
  IHttp,
  IModify,
  IPersistence,
  IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { sign } from 'jsonwebtoken';
import { AppSetting } from '../settings';
import { IDecryptedToken, IdentificationMethods } from '../verified-user/verified-user.model';

export class VerifyCommand implements ISlashCommand {
  public command: string = 'verify';
  public i18nDescription: string = 'Verify the identity of a user';
  public i18nParamsExample = '';
  public providesPreview: boolean = false;

  public async executor(
    context: SlashCommandContext,
    read: IRead,
    modify: IModify,
    http: IHttp,
    persist: IPersistence,
  ): Promise<void> {
    const creator = modify.getCreator();
    const updater = modify.getUpdater();
    const notifier = modify.getNotifier();
    const appUser = (await read.getUserReader().getAppUser())!;
    const senderUser = context.getSender();
    const room = context.getRoom();

    // @ts-ignore
    const visitor: IVisitor = room.visitor;

    notifier.notifyUser(
      senderUser, {
      sender: appUser,
      room,
      text: 'Please do not interact with the below message.',
    });

    const messageId = await creator.finish(
      creator.startMessage({ sender: appUser, room, text: 'Pending...' }),
    );

    const appSecret = await read.getEnvironmentReader().getSettings().getValueById(AppSetting.AppSecret);

    const stateStringInput: Omit<IDecryptedToken, 'identifiedBy'> = {
      roomId: room.id,
      userToken: visitor.token,
      identificationRequestedBy: senderUser.id,
      verificationMessageId: messageId,
    };

    const blocks = creator.getBlockBuilder();

    blocks.addSectionBlock({
      text: blocks.newPlainTextObject(`${senderUser.name} has requested you to verify your identity. Please use your preferred verification process:`),
    });

    blocks.addActionsBlock({
      blockId: 'this-is-my-block-id',
      elements: [
        blocks.newButtonElement({
          url: `https://recognize-landing.vercel.app/itsme/index.html${this.createStateString({ ...stateStringInput, identifiedBy: IdentificationMethods.ITSME }, appSecret)}`,
          text: blocks.newPlainTextObject('Verify with itsme'),
          actionId: 'verify-button',
        }),
        blocks.newButtonElement({
          url: `https://www.pexip.com${this.createStateString({ ...stateStringInput, identifiedBy: IdentificationMethods.PEXIP }, appSecret)}`,
          text: blocks.newPlainTextObject('Verify with a video call'),
          actionId: 'verify-button',
        }),
      ],
    });

    const updatedMessageBuilder = await updater.message(messageId, appUser);
    updatedMessageBuilder.setBlocks(blocks.getBlocks());
    updatedMessageBuilder.setEditor(appUser);
    await updater.finish(updatedMessageBuilder);
  }

  private createStateString(input: IDecryptedToken, secret: string): string {
    return `?state=${sign(input, secret)}`;
  }
}
