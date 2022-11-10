export enum NameInputType {
    FIRST = 'FIRST',
    LAST = 'LAST',
}

export default interface INameInput {
    id: string;
    nameValue: string;
    type: NameInputType;
}
