import { ApiEndpoint } from '@rocket.chat/apps-engine/definition/api';
import { IApiResponseJSON } from '@rocket.chat/apps-engine/definition/api/IResponse';

export default class PexipRedirectEndpoint extends ApiEndpoint {
    public path = 'redirect-endpoint';

    public async get(): Promise<IApiResponseJSON> {
        return this.json({
            status: 302,
            headers: {
                'Location': 'http://www.example.org/index.asp'
            }
        });
    }
}
