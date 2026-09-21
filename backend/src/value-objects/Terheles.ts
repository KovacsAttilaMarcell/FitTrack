export class Terheles {
    private readonly ertek: number;

    constructor(ertek: number) {
        if (typeof ertek !== "number" || !Number.isFinite(ertek) || ertek < 0) {
            throw new Error("A terhelésnek 0 vagy pozitív számnak kell lennie.");
        }

        this.ertek = ertek;
    }

    getErtek(): number {
        return this.ertek;
    }
}