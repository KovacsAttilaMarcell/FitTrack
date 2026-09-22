import express from "express";
import cors from "cors";
import db from "./database.js";
import { Ismetlesszam } from "./value-objects/Ismetlesszam.js";
import { Terheles } from "./value-objects/Terheles.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("FitTrack backend is running!");
});

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
        res.status(201).json({ id: result.insertId, nev: nev.trim() });
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

        res.status(201).json({ id: result.insertId, nev: nev.trim(), edzesterv_id });
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
            return res.status(400).json({
                message: error instanceof Error ? error.message : "Érvénytelen adat."
            });
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
            SELECT edzesnaplo.id, edzesnaplo.ismetlesszam, edzesnaplo.terheles,
                   edzesnaplo.datum, gyakorlat.nev AS gyakorlat_nev,
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

app.get("/api/sportolok", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM sportolo ORDER BY id DESC");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Hiba történt a sportolók lekérésekor." });
    }
});

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