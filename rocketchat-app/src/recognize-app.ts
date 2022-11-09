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
import { UIKitBlockInteractionContext } from '@rocket.chat/apps-engine/definition/uikit';
import { VerifyCommand } from './commands/verify';
import VerifyUserEndpoint from './endpoints/verify-user.endpoint';
import { settings } from './settings';

export class RecognizeApp extends App {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    public async executeBlockActionHandler(context: UIKitBlockInteractionContext) {
        const data = context.getInteractionData();

        const logger = this.getLogger();
        logger.warn('button pressed');

        return {
            success: true,
        };
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
}
