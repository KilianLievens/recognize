import {IHttp, IModify, IPersistence, IRead} from '@rocket.chat/apps-engine/definition/accessors';
import {ApiEndpoint, IApiEndpointInfo, IApiRequest, IApiResponse} from '@rocket.chat/apps-engine/definition/api';
import {IApiResponseJSON} from '@rocket.chat/apps-engine/definition/api/IResponse';
import {randomUUID} from 'crypto';
import {verify} from 'jsonwebtoken';
import {z} from 'zod';
import {AppSetting} from '../settings';
import {DecryptedToken} from '../verified-user/verified-user.model';
import VerifiedUserPersistence from '../verified-user/verified-user.persistence';

export default class VerifyUserEndpoint extends ApiEndpoint {
    public path = 'verify-user';

    public async post(
        request: IApiRequest, endpoint: IApiEndpointInfo, read: IRead, modify: IModify, http: IHttp, persis: IPersistence,
    ): Promise<IApiResponseJSON> {
        const { state } = request.query;
        if (state == null) {
            return this.json({ status: 400 });
        }

        try {
            const appSecret = await read.getEnvironmentReader().getSettings().getValueById(AppSetting.AppSecret);
            const decryptedState: DecryptedToken = verify(state, appSecret) as DecryptedToken;

            const body = z.object({
                firstName: z.string(),
                lastName: z.string(),
            }).parse(request.content);

            // We should map whatever response we get a User object
            await VerifiedUserPersistence.createVerifiedUser(persis, {
                verifiedAt: new Date(),
                id: decryptedState.userId,
                firstName: body.firstName,
                lastName: body.lastName,
                identificationRequestedBy: decryptedState.identificationRequestedBy,
                identifiedBy: decryptedState.identifiedBy,
                signature: state,
            });

            return this.json({ status: 204 });
        } catch (e) {
            return this.json({ status: 401 });
        }
    }
}
