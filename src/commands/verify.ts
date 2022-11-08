import { IHttp, IMessageBuilder, IModify, IModifyCreator, IPersistence, IRead, IUIController } from "@rocket.chat/apps-engine/definition/accessors";
import { IMessage } from "@rocket.chat/apps-engine/definition/messages";
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
    http: IHttp,
    persis: IPersistence
  ): Promise<void> {
    const creator: IModifyCreator = modify.getCreator()
    const sender: IUser = (await read.getUserReader().getAppUser()) as IUser
    const room: IRoom = context.getRoom()

    const blocks = creator.getBlockBuilder();
    blocks.addActionsBlock({
      blockId: 'this-is-my-block-id',
      elements: [
        blocks.newButtonElement({
          url: 'https://www.google.com',
          text: blocks.newPlainTextObject('itsme'),
          actionId: 'verify-button',
        }),
        blocks.newButtonElement({
          url: 'https://www.pexip.com',
          text: blocks.newPlainTextObject('pexip'),
          actionId: 'verify-button'
        }),
      ]
    });

    const messageTemplate: IMessage = {
      sender,
      room,
      blocks: blocks.getBlocks()
    }
    const messageBuilder: IMessageBuilder = creator.startMessage(messageTemplate)
    await creator.finish(messageBuilder)
  }

}
