function limitDecimalPlaces(num: number, places: number) {
    const factor = Math.pow(10, places);
    return Math.trunc(num * factor) / factor;
}

export {
    limitDecimalPlaces
}