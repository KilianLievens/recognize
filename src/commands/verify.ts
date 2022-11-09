import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import {ISlashCommand, SlashCommandContext} from '@rocket.chat/apps-engine/definition/slashcommands';
import {sign} from 'jsonwebtoken';
import {AppSetting} from '../settings';
import {IDecryptedToken, IdentificationMethods } from '../verified-user/verified-user.model';

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
    const notifier = modify.getNotifier();
    const appUser = (await read.getUserReader().getAppUser())!;
    const senderUser = context.getSender();
    const room = context.getRoom();

    // @ts-ignore
    const visitor: IVisitor = room.visitor;

    const blocks = creator.getBlockBuilder();

    blocks.addSectionBlock({
      text: blocks.newPlainTextObject(`${senderUser.name} has requested you to verify your identity. Please use your preferred verification process:`),
    });

    const appSecret = await read.getEnvironmentReader().getSettings().getValueById(AppSetting.AppSecret);

    blocks.addActionsBlock({
      blockId: 'this-is-my-block-id',
      elements: [
        blocks.newButtonElement({
          url: `https://recognize-landing.vercel.app/itsme/index.html${this.createStateString(room.id, senderUser.id, visitor.token, IdentificationMethods.ITSME, appSecret)}`,
          text: blocks.newPlainTextObject('Verify with itsme'),
          actionId: 'verify-button',
        }),
        blocks.newButtonElement({
          url: `https://www.pexip.com${this.createStateString(room.id, senderUser.id, visitor.token, IdentificationMethods.PEXIP, appSecret)}`,
          text: blocks.newPlainTextObject('Verify with a video call'),
          actionId: 'verify-button',
        }),
      ],
    });

    notifier.notifyUser(
      senderUser, {
      sender: appUser,
      room,
      text: 'Please do not interact with the below message.',
    });

    await creator.finish(
      creator.startMessage({
        sender: appUser,
        room,
        blocks: blocks.getBlocks(),
      }),
    );
  }

  private createStateString(
      roomId: string,
      requestedById: string,
      nonVerifiedUserId: string,
      method: IdentificationMethods,
      secret: string,
      ): string {
    return `?state=${sign({
      roomId,
      userId: nonVerifiedUserId,
      identificationRequestedBy: requestedById,
      identifiedBy: method,
    } as IDecryptedToken, secret)}`;
  }
}
