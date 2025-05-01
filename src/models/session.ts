import { capitalize } from "vue";

export interface Session {
    session_id:  string;
    created_at:  Date;
    status:      string;
    total_files: number;
    classes:     string[];
}

export function sessionFromJson(json: any): Session {
    return {
        session_id:  json.session_id,
        created_at:  new Date(json.created_at),
        status:      translateSessionStatus(json.status),
        total_files: json.total_files,
        classes:     json.classes.map((c: string) => capitalize(c)),
    };
}

export function translateSessionStatus(status: string): string {
    switch (status) {
        case 'created':
            return 'Criada';
        case 'training_in_progress':
            return 'Treinamento em progresso';
        case 'completed':
            return 'Modelo treinado';
        case 'error':
            return 'Falhou';
        default:
            return 'Desconhecido';
    }
}