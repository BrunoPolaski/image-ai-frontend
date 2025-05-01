import { capitalize } from "vue";

export interface Model {
    model_name:    string;
    model_size_mb: number;
    created_date:  Date;
    num_classes:   number;
    classes:       string[];
}

export function modelFromJson(json: any): Model {
    return {
        model_name:    capitalize(json.model_name),
        model_size_mb: json.model_size_mb,
        created_date:  new Date(json.created_date),
        num_classes:   json.num_classes,
        classes:       json.classes,
    };
}
