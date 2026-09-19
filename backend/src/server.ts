import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("FitTrack backend is running!");
});

app.listen(PORT, () => {
    console.log(`FitTrack backend running on http://localhost:${PORT}`);
});