import { IPersistence, IPersistenceRead } from '@rocket.chat/apps-engine/definition/accessors';
import { RocketChatAssociationModel, RocketChatAssociationRecord } from '@rocket.chat/apps-engine/definition/metadata';
import INameInput from './name-input.model';

export default class NameInputPersistence {
  public static async createNameInput(persistence: IPersistence, nameInput: INameInput): Promise<boolean> {
    try {
      const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, nameInput.id);
      await persistence.createWithAssociation(nameInput, association);
    } catch (e) {
      console.error(e);
      return false;
    }

    return true;
  }

  public static async findNameInputs(persistence: IPersistenceRead, nameInputId: string): Promise<Array<INameInput>> {
    const association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, nameInputId);
    return await persistence.readByAssociation(association) as Array<INameInput>;
  }
}
