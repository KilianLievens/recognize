import {
  IHttp,
  IModify,
  IPersistence,
  IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { IVisitor } from '@rocket.chat/apps-engine/definition/livechat';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { IButtonElement } from '@rocket.chat/apps-engine/definition/uikit';
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

    const editBlocks = creator.getBlockBuilder();

    editBlocks.addSectionBlock({
      text: editBlocks.newPlainTextObject(`${senderUser.name} has requested you to verify your identity. Please use your preferred verification process:`),
    });

    const appSecret = await read.getEnvironmentReader().getSettings().getValueById(AppSetting.AppSecret);
    const enabledIntegrations = await read.getEnvironmentReader().getSettings().getValueById(AppSetting.EnabledIdentificationServices);
    const integrationBlockElements: Array<IButtonElement> = [];
    let pexipToken: string | null = null;

    const stateStringInput: Omit<IDecryptedToken, 'identifiedBy' | 'redirectLocation'> = {
      roomId: room.id,
      userToken: visitor.token,
      identificationRequestedBy: senderUser.id,
      verificationMessageId: messageId,
      username: visitor.username,
    };

    if (enabledIntegrations.includes('itsme')) {
      const itsmeBaseUrl = await read.getEnvironmentReader().getSettings().getValueById(AppSetting.ItsmeBaseUrl);
      integrationBlockElements.push(editBlocks.newButtonElement({
        url: `${itsmeBaseUrl}${this.createStateString({ ...stateStringInput, identifiedBy: IdentificationMethods.ITSME, redirectLocation: itsmeBaseUrl }, appSecret, visitor.name)}`,
        text: editBlocks.newPlainTextObject('Verify with itsme®'),
        actionId: 'verify-button',
      }));
    }

    if (enabledIntegrations.includes('pexip')) {
      const pexipBaseUrl = await read.getEnvironmentReader().getSettings().getValueById(AppSetting.PexipBaseUrl);
      pexipToken = this.createStateString({ ...stateStringInput, identifiedBy: IdentificationMethods.PEXIP, redirectLocation: pexipBaseUrl }, appSecret, visitor.name, true);

      integrationBlockElements.push(editBlocks.newButtonElement({
        url: `${pexipBaseUrl}${this.createStateString({ ...stateStringInput, identifiedBy: IdentificationMethods.PEXIP, redirectLocation: pexipBaseUrl }, appSecret, visitor.name)}`,
        text: editBlocks.newPlainTextObject('Verify with a video call'),
        actionId: 'input-verification',
      }));
    }

    if (enabledIntegrations.length === 0) {
      editBlocks.newPlainTextObject('No enabled verification integrations, please contact your system administrator to get you started.');
    }

    editBlocks.addActionsBlock({
      blockId: pexipToken ?? 'verification-standard-block-id',
      elements: integrationBlockElements,
    });

    const updatedMessageBuilder = await updater.message(messageId, appUser);
    updatedMessageBuilder.setBlocks(editBlocks.getBlocks());
    updatedMessageBuilder.setEditor(appUser);
    updatedMessageBuilder.setText('');
    await updater.finish(updatedMessageBuilder);
  }

  private createStateString(input: IDecryptedToken, secret: string, name: string, tokenOnly: boolean = false): string {
    if (tokenOnly) {
      return sign(input, secret);
    }
    return `?state=${sign(input, secret)}&name=${name}`;
  }
}
