import { Player } from "./player";

export interface Match {
    id: number;
    dateTime?: Date;
    city?: string;
    mode?: string;
    endResult?: string;
    teamOne?: Player[];
    teamTwo?: Player[];
    games?: Game[];
}

export interface Game {
    id?: number;
    lineUpOne?: LineUp[];
    lineUpTwo?: LineUp[];
    result?: string;
}

export interface LineUp {
    player?: Player,
    position?: string
}