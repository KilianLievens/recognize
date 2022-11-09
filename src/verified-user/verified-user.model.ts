export enum IdentificationMethods {
    ITSME = 'ITSME',
    PEXIP = 'PEXIP',
    OTHER = 'OTHER',
}

export default interface VerifiedUser {
    id: string;
    externalId?: string | null;
    firstName: string;
    lastName: string;
    identifiedBy: IdentificationMethods;
    identificationRequestedBy: string;
    signature: string;
    verifiedAt: Date;
}

export interface DecryptedToken {
    roomId: string;
    userId: string;
    identificationRequestedBy: string;
    identifiedBy: IdentificationMethods;
}
