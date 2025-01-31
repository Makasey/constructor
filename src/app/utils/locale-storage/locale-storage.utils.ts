export function getSaveValueFromLocalStorage<T>(value: string | null): T | null {
    if (!value) {
        return null;
    }

    let item: T | null = null;

    try {
        item = JSON.parse(value);
    } catch (e) {
        console.warn("ERROR WHEN PROCESSING VALUE FROM LS:", e);

        item = null;
    }

    return item;
}

export function getLocalstorageItem<T>(key: string | null): T | null {
    if (!key) {
        return null;
    }

    const item = localStorage.getItem(key);

    if (!item) return null;

    const value = getSaveValueFromLocalStorage<T>(item);

    if (!value) return null;

    return value;
}
