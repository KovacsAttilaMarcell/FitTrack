import "dotenv/config";

import express from "express";
import cors from "cors";
import db from "./database.js";
import { Ismetlesszam } from "./value-objects/Ismetlesszam.js";
import { Terheles } from "./value-objects/Terheles.js";

const app = express();
const PORT = 3000;

const ollamaUrl = process.env.OLLAMA_URL || "http://localhost:11434";
const ollamaModel = process.env.OLLAMA_MODEL || "qwen3:1.7b";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => { res.send("FitTrack backend is running!"); });

const tamogatottCelok = [
    "erőnövelés",
    "izomtömeg növelése",
    "állóképesség növelése",
    "fogyás",
    "általános fittség",
    "mobilitás javítása"
];

const gyakorlatKatalogus = [
    {
        nev: "Fekvenyomás",
        felszereles: ["súlyzó", "fekpad"],
        celok: ["erőnövelés", "izomtömeg növelése"],
        mertekegyseg: "ismétlés"
    },
    {
        nev: "Evezés súlyzóval",
        felszereles: ["súlyzó"],
        celok: ["erőnövelés", "izomtömeg növelése", "általános fittség"],
        mertekegyseg: "ismétlés"
    },
    {
        nev: "Vállból nyomás",
        felszereles: ["súlyzó"],
        celok: ["erőnövelés", "izomtömeg növelése"],
        mertekegyseg: "ismétlés"
    },
    {
        nev: "Bicepsz hajlítás",
        felszereles: ["súlyzó"],
        celok: ["izomtömeg növelése"],
        mertekegyseg: "ismétlés"
    },
    {
        nev: "Tricepsznyújtás súlyzóval",
        felszereles: ["súlyzó"],
        celok: ["izomtömeg növelése"],
        mertekegyseg: "ismétlés"
    },
    {
        nev: "Goblet guggolás",
        felszereles: ["súlyzó"],
        celok: ["erőnövelés", "izomtömeg növelése", "fogyás", "általános fittség"],
        mertekegyseg: "ismétlés"
    },
    {
        nev: "Román felhúzás",
        felszereles: ["súlyzó"],
        celok: ["erőnövelés", "izomtömeg növelése"],
        mertekegyseg: "ismétlés"
    },
    {
        nev: "Kitörés súlyzóval",
        felszereles: ["súlyzó"],
        celok: ["erőnövelés", "izomtömeg növelése", "fogyás", "általános fittség"],
        mertekegyseg: "ismétlés"
    },
    {
        nev: "Fekvőtámasz",
        felszereles: [],
        celok: ["erőnövelés", "izomtömeg növelése", "fogyás", "általános fittség"],
        mertekegyseg: "ismétlés"
    },
    {
        nev: "Saját testsúlyos guggolás",
        felszereles: [],
        celok: ["állóképesség növelése", "fogyás", "általános fittség", "mobilitás javítása"],
        mertekegyseg: "ismétlés"
    },
    {
        nev: "Kitörés saját testsúllyal",
        felszereles: [],
        celok: ["állóképesség növelése", "fogyás", "általános fittség", "mobilitás javítása"],
        mertekegyseg: "ismétlés"
    },
    {
        nev: "Plank",
        felszereles: [],
        celok: ["állóképesség növelése", "fogyás", "általános fittség"],
        mertekegyseg: "másodperc"
    },
    {
        nev: "Hegymászó gyakorlat",
        felszereles: [],
        celok: ["állóképesség növelése", "fogyás", "általános fittség"],
        mertekegyseg: "ismétlés"
    },
    {
        nev: "Jumping jack",
        felszereles: [],
        celok: ["állóképesség növelése", "fogyás", "általános fittség"],
        mertekegyseg: "ismétlés"
    },
    {
        nev: "Futás futópadon",
        felszereles: ["futópad"],
        celok: ["állóképesség növelése", "fogyás", "általános fittség"],
        mertekegyseg: "perc"
    },
    {
        nev: "Tempós séta futópadon",
        felszereles: ["futópad"],
        celok: ["állóképesség növelése", "fogyás", "általános fittség"],
        mertekegyseg: "perc"
    },
    {
        nev: "Magas térdemelés",
        felszereles: [],
        celok: ["állóképesség növelése", "fogyás", "általános fittség", "mobilitás javítása"],
        mertekegyseg: "másodperc"
    },
    {
        nev: "Csípőemelés",
        felszereles: [],
        celok: ["általános fittség", "mobilitás javítása"],
        mertekegyseg: "ismétlés"
    },
    {
        nev: "Madár-kutya gyakorlat",
        felszereles: [],
        celok: ["általános fittség", "mobilitás javítása"],
        mertekegyseg: "ismétlés"
    },
    {
        nev: "Macska-tehén mobilizáció",
        felszereles: [],
        celok: ["mobilitás javítása"],
        mertekegyseg: "ismétlés"
    },
    {
        nev: "Csípőmobilizáció",
        felszereles: [],
        celok: ["mobilitás javítása"],
        mertekegyseg: "másodperc"
    },
    {
        nev: "Vállkörzés",
        felszereles: [],
        celok: ["mobilitás javítása"],
        mertekegyseg: "ismétlés"
    }
];

function normalizalSzoveg(szoveg: string): string {
    return szoveg.toLowerCase().trim();
}

function sportoloFelszerelesei(felszereles: string): string[] {
    return felszereles.toLowerCase().split(",").map((elem: string) => elem.trim()).filter((elem: string) => elem !== "");
}

function megfeleloGyakorlatok(cel: string, felszereles: string) {
    const normalizaltCel = normalizalSzoveg(cel);
    const elerhetoFelszerelesek = sportoloFelszerelesei(felszereles);

    return gyakorlatKatalogus.filter(gyakorlat => {
        const celMegfelel = gyakorlat.celok.includes(normalizaltCel);
        const felszerelesMegfelel = gyakorlat.felszereles.every((szuksegesFelszereles: string) => elerhetoFelszerelesek.includes(szuksegesFelszereles));

        return celMegfelel && felszerelesMegfelel;
    });
}

function mennyisegErvenyes(mertekegyseg: string, sorozatok: number, mennyiseg: number): boolean {
    if (!Number.isInteger(sorozatok) || !Number.isInteger(mennyiseg)) { return false; }

    if (mertekegyseg === "másodperc") {
        return sorozatok >= 2 && sorozatok <= 5 && mennyiseg >= 10 && mennyiseg <= 60;
    }

    if (mertekegyseg === "perc") {
        return sorozatok >= 1 && sorozatok <= 5 && mennyiseg >= 5 && mennyiseg <= 60;
    }

    return sorozatok >= 2 && sorozatok <= 5 && mennyiseg >= 3 && mennyiseg <= 30;
}

function ajanlasErvenyes(ajanlas: any, sportoloCel: string, sportoloFelszereles: string): boolean {
    if (!ajanlas || typeof ajanlas !== "object") { return false; }
    if (typeof ajanlas.tervNev !== "string" || !ajanlas.tervNev.trim()) { return false; }
    if (!Array.isArray(ajanlas.gyakorlatok) || ajanlas.gyakorlatok.length !== 2) { return false; }

    const engedelyezettGyakorlatok = megfeleloGyakorlatok(sportoloCel, sportoloFelszereles);

    const gyakorlatNevek = ajanlas.gyakorlatok.map((gyakorlat: any) =>
        typeof gyakorlat?.nev === "string" ? gyakorlat.nev.toLowerCase().trim() : ""
    );

    if (new Set(gyakorlatNevek).size !== gyakorlatNevek.length) { return false; }

    const gyakorlatokErvenyesek = ajanlas.gyakorlatok.every((gyakorlat: any) => {
        if (!gyakorlat || typeof gyakorlat !== "object") { return false; }
        if (typeof gyakorlat.nev !== "string" || !gyakorlat.nev.trim()) { return false; }

        const katalogusGyakorlat = engedelyezettGyakorlatok.find(elem => elem.nev.toLowerCase() === gyakorlat.nev.toLowerCase().trim());

        if (!katalogusGyakorlat) { return false; }

        return mennyisegErvenyes(katalogusGyakorlat.mertekegyseg, gyakorlat.sorozatok, gyakorlat.ismetles);
    });

    if (!gyakorlatokErvenyesek) { return false; }

    const felszerelesesGyakorlatok = engedelyezettGyakorlatok.filter(gyakorlat => gyakorlat.felszereles.length > 0);

    if (felszerelesesGyakorlatok.length > 0) {
        const hasznalFelszerelest = ajanlas.gyakorlatok.some((gyakorlat: any) =>
            felszerelesesGyakorlatok.some(katalogusGyakorlat => katalogusGyakorlat.nev.toLowerCase() === gyakorlat.nev.toLowerCase().trim())
        );

        if (!hasznalFelszerelest) { return false; }
    }

    return true;
}

function katalogusAdatokHozzaadasa(ajanlas: any) {
    return {
        ...ajanlas,
        gyakorlatok: ajanlas.gyakorlatok.map((gyakorlat: any) => {
            const katalogusGyakorlat = gyakorlatKatalogus.find(elem => elem.nev.toLowerCase() === gyakorlat.nev.toLowerCase().trim());

            return {
                ...gyakorlat,
                mertekegyseg: katalogusGyakorlat?.mertekegyseg || "ismétlés",
                felszereles: katalogusGyakorlat && katalogusGyakorlat.felszereles.length > 0 ? katalogusGyakorlat.felszereles.join(", ") : ""
            };
        })
    };
}

// Összes edzésterv lekérése
app.get("/api/edzestervek", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM edzesterv ORDER BY id DESC");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Hiba történt az edzéstervek lekérésekor." });
    }
});

// Új edzésterv létrehozása
app.post("/api/edzestervek", async (req, res) => {
    try {
        const { nev } = req.body;

        if (!nev || nev.trim() === "") {
            return res.status(400).json({ message: "Az edzésterv neve kötelező." });
        }

        const [result]: any = await db.query("INSERT INTO edzesterv (nev) VALUES (?)", [nev.trim()]);

        res.status(201).json({
            id: result.insertId,
            nev: nev.trim()
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Hiba történt az edzésterv létrehozásakor." });
    }
});

// Gyakorlat hozzáadása egy edzéstervhez
app.post("/api/gyakorlatok", async (req, res) => {
    try {
        const { nev, edzesterv_id } = req.body;

        if (!nev || nev.trim() === "") {
            return res.status(400).json({ message: "A gyakorlat neve kötelező." });
        }

        if (!edzesterv_id) {
            return res.status(400).json({ message: "Az edzésterv azonosítója kötelező." });
        }

        const [tervek]: any = await db.query("SELECT id FROM edzesterv WHERE id = ?", [edzesterv_id]);

        if (tervek.length === 0) {
            return res.status(404).json({ message: "A megadott edzésterv nem található." });
        }

        const [result]: any = await db.query("INSERT INTO gyakorlat (nev, edzesterv_id) VALUES (?, ?)", [nev.trim(), edzesterv_id]);

        res.status(201).json({
            id: result.insertId,
            nev: nev.trim(),
            edzesterv_id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Hiba történt a gyakorlat hozzáadásakor." });
    }
});

// Egy edzésterv gyakorlatainak lekérése
app.get("/api/edzestervek/:id/gyakorlatok", async (req, res) => {
    try {
        const edzestervId = req.params.id;
        const [rows] = await db.query("SELECT * FROM gyakorlat WHERE edzesterv_id = ? ORDER BY id", [edzestervId]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Hiba történt a gyakorlatok lekérésekor." });
    }
});

// Teljesített sorozat rögzítése
app.post("/api/edzesnaplo", async (req, res) => {
    try {
        const { gyakorlat_id, ismetlesszam, terheles } = req.body;

        if (!gyakorlat_id) {
            return res.status(400).json({ message: "A gyakorlat azonosítója kötelező." });
        }

        let ismetlesszamVO: Ismetlesszam;
        let terhelesVO: Terheles;

        try {
            ismetlesszamVO = new Ismetlesszam(ismetlesszam);
            terhelesVO = new Terheles(terheles);
        } catch (error) {
            return res.status(400).json({ message: error instanceof Error ? error.message : "Érvénytelen adat." });
        }

        const [gyakorlatok]: any = await db.query("SELECT id FROM gyakorlat WHERE id = ?", [gyakorlat_id]);

        if (gyakorlatok.length === 0) {
            return res.status(404).json({ message: "A megadott gyakorlat nem található." });
        }

        const [result]: any = await db.query(
            "INSERT INTO edzesnaplo (gyakorlat_id, ismetlesszam, terheles) VALUES (?, ?, ?)",
            [gyakorlat_id, ismetlesszamVO.getErtek(), terhelesVO.getErtek()]
        );

        res.status(201).json({
            id: result.insertId,
            gyakorlat_id,
            ismetlesszam: ismetlesszamVO.getErtek(),
            terheles: terhelesVO.getErtek()
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Hiba történt az edzés rögzítésekor." });
    }
});

// Edzésnapló lekérése
app.get("/api/edzesnaplo", async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT edzesnaplo.id,
                   edzesnaplo.ismetlesszam,
                   edzesnaplo.terheles,
                   edzesnaplo.datum,
                   gyakorlat.nev AS gyakorlat_nev,
                   edzesterv.nev AS edzesterv_nev
            FROM edzesnaplo
            JOIN gyakorlat ON edzesnaplo.gyakorlat_id = gyakorlat.id
            JOIN edzesterv ON gyakorlat.edzesterv_id = edzesterv.id
            ORDER BY edzesnaplo.datum DESC
        `);

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Hiba történt az edzésnapló lekérésekor." });
    }
});

// Sportolók lekérése
app.get("/api/sportolok", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM sportolo ORDER BY id DESC");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Hiba történt a sportolók lekérésekor." });
    }
});

// Új sportoló létrehozása
app.post("/api/sportolok", async (req, res) => {
    try {
        const { nev, cel, felszereles } = req.body;

        if (!nev || nev.trim() === "") {
            return res.status(400).json({ message: "A sportoló neve kötelező." });
        }

        const tisztitottCel = typeof cel === "string" && cel.trim() !== "" ? cel.trim() : null;
        const tisztitottFelszereles = typeof felszereles === "string" && felszereles.trim() !== "" ? felszereles.trim() : null;

        const [result]: any = await db.query(
            "INSERT INTO sportolo (nev, cel, felszereles) VALUES (?, ?, ?)",
            [nev.trim(), tisztitottCel, tisztitottFelszereles]
        );

        res.status(201).json({
            id: result.insertId,
            nev: nev.trim(),
            cel: tisztitottCel,
            felszereles: tisztitottFelszereles
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Hiba történt a sportoló létrehozásakor." });
    }
});

// Felhasználók lekérése
app.get("/api/felhasznalok", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM felhasznalo ORDER BY id DESC");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Hiba történt a felhasználók lekérésekor." });
    }
});

// Új felhasználó létrehozása
app.post("/api/felhasznalok", async (req, res) => {
    try {
        const { nev, szerepkor } = req.body;

        if (!nev || typeof nev !== "string" || nev.trim() === "") {
            return res.status(400).json({ message: "A felhasználó neve kötelező." });
        }

        if (szerepkor !== "sportolo" && szerepkor !== "edzo") {
            return res.status(400).json({ message: "A szerepkör csak sportolo vagy edzo lehet." });
        }

        const [result]: any = await db.query("INSERT INTO felhasznalo (nev, szerepkor) VALUES (?, ?)", [nev.trim(), szerepkor]);

        res.status(201).json({
            id: result.insertId,
            nev: nev.trim(),
            szerepkor
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Hiba történt a felhasználó létrehozásakor." });
    }
});

// LLM-alapú edzésterv-ajánlás
app.post("/api/sportolok/:id/ajanlas", async (req, res) => {
    try {
        const sportoloId = Number(req.params.id);

        if (!Number.isInteger(sportoloId) || sportoloId <= 0) {
            return res.status(400).json({ message: "Érvénytelen sportoló azonosító." });
        }

        const [rows]: any = await db.query("SELECT id, nev, cel, felszereles FROM sportolo WHERE id = ?", [sportoloId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "A sportoló nem található." });
        }

        const sportolo = rows[0];

        if (!sportolo.cel || !sportolo.cel.trim()) {
            return res.status(400).json({ message: "Edzésterv-ajánláshoz meg kell adni a sportoló célját." });
        }

        if (!sportolo.felszereles || !sportolo.felszereles.trim()) {
            return res.status(400).json({ message: "Edzésterv-ajánláshoz meg kell adni a rendelkezésre álló felszerelést." });
        }

        const normalizaltCel = normalizalSzoveg(sportolo.cel);

        if (!tamogatottCelok.includes(normalizaltCel)) {
            return res.status(400).json({ message: `Nem támogatott cél. Választható célok: ${tamogatottCelok.join(", ")}.` });
        }

        const valaszthatoGyakorlatok = megfeleloGyakorlatok(sportolo.cel, sportolo.felszereles);

        if (valaszthatoGyakorlatok.length < 2) {
            return res.status(422).json({ message: "A megadott célhoz és felszereléshez nincs legalább két megfelelő gyakorlat." });
        }

        let veglegesAjanlas: any = null;

        for (let probalkozas = 1; probalkozas <= 3; probalkozas++) {
            const kevertGyakorlatok = [...valaszthatoGyakorlatok].sort(() => Math.random() - 0.5);

            const katalogusSzoveg = kevertGyakorlatok
                .map(gyakorlat => `- ${gyakorlat.nev} 
                    | mértékegység: ${gyakorlat.mertekegyseg} 
                    | felszerelés: ${gyakorlat.felszereles.length > 0 
                        ? gyakorlat.felszereles.join(", ") 
                        : "nem szükséges"}`)
                .join("\n");

            const felszerelesesGyakorlatok = kevertGyakorlatok.filter(gyakorlat => gyakorlat.felszereles.length > 0);

            const felszerelesesGyakorlatokSzoveg = felszerelesesGyakorlatok.length > 0
                ? felszerelesesGyakorlatok.map(gyakorlat => `- ${gyakorlat.nev}`).join("\n")
                : "Nincs kötelező felszereléses gyakorlat.";

            console.log(`LLM ajánlási próbálkozás: ${probalkozas}/3`);

            const ollamaResponse = await fetch(`${ollamaUrl}/api/generate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: ollamaModel,
                    prompt: `
Készíts rövid, személyre szabott edzéstervet.

Sportoló célja: ${sportolo.cel}

Az alábbi gyakorlatok már megfelelnek a sportoló céljának és rendelkezésre álló felszerelésének:

${katalogusSzoveg}

A sportoló felszerelését használó gyakorlatok:
${felszerelesesGyakorlatokSzoveg}

Kötelező szabályok:
- Pontosan 2 különböző gyakorlatot válassz.
- Kizárólag a fenti engedélyezett gyakorlatok közül választhatsz.
- A gyakorlat nevét pontosan úgy írd, ahogy a listában szerepel.
- A két gyakorlatot a sportoló céljához igazítva válaszd ki.
- Ha az "A sportoló felszerelését használó gyakorlatok" lista nem üres, a két kiválasztott gyakorlat közül legalább egyet ebből a listából KÖTELEZŐ választanod.
- A sorozatok és a mennyiség a sportoló céljához igazodjon.
- Erőnövelés: 3-5 sorozat, ismétlés alapú gyakorlatnál 3-6 ismétlés.
- Izomtömeg növelése: 3-5 sorozat, ismétlés alapú gyakorlatnál 6-15 ismétlés.
- Állóképesség növelése: 2-4 sorozat, ismétlés alapú gyakorlatnál 12-30 ismétlés.
- Fogyás: 2-4 sorozat, ismétlés alapú gyakorlatnál 10-25 ismétlés.
- Általános fittség: 2-4 sorozat, ismétlés alapú gyakorlatnál 8-20 ismétlés.
- Mobilitás javítása: 2-4 sorozat, ismétlés alapú gyakorlatnál 5-15 ismétlés.
- Másodperc alapú gyakorlatnál 2-4 sorozatot és 15-60 másodpercet adj meg.
- Perc alapú gyakorlatnál 2-4 sorozatot és 5-30 percet adj meg.
- Az ismetles mezőben az adott gyakorlat mértékegységéhez tartozó mennyiséget add meg.
- Konkrét kilogramm-terhelést ne adj meg.
- Ne adj hozzá magyarázó szöveget.
`,
                    stream: false,
                    think: false,
                    format: {
                        type: "object",
                        properties: {
                            tervNev: { type: "string" },
                            gyakorlatok: {
                                type: "array",
                                minItems: 2,
                                maxItems: 2,
                                items: {
                                    type: "object",
                                    properties: {
                                        nev: { type: "string" },
                                        sorozatok: {
                                            type: "integer",
                                            minimum: 2,
                                            maximum: 5
                                        },
                                        ismetles: {
                                            type: "integer",
                                            minimum: 1,
                                            maximum: 60
                                        }
                                    },
                                    required: ["nev", "sorozatok", "ismetles"]
                                }
                            }
                        },
                        required: ["tervNev", "gyakorlatok"]
                    },
                    options: {
                        temperature: 0.3,
                        num_predict: 250
                    }
                })
            });

            if (!ollamaResponse.ok) {
                throw new Error(`Ollama hiba: ${ollamaResponse.status} ${ollamaResponse.statusText}`);
            }

            const ollamaAdat: any = await ollamaResponse.json();

            let ajanlas;

            try {
                ajanlas = JSON.parse(ollamaAdat.response);
            } catch {
                console.log(`A(z) ${probalkozas}. próbálkozás nem megfelelő JSON.`);
                console.log(ollamaAdat.response);
                continue;
            }

            if (!ajanlasErvenyes(ajanlas, sportolo.cel, sportolo.felszereles)) {
                console.log(`A(z) ${probalkozas}. próbálkozás tartalmilag nem megfelelő:`);
                console.log(JSON.stringify(ajanlas, null, 2));
                continue;
            }

            veglegesAjanlas = katalogusAdatokHozzaadasa(ajanlas);

            console.log(`Sikeres LLM-ajánlás a(z) ${probalkozas}. próbálkozásra.`);
            break;
        }

        if (!veglegesAjanlas) {
            return res.status(422).json({ message: "Az LLM három próbálkozás után sem tudott megfelelő edzéstervet készíteni." });
        }

        return res.status(200).json({
            sportolo: {
                id: sportolo.id,
                nev: sportolo.nev,
                cel: sportolo.cel,
                felszereles: sportolo.felszereles
            },
            ajanlas: veglegesAjanlas
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({ message: "Hiba történt az edzésterv-ajánlás elkészítésekor." });
    }
});

// Adatbázis-kapcsolat ellenőrzése
async function testDatabaseConnection() {
    try {
        const connection = await db.getConnection();
        console.log("MySQL connection successful!");
        connection.release();
    } catch (error) {
        console.error("MySQL connection failed:", error);
    }
}

testDatabaseConnection();

app.listen(PORT, () => {
    console.log(`FitTrack backend running on http://localhost:${PORT}`);
});