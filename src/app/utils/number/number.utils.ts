export function normalizeNumberValue(value: number, min: number, max: number): number {
    const processedMinValue = min ?? Number.MIN_SAFE_INTEGER;
    const processedMaxValue = max ?? Number.MAX_SAFE_INTEGER;

    if (value > processedMaxValue) {
        return processedMaxValue;
    }

    if (value < processedMinValue) {
        return processedMinValue;
    }

    return value;
}

export function normalizeMinValue(value: number, min: number): number {
    const processedMinValue = min ?? Number.MIN_SAFE_INTEGER;

    return Math.max(value, processedMinValue);
}

export function normalizeMaxValue(value: number, max: number): number {
    const processedMaxValue = max ?? Number.MAX_SAFE_INTEGER;

    return Math.min(value, processedMaxValue);
}

export function normalizeToIntNumber(value: number, min: number, max: number): number {
    return Math.round(normalizeNumberValue(value, min, max));
}

export function roundNumberWithFraction(value: number, fraction = 1): number {
    return Number(value.toFixed(fraction));
}

export function calculateFractionNumber(value: number): number {
    if (value >= 1) {
        return 1;
    }

    let fraction = 0;

    while (value < 1) {
        value = value * 10;

        fraction++;
    }

    return fraction;
}

export function isNumberInRange(value: number, from: number, to: number): boolean {
    return value >= from && value <= to;
}