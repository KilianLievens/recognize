import {
  IAppAccessors,
  IConfigurationExtend,
  IHttp,
  ILogger,
  IModify,
  IPersistence,
  IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { ApiSecurity, ApiVisibility } from '@rocket.chat/apps-engine/definition/api';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { RoomType } from '@rocket.chat/apps-engine/definition/rooms';
import { InputElementDispatchAction, UIKitBlockInteractionContext } from '@rocket.chat/apps-engine/definition/uikit';
import { verify } from 'jsonwebtoken';
import { VerifyCommand } from './commands/verify';
import VerifyUserEndpoint from './endpoints/verify-user.endpoint';
import { NameInputType } from './name-input/name-input.model';
import NameInputPersistence from './name-input/name-input.persistence';
import { AppSetting, settings } from './settings';
import { IDecryptedToken } from './verified-user/verified-user.model';
import VerifiedUserPersistence from './verified-user/verified-user.persistence';

export class RecognizeApp extends App {
  constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
    super(info, logger, accessors);
  }

  public async extendConfiguration(
    configuration: IConfigurationExtend,
  ): Promise<void> {
    await Promise.all(settings.map((setting) => configuration.settings.provideSetting(setting)));

    const verifyCommand: VerifyCommand = new VerifyCommand();
    await configuration.slashCommands.provideSlashCommand(verifyCommand);

    await configuration.api.provideApi({
      visibility: ApiVisibility.PUBLIC,
      security: ApiSecurity.UNSECURE,
      endpoints: [new VerifyUserEndpoint(this)],
    });
  }

  // TODO when not in hackathon mode: split into button handler files
  public async executeBlockActionHandler(
    context: UIKitBlockInteractionContext,
    read: IRead,
    http: IHttp,
    persis: IPersistence,
    modify: IModify,
  ) {
    const data = context.getInteractionData();

    if (['input-verification'].includes(data.actionId)) {
      const creator = modify.getCreator();
      const roomReader = read.getRoomReader();
      const inputBlocks = creator.getBlockBuilder();
      const appUser = (await read.getUserReader().getAppUser())!;

      const roomBuilder = creator.startRoom();
      roomBuilder.setType(RoomType.DIRECT_MESSAGE);
      roomBuilder.setCreator(appUser);
      roomBuilder.setMembersToBeAddedByUsernames([data.user.username, appUser.username]);
      const roomId = await creator.finish(roomBuilder);

      const privateRoom = await roomReader.getById(roomId);

      inputBlocks.addSectionBlock({
        text: inputBlocks.newPlainTextObject('Please confirm the identity of the video participant:'),
      });

      inputBlocks.addInputBlock({
        label: inputBlocks.newPlainTextObject('First Name'),
        blockId: data.blockId,
        element: inputBlocks.newPlainTextInputElement({
          actionId: 'submitVerifiedFirstName',
          multiline: false,
          placeholder: inputBlocks.newPlainTextObject('John'),
          dispatchActionConfig: [InputElementDispatchAction.ON_CHARACTER_ENTERED],
        }),
      });

      inputBlocks.addInputBlock({
        label: inputBlocks.newPlainTextObject('Last Name'),
        blockId: data.blockId,
        element: inputBlocks.newPlainTextInputElement({
          actionId: 'submitVerifiedLastName',
          multiline: false,
          placeholder: inputBlocks.newPlainTextObject('Doe'),
          dispatchActionConfig: [InputElementDispatchAction.ON_CHARACTER_ENTERED],
        }),
      });

      inputBlocks.addActionsBlock({
        elements: [inputBlocks.newButtonElement({
          text: inputBlocks.newPlainTextObject('Submit'),
          actionId: 'submit-input-verification',
          // TODO: value?
        })],
        blockId: data.blockId,
      });

      if (privateRoom == null) {
        throw new Error('Could not find room');
      }

      await creator.finish(
        creator.startMessage({ sender: appUser, room: privateRoom, blocks: inputBlocks.getBlocks() }),
      );

      return { success: true };
    }

    if (['submitVerifiedFirstName', 'submitVerifiedLastName'].includes(data.actionId)) {
      if (data.value == null) {
        throw new Error('No name input value found');
      }

      await NameInputPersistence.createNameInput(persis, {
        id: `${data.blockId}-${data.actionId}`,
        type: data.actionId === 'submitVerifiedFirstName' ? NameInputType.FIRST : NameInputType.LAST,
        nameValue: data.value,
      });

      return { success: true };
    }

    if (['submit-input-verification'].includes(data.actionId)) {
      if (data.message?.id == null) {
        throw new Error('Could not find submit message');
      }

      const appSecret = await read.getEnvironmentReader().getSettings().getValueById(AppSetting.AppSecret);
      const decryptedState = verify(data.blockId, appSecret) as IDecryptedToken;

      // TODO
      const firstName = (await NameInputPersistence.findNameInputs(read.getPersistenceReader(), `${data.blockId}-submitVerifiedFirstName`))[0];
      const lastName = (await NameInputPersistence.findNameInputs(read.getPersistenceReader(), `${data.blockId}-submitVerifiedLastName`))[0];

      // We should map whatever response we get a User object
      await VerifiedUserPersistence.createVerifiedUser(persis, {
        verifiedAt: new Date(),
        id: decryptedState.userToken, // TODO
        firstName: firstName.nameValue,
        lastName: lastName.nameValue,
        identificationRequestedBy: decryptedState.identificationRequestedBy,
        identifiedBy: decryptedState.identifiedBy,
        signature: data.blockId,
        username: decryptedState.username,
      });

      const updater = modify.getUpdater();
      const creator = modify.getCreator();
      const appUser = (await read.getUserReader().getAppUser())!;

      const editBlocks = creator.getBlockBuilder();

      editBlocks.addSectionBlock({
        text: editBlocks.newPlainTextObject('Thank you for verifying.'),
      });

      const updatedMessageBuilder = await updater.message(data.message.id, appUser);
      updatedMessageBuilder.setBlocks(editBlocks.getBlocks());
      updatedMessageBuilder.setEditor(appUser);
      await updater.finish(updatedMessageBuilder);

      const updatedMessageBuilderTwo = await updater.message(decryptedState.verificationMessageId, appUser);
      updatedMessageBuilderTwo.setBlocks(editBlocks.getBlocks());
      updatedMessageBuilderTwo.setEditor(appUser);
      await updater.finish(updatedMessageBuilderTwo);

      return { success: true };
    }

    return { success: true };
  }
}
