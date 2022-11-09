import {IHttp, IModify, IPersistence, IRead} from '@rocket.chat/apps-engine/definition/accessors';
import {ApiEndpoint, IApiEndpointInfo, IApiRequest, IApiResponse} from '@rocket.chat/apps-engine/definition/api';
import {IApiResponseJSON} from '@rocket.chat/apps-engine/definition/api/IResponse';
import {randomUUID} from 'crypto';
import {z} from 'zod';
import VerifiedUserPersistence from '../verified-user/verified-user.persistence';

export default class VerifyUserEndpoint extends ApiEndpoint {
    public path = 'verify-user';

    public async post(
        request: IApiRequest, endpoint: IApiEndpointInfo, read: IRead, modify: IModify, http: IHttp, persis: IPersistence,
    ): Promise<IApiResponseJSON> {
        const body = z.object({
            firstName: z.string(),
            lastName: z.string(),
        }).parse(request.content);

        // We should map whatever response we get a User object
        await VerifiedUserPersistence.createVerifiedUser(persis, {
            externalId: '123', // Replace with id returned from identity provider
            verifiedAt: new Date(),
            id: randomUUID(),
            firstName: body.firstName,
            lastName: body.lastName,
            identificationRequestedBy: 'Florian',
            identifiedBy: 'pexip',
            signature: 'biepboepbap',
        });

        return this.json({status: 204});
    }
}
