import {IPersistence, IPersistenceRead} from '@rocket.chat/apps-engine/definition/accessors';
import {RocketChatAssociationModel, RocketChatAssociationRecord} from '@rocket.chat/apps-engine/definition/metadata';
import IVerifiedUser from './verified-user.model';

export default class VerifiedUserPersistence {
    public static async createVerifiedUser(persistence: IPersistence, verifiedUser: IVerifiedUser): Promise<boolean> {
        try {
            const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, 'verified-user');
            await persistence.createWithAssociation(verifiedUser, association);
        } catch (e) {
            console.error(e);
            return false;
        }

        return true;
    }

    public static async findVerifiedUsers(persistence: IPersistenceRead): Promise<Array<IVerifiedUser>> {
        const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, 'verified-user');
        return await persistence.readByAssociation(association) as Array<IVerifiedUser>;
    }

    public static async getVerifiedUserNames(persistence: IPersistenceRead): Promise<Array<string>> {
        const users = await VerifiedUserPersistence.findVerifiedUsers(persistence);

        return users.map((user) => user.username);
    }
}
