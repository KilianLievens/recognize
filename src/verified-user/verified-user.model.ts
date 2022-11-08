export default interface VerifiedUser {
    id: string;
    externalId: string | null;
    firstName: string;
    lastName: string;
    identifiedBy: 'itsme' | 'pexip' | 'other';
    identificationRequestedBy: string;
    signature: string;
    verifiedAt: Date;
}
