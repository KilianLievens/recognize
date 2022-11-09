import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ApiEndpoint, IApiEndpointInfo, IApiRequest } from '@rocket.chat/apps-engine/definition/api';
import { IApiResponseJSON } from '@rocket.chat/apps-engine/definition/api/IResponse';
import { verify } from 'jsonwebtoken';
import { z } from 'zod';
import { AppSetting } from '../settings';
import { IDecryptedToken } from '../verified-user/verified-user.model';
import VerifiedUserPersistence from '../verified-user/verified-user.persistence';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'content-type',
  'Access-Control-Allow-Methods': 'POST',
};

export default class VerifyUserEndpoint extends ApiEndpoint {
  public path = 'verify-user';

  public async options(): Promise<IApiResponseJSON> {
    return this.json({
      status: 200,
      headers: corsHeaders,
    });
  }

  public async get(
      request: IApiRequest, endpoint: IApiEndpointInfo, read: IRead, modify: IModify, http: IHttp, persis: IPersistence,
  ): Promise<IApiResponseJSON> {
    const userNames = await VerifiedUserPersistence.getVerifiedUserNames(read.getPersistenceReader());

    return this.json({
      status: 200,
      headers: corsHeaders,
      content: userNames.filter((userName) => userName != null),
    });
  }

  public async post(
    request: IApiRequest, endpoint: IApiEndpointInfo, read: IRead, modify: IModify, http: IHttp, persis: IPersistence,
  ): Promise<IApiResponseJSON> {
    const appSecret = await read.getEnvironmentReader().getSettings().getValueById(AppSetting.AppSecret);

    const state = request.query?.state;

    if (state == null) {
      return this.json({
        status: 400,
        headers: corsHeaders,
      });
    }

    try {
      const decryptedState: IDecryptedToken = verify(state, appSecret) as IDecryptedToken;

      const body = z.object({
        firstName: z.string(),
        lastName: z.string(),
      }).parse(request.content);

      // We should map whatever response we get a User object
      await VerifiedUserPersistence.createVerifiedUser(persis, {
        verifiedAt: new Date(),
        id: decryptedState.userToken, // TODO
        firstName: body.firstName,
        lastName: body.lastName,
        identificationRequestedBy: decryptedState.identificationRequestedBy,
        identifiedBy: decryptedState.identifiedBy,
        signature: state,
        username: decryptedState.username,
      });

      const creator = modify.getCreator();
      const updater = modify.getUpdater();
      const roomReader = read.getRoomReader();
      const liveChatReader = read.getLivechatReader();
      const appUser = (await read.getUserReader().getAppUser())!;
      const room = await roomReader.getById(decryptedState.roomId);
      const verifiedLiveChatReader = await liveChatReader.getLivechatVisitorByToken(decryptedState.userToken);

      if (room == null || verifiedLiveChatReader == null) {
        throw new Error('Could not find room or liveChatReader');
      }

      const blocks = creator.getBlockBuilder();

      blocks.addSectionBlock({
        text: blocks.newPlainTextObject(`${verifiedLiveChatReader.name} has been verified!`),
      });

      const updatedMessageBuilder = await updater.message(decryptedState.verificationMessageId, appUser);
      updatedMessageBuilder.setBlocks(blocks.getBlocks());
      updatedMessageBuilder.setEditor(appUser);
      await updater.finish(updatedMessageBuilder);

      return this.json({
        status: 200,
        headers: corsHeaders,
      });
    } catch (e) {
      console.log(e);

      return this.json({
        status: 500,
        headers: corsHeaders,
      });
    }
  }
}
