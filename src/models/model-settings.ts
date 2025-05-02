export interface ModelSettings {
    epochs:           number;
    model_name:       string;
    layers:           number;
    neurons_by_layer: number;
    test_percentage:  number;
    rgb_ranges:       EntityRgbRange[];
}

export interface EntityRgbRange {
    class_name: string;
    rgb_ranges: RGBRange[];
}

export interface RGBRange {
    name: string;
    rgb:  number[];
}

export function validateModelSettings(modelSettings: ModelSettings): boolean {
    const { epochs, model_name: modelName, layers, neurons_by_layer, test_percentage } = modelSettings;

    if (epochs <= 0 || layers <= 0 || neurons_by_layer <= 0 || test_percentage < 0 || test_percentage > 100) {
        return false;
    }

    if (!modelName) {
        return false;
    }

    return true;
}