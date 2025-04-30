export interface ModelSettings {
    epochs:           number;
    modelName:       string;
    layers:           number;
    neuronsByLayer: number;
    testPercentage:  number;
    rgbRanges:       RGBRange[];
}

export interface RGBRange {
    name: string;
    rgb:  number[];
}

export function validateModelSettings(modelSettings: ModelSettings): boolean {
    const { epochs, modelName, layers, neuronsByLayer, testPercentage } = modelSettings;

    if (epochs <= 0 || layers <= 0 || neuronsByLayer <= 0 || testPercentage < 0 || testPercentage > 100) {
        return false;
    }

    if (!modelName) {
        return false;
    }

    return true;
}