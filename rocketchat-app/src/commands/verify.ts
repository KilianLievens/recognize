import {
  IHttp,
  IModify,
  IPersistence,
  IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { IVisitor } from '@rocket.chat/apps-engine/definition/livechat';
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

    const createBlocks = creator.getBlockBuilder();

    createBlocks.addSectionBlock({
      text: createBlocks.newPlainTextObject('Pending...'),
    });

    const messageId = await creator.finish(
      creator.startMessage({ sender: appUser, room, blocks: createBlocks.getBlocks() }),
    );

    const appSecret = await read.getEnvironmentReader().getSettings().getValueById(AppSetting.AppSecret);

    const stateStringInput: Omit<IDecryptedToken, 'identifiedBy'> = {
      roomId: room.id,
      userToken: visitor.token,
      identificationRequestedBy: senderUser.id,
      verificationMessageId: messageId,
      username: visitor.username,
    };

    const editBlocks = creator.getBlockBuilder();

    editBlocks.addSectionBlock({
      text: editBlocks.newPlainTextObject(`${senderUser.name} has requested you to verify your identity. Please use your preferred verification process:`),
    });

    editBlocks.addActionsBlock({
      blockId: 'this-is-my-block-id',
      elements: [
        editBlocks.newButtonElement({
          url: `https://recognize-landing.vercel.app/itsme/index.html${this.createStateString({ ...stateStringInput, identifiedBy: IdentificationMethods.ITSME }, appSecret, visitor.name)}`,
          text: editBlocks.newPlainTextObject('Verify with itsme'),
          actionId: 'verify-button',
        }),
        editBlocks.newButtonElement({
          url: `https://www.pexip.com${this.createStateString({ ...stateStringInput, identifiedBy: IdentificationMethods.PEXIP }, appSecret, visitor.name)}`,
          text: editBlocks.newPlainTextObject('Verify with a video call'),
          actionId: 'verify-button',
        }),
      ],
    });

    const updatedMessageBuilder = await updater.message(messageId, appUser);
    updatedMessageBuilder.setBlocks(editBlocks.getBlocks());
    updatedMessageBuilder.setEditor(appUser);
    updatedMessageBuilder.setText('');
    await updater.finish(updatedMessageBuilder);
  }

  private createStateString(input: IDecryptedToken, secret: string, name: string): string {
    return `?state=${sign(input, secret)}&name=${name}`;
  }
}
