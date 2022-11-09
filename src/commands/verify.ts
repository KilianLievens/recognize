import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';

export class VerifyCommand implements ISlashCommand {
  public command: string = 'verify';
  public i18nDescription: string = 'Verify the identity of a user';
  public i18nParamsExample = '';
  public providesPreview: boolean = false;

  public async executor(
    context: SlashCommandContext,
    read: IRead,
    modify: IModify,
    _http: IHttp,
    _persist: IPersistence,
  ): Promise<void> {
    const creator = modify.getCreator();
    const notifier = modify.getNotifier();
    const appUser = (await read.getUserReader().getAppUser())!;
    const senderUser = context.getSender();
    const room = context.getRoom();

    const blocks = creator.getBlockBuilder();

    blocks.addSectionBlock({
      text: blocks.newPlainTextObject(`${senderUser.name} has requested you to verify your identity. Please use your preferred verification process:`),
    });

    blocks.addActionsBlock({
      blockId: 'this-is-my-block-id',
      elements: [
        blocks.newButtonElement({
          url: 'https://www.itsme-id.com/',
          text: blocks.newPlainTextObject('Verify with itsme'),
          actionId: 'verify-button',
        }),
        blocks.newButtonElement({
          url: 'https://www.pexip.com',
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
}
