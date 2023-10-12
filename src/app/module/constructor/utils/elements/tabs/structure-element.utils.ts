export function processedCreatedTabsCount(count: number): number[] {
    const result: number[] = [];

    for (let i = 0; i < count; i++) {
        result.push(i);
    }

    return result;
}
