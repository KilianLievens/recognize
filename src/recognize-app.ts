import {
  IAppAccessors,
  IConfigurationExtend,
  IHttp,
  ILogger,
  IModify,
  IPersistence,
  IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { UIActionButtonContext } from '@rocket.chat/apps-engine/definition/ui';
import { UIKitBlockInteractionContext } from '@rocket.chat/apps-engine/definition/uikit';
import { VerifyCommand } from './commands/verify';

export class RecognizeApp extends App {
  constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
    super(info, logger, accessors);
  }

  public async extendConfiguration(
    configuration: IConfigurationExtend
  ): Promise<void> {
    const verifyCommand: VerifyCommand = new VerifyCommand();
    await configuration.slashCommands.provideSlashCommand(verifyCommand)
    // configuration.ui.registerButton({
    //   actionId: 'verify-button-id', // TODO
    //   labelI18n: 'verify-button',
    //   context: UIActionButtonContext.MESSAGE_ACTION
    // });
  }

  public async executeBlockActionHandler(context: UIKitBlockInteractionContext, _read: IRead, _http: IHttp, _persistence: IPersistence, modify: IModify) {
    const data = context.getInteractionData();

    const logger = this.getLogger()
    logger.warn('button pressed');

    return {
      success: true,
    };
  }

}
