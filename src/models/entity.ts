import type Characteristic from "./characteristics";

export default interface Entity {
    id: number;
    name: string;
    characteristics: Characteristic[];
}