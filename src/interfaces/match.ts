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
    points?: number;
    playerOne?: string;
    playerTwo?: string;
}

export interface Game {
    id?: number;
    lineUpOne?: LineUp;
    lineUpTwo?: LineUp;
}

export interface LineUp {
    points?: number;
    players?: PlayerPosition[];
}

export interface PlayerPosition {
    name?: string;
    position?: string;
}

export function emptyGame() {
    return {
        id: 0,
        lineUpOne: {
            points: 0,
            players: [
                {
                    name: '',
                    position: ''
                },
                {
                    name: '',
                    position: ''
                }
            ]
        },
        lineUpTwo: {
            points: 0,
            players: [
                {
                    name: '',
                    position: ''
                },
                {
                    name: '',
                    position: ''
                }
            ]
        }
    }
}