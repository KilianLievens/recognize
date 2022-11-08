import {IPersistence, IPersistenceRead} from '@rocket.chat/apps-engine/definition/accessors';
import {RocketChatAssociationModel, RocketChatAssociationRecord} from '@rocket.chat/apps-engine/definition/metadata';
import {randomUUID} from 'crypto';
import VerifiedUser from './verified-user.model';

export default class VerifiedUserPersistence {
    public static async createVerifiedUser(persistence: IPersistence): Promise<boolean> {
        const verifiedUser: VerifiedUser = {
            externalId: '123', // Replace with id returned from identity provider
            verifiedAt: new Date(),
            id: randomUUID(),
            firstName: 'Antonie',
            lastName: 'Puyenbroeck',
            identificationRequestedBy: 'Florian',
            identifiedBy: 'pexip',
            signature: 'biepboepbap',
        };

        try {
            const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, 'verified-user');
            await persistence.createWithAssociation(verifiedUser, association);
        } catch (e) {
            console.error(e);
            return false;
        }

        return true;
    }

    public static async findVerifiedUsers(persistence: IPersistenceRead): Promise<Array<VerifiedUser>> {
        const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, 'verified-user');
        return await persistence.readByAssociation(association) as Array<VerifiedUser>;
    }
}
