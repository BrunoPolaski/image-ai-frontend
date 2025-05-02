import type Characteristic from "./characteristics";

export default interface Entity {
    id: number;
    name: string;
    files: File[];
    characteristics: Characteristic[];
}

export function createEntity(partial?: Partial<Entity>): Entity {
    return {
        id: 0,
        name: '',
        files: [],
        characteristics: [],
        ...partial,
    };
}