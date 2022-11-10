import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ApiEndpoint, IApiEndpointInfo, IApiRequest } from '@rocket.chat/apps-engine/definition/api';
import { IApiResponseJSON } from '@rocket.chat/apps-engine/definition/api/IResponse';
import { InputElementDispatchAction } from '@rocket.chat/apps-engine/definition/uikit';
import { verify } from 'jsonwebtoken';
import { AppSetting } from '../settings';
import { IDecryptedToken } from '../verified-user/verified-user.model';

export default class PexipRedirectEndpoint extends ApiEndpoint {
  public path = 'redirect-endpoint';

  public async get(
    request: IApiRequest,
    endpoint: IApiEndpointInfo,
    read: IRead,
    modify: IModify,
    http: IHttp,
    persis: IPersistence,
  ): Promise<IApiResponseJSON> {
    const creator = modify.getCreator();
    const userReader = read.getUserReader();
    const roomReader = read.getRoomReader();
    const notifier = modify.getNotifier();
    const appUser = (await read.getUserReader().getAppUser())!;

    const appSecret = await read.getEnvironmentReader().getSettings().getValueById(AppSetting.AppSecret);

    const state = request.query?.state;

    if (state == null) {
      return this.json({ status: 400, });
    }

    try {
      const {
        roomId,
        identificationRequestedBy,
        redirectLocation,
        verificationMessageId
      } = verify(state, appSecret) as IDecryptedToken;

      const inputBlocks = creator.getBlockBuilder();

      inputBlocks.addInputBlock({
        label: inputBlocks.newPlainTextObject('firstName'),
        element: inputBlocks.newPlainTextInputElement({
          multiline: false,
          placeholder: inputBlocks.newPlainTextObject('First Name'),
          dispatchActionConfig: [InputElementDispatchAction.ON_CHARACTER_ENTERED]
        })
      });

      inputBlocks.addInputBlock({
        label: inputBlocks.newPlainTextObject('lastName'),
        element: inputBlocks.newPlainTextInputElement({
          multiline: false,
          placeholder: inputBlocks.newPlainTextObject('Last Name'),
          dispatchActionConfig: [InputElementDispatchAction.ON_CHARACTER_ENTERED]
        })
      });

      const senderUser = await userReader.getById(identificationRequestedBy);
      const room = await roomReader.getById(roomId);

      if(senderUser == null || room == null){
          throw new Error('Could not find sender user or room for pexip redirection input blocks');
      }

      notifier.notifyUser(
        senderUser, {
        sender: appUser,
        room,
        blocks: inputBlocks.getBlocks()
      });

      return this.json({
        status: 302,
        headers: {
          'Location': `${redirectLocation}?state=${state}`
        }
      });
    }
    catch (e: unknown) {
      console.log(e);

      return this.json({ status: 500 });
    }
  }
}
