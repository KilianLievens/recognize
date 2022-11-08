import { IHttp, IMessageBuilder, IModify, IModifyCreator, IPersistence, IRead } from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { ISlashCommand, SlashCommandContext } from "@rocket.chat/apps-engine/definition/slashcommands";
import { IUser } from "@rocket.chat/apps-engine/definition/users";

export class VerifyCommand implements ISlashCommand {
  public command: string = 'verify';
  public i18nDescription: string = 'Verify the identity of a user';
  public i18nParamsExample = "";
  public providesPreview: boolean = false;

  public async executor(
    context: SlashCommandContext,
    read: IRead,
    modify: IModify,
    _http: IHttp,
    _persis: IPersistence
  ): Promise<void> {
    const creator: IModifyCreator = modify.getCreator()
    const notifier = modify.getNotifier();
    const appUser: IUser = (await read.getUserReader().getAppUser()) as IUser
    const senderUser: IUser = context.getSender();
    const room: IRoom = context.getRoom()

    const roomMembers = await read.getRoomReader().getMembers(room.id)
    const everybodyButSender = roomMembers.filter(u => u.id !== senderUser.id);

    if (everybodyButSender.length === 0) {
      notifier.notifyUser(
        senderUser, {
        sender: appUser,
        room,
        text: 'Nobody to verify? :thinking:'
      });
      return
    }

    const messageBuilder: IMessageBuilder = creator.startMessage({
      sender: appUser,
      room,
      text: 'User verification started :sleuth_or_spy:'
    })
    await creator.finish(messageBuilder)

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
          actionId: 'verify-button'
        }),
      ]
    });

    for (const guy of everybodyButSender) {
      notifier.notifyUser(
        guy, {
        sender: appUser,
        room,
        blocks: blocks.getBlocks()
      });
    }
  }
}
