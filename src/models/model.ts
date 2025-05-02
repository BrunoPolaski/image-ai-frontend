import { capitalize } from "vue";

export interface Model {
    model_name:       string;
    model_size_mb:    number;
    created_date:     Date;
    num_classes:      number;
    classes:          string[];
    accuracy:         number|null;
    accuracy_str:     string|null;
    training_samples: number|null;
    test_samples:     number|null;
}

export function modelFromJson(json: any): Model {
    return {
        model_name:    json.model_name,
        model_size_mb: json.model_size_mb,
        created_date:  new Date(json.created_date),
        num_classes:   json.num_classes,
        classes:       json.classes.map((c: string) => capitalize(c)),
        accuracy:      json.accuracy,
        accuracy_str:  json.accuracy_str,
        training_samples: json.training_samples,
        test_samples:  json.test_samples,
    };
}