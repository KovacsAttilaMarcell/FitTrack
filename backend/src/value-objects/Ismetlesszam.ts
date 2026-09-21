export class Ismetlesszam {
    private readonly ertek: number;

    constructor(ertek: number) {
        if (!Number.isInteger(ertek) || ertek <= 0) {
            throw new Error("Az ismétlésszámnak pozitív egész számnak kell lennie.");
        }

        this.ertek = ertek;
    }

    getErtek(): number {
        return this.ertek;
    }
}