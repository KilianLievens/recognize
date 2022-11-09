export enum IdentificationMethods {
    ITSME = 'ITSME',
    PEXIP = 'PEXIP',
    OTHER = 'OTHER',
}

export default interface IVerifiedUser {
    id: string;
    externalId?: string | null;
    firstName: string;
    lastName: string;
    identifiedBy: IdentificationMethods;
    identificationRequestedBy: string;
    signature: string;
    verifiedAt: Date;
}

export interface IDecryptedToken {
    roomId: string;
    userToken: string;
    identificationRequestedBy: string;
    identifiedBy: IdentificationMethods;
    verificationMessageId: string;
}
