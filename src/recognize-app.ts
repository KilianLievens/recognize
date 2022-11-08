import {
  IAppAccessors,
  IConfigurationExtend,
  ILogger,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
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
    await configuration.ui.registerButton({
      actionId: 'verify-button-id', // TODO

    });
  }
}
