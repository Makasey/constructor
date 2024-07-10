export function getRandomString(count: number): string {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < count; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export function getRandomId(): string {
    if ("randomUUID" in crypto) {
        return crypto.randomUUID();
    }

    return `${getRandomString(8)}-${getRandomString(4)}-${getRandomString(4)}-${getRandomString(4)}-${getRandomString(12)}`;
}
