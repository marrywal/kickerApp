import { Match } from "../interfaces/match";

export function getMatches(): Match[] {
    // TODO: think about results and logic
    return [
        {
            id: 1,
            dateTime: new Date(),
            city: 'München',
            mode: 'BestOf3',
            endResult: '2:1',
            teamOne: [
                {
                    id: 1,
                    name: 'Max Mustermann',
                    city: 'München'
                },
                {
                    id: 2,
                    name: 'Klaus Kleber',
                    city: 'Würzburg'
                }
            ],
            teamTwo: [
                {
                    id: 3,
                    name: 'Pippi Langstrumpf',
                    city: 'Berlin'
                },
                {
                    id: 2,
                    name: 'Klaus Kleber',
                    city: 'Würzburg'
                }
            ],
            games: [
                {
                    id: 1,
                    result: '5:4',
                    lineUpOne: [
                        {
                            player: {
                                id: 1,
                                name: 'Max Mustermann',
                                city: 'München'
                            },
                            position: 'vorne'
                        },
                        {
                            player: {
                                id: 2,
                                name: 'Klaus Kleber',
                                city: 'Würzburg'
                            },
                            position: 'hinten'
                        },
                    ],
                    lineUpTwo: [
                        {
                            player: {
                                id: 1,
                                name: 'Max Mustermann',
                                city: 'München'
                            },
                            position: 'vorne'
                        },
                        {
                            player: {
                                id: 2,
                                name: 'Klaus Kleber',
                                city: 'Würzburg'
                            },
                            position: 'hinten'
                        },
                    ],
                }
            ]
        },
        {
            id: 2,
            dateTime: new Date(),
            city: 'Berlin',
            mode: 'BestOf5',
            endResult: '2:5',
            teamOne: [
                {
                    id: 1,
                    name: 'Max Mustermann',
                    city: 'München'
                },
                {
                    id: 2,
                    name: 'Klaus Kleber',
                    city: 'Würzburg'
                }
            ],
            teamTwo: [
                {
                    id: 3,
                    name: 'Pippi Langstrumpf',
                    city: 'Berlin'
                },
                {
                    id: 2,
                    name: 'Klaus Kleber',
                    city: 'Würzburg'
                }
            ],
            games: [
                {
                    id: 1,
                    result: '5:4',
                    lineUpOne: [
                        {
                            player: {
                                id: 1,
                                name: 'Max Mustermann',
                                city: 'München'
                            },
                            position: 'vorne'
                        },
                        {
                            player: {
                                id: 2,
                                name: 'Klaus Kleber',
                                city: 'Würzburg'
                            },
                            position: 'hinten'
                        },
                    ],
                    lineUpTwo: [
                        {
                            player: {
                                id: 1,
                                name: 'Max Mustermann',
                                city: 'München'
                            },
                            position: 'vorne'
                        },
                        {
                            player: {
                                id: 2,
                                name: 'Klaus Kleber',
                                city: 'Würzburg'
                            },
                            position: 'hinten'
                        },
                    ],
                },
                {
                    id: 2,
                    result: '5:9',
                    lineUpOne: [
                        {
                            player: {
                                id: 1,
                                name: 'Max Mustermann',
                                city: 'München'
                            },
                            position: 'vorne'
                        },
                        {
                            player: {
                                id: 2,
                                name: 'Klaus Kleber',
                                city: 'Würzburg'
                            },
                            position: 'hinten'
                        },
                    ],
                    lineUpTwo: [
                        {
                            player: {
                                id: 1,
                                name: 'Max Mustermann',
                                city: 'München'
                            },
                            position: 'vorne'
                        },
                        {
                            player: {
                                id: 2,
                                name: 'Klaus Kleber',
                                city: 'Würzburg'
                            },
                            position: 'hinten'
                        },
                    ],
                }
            ]
        }
    ];
}