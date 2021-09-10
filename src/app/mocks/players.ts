import { Player } from "../interfaces/player";

export function getPlayers(): Player[] {
    return [
        {
            id: 1,
            name: 'Max Mustermann',
            city: 'München'
        },
        {
            id: 2,
            name: 'Klaus Kleber',
            city: 'Würzburg'
        },
        {
            id: 3,
            name: 'Pippi Langstrumpf',
            city: 'Berlin'
        }
    ];
}