export function getModes(): string[] {
    return [
        "OneMatch",
        "BestOf3",
        "BestOf5"
    ]
}

export function getNumberByMode(mode: string): number {
    switch (mode) {
        case 'OneMatch':
            return 1;
        case 'BestOf3':
            return 3;
        case 'BestOf5':
            return 5;
        default:
            return 1;
    }
}