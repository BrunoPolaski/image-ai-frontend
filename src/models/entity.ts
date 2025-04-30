export default interface Entity {
    id: number;
    name: string;
    files: File[];
}

export function createEntity(partial?: Partial<Entity>): Entity {
    return {
        id: 0,
        name: '',
        files: [],
        ...partial,
    };
}