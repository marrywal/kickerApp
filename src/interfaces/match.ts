export interface Match {
    id: number;
    date: Date;
    city: string;
    mode: string;
    teamOne?: Team; // TODO: remove optional
    teamTwo?: Team; // TODO: remove optional
    games?: Game[]; // TODO: remove optional
}

export interface Team {
    points: number;
    playerOne: string;
    playerTwo: string;
}

export interface Game {
    id: number;
    lineUpOne: LineUp;
    lineUpTwo: LineUp;
}

export interface LineUp {
    points: string;
    players: PlayerPosition[];
}

export interface PlayerPosition {
    name: string;
    position: string;
}

export function emptyGame() {
    return {
        id: 0,
        lineUpOne: {
            points: '',
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
            points: '',
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