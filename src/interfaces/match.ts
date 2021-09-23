import { Player } from "./player";

export interface Match {
    id: number;
    date?: Date;
    city?: string;
    mode?: string;
    teamOne?: Team;
    teamTwo?: Team;
    games?: Game[];
}

export interface Team {
    points: number;
    playerOneId: number;
    playerTwoId: number;
}

export interface Game {
    id?: number;
    result?: string;
    lineUpOne?: LineUp;
    lineUpTwo?: LineUp;
}

export interface LineUp {
    points: number;
    players: PlayerPosition[];
}

export interface PlayerPosition {
    id: number;
    position: string;
}