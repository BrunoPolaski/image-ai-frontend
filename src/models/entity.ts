import type Characteristic from "./characteristics";


export default interface Entity {
    id: number;
    name: string;
    characteristics: Characteristic[];
    files: File[];
    trainingFiles: File[];
    testFiles: File[];
    testFolderName: string | undefined;
    trainingFolderName: string | undefined;
}

export function createEntity(partial?: Partial<Entity>): Entity {
    return {
        id: 0,
        name: '',
        characteristics: [{
            id: 0,
            name: '',
            color: 'rgb(0,0,0)',
        }],
        files: [],
        trainingFiles: [],
        testFiles: [],
        testFolderName: undefined,
        trainingFolderName: undefined,
        ...partial,
    };
}