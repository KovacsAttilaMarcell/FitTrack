# Manuális tesztek – FitTrack

## 1. Edzésterv hozzáadása
- Művelet: „Láb edzés” létrehozása
- Elvárt eredmény: Az új edzésterv megjelenik a listában.
- Eredmény: Sikeres

## 2. Gyakorlat hozzáadása
- Művelet: „Guggolás” hozzáadása a „Láb edzés” tervhez.
- Elvárt eredmény: A gyakorlat megjelenik a megfelelő edzésterv alatt.
- Eredmény: Sikeres

## 3. Adatok megmaradása
- Művelet: Az oldal frissítése.
- Elvárt eredmény: A létrehozott edzésterv és gyakorlat továbbra is megjelenik.
- Eredmény: Sikeres

## 4. Üres edzéstervnév
- Művelet: Edzésterv hozzáadása üres névvel.
- Elvárt eredmény: Nem jön létre új edzésterv.
- Eredmény: Sikeres

## 5. Üres gyakorlatnév
- Művelet: Gyakorlat hozzáadása üres névvel.
- Elvárt eredmény: Nem jön létre új gyakorlat.
- Eredmény: Sikeres

## 6. Teljesített sorozat rögzítése
- Művelet: 8 ismétlés és 70 kg terhelés rögzítése egy gyakorlathoz.
- Elvárt eredmény: A bejegyzés azonnal megjelenik az Edzésnaplóban.
- Eredmény: Sikeres

## 7. Edzésnapló adatainak megmaradása
- Művelet: Az oldal frissítése a sorozat rögzítése után.
- Elvárt eredmény: A korábban rögzített bejegyzés továbbra is megjelenik.
- Eredmény: Sikeres

## 8. Üres ismétlésszám
- Művelet: Sorozat rögzítése üres ismétlésszámmal.
- Elvárt eredmény: A rendszer nem rögzíti a sorozatot.
- Eredmény: Sikeres

## 9. Nulla ismétlésszám
- Művelet: Sorozat rögzítése 0 ismétléssel.
- Elvárt eredmény: A rendszer nem rögzíti a sorozatot.
- Eredmény: Sikeres

## 10. Negatív ismétlésszám
- Művelet: Sorozat rögzítése negatív ismétlésszámmal.
- Elvárt eredmény: A rendszer nem rögzíti a sorozatot.
- Eredmény: Sikeres

## 11. Üres terhelés
- Művelet: Sorozat rögzítése üres terheléssel.
- Elvárt eredmény: A rendszer nem rögzíti a sorozatot.
- Eredmény: Sikeres

## 12. Negatív terhelés
- Művelet: Sorozat rögzítése negatív terheléssel.
- Elvárt eredmény: A rendszer nem rögzíti a sorozatot.
- Eredmény: Sikeres

## 13. Nulla terhelés
- Művelet: 10 ismétlés rögzítése 0 kg terheléssel.
- Elvárt eredmény: A rendszer elfogadja és rögzíti a sorozatot.
- Eredmény: Sikeres

## 14. Ismétlésszám Value Object validáció
- Művelet: 0 és 2.5 ismétlésszám küldése az API-nak.
- Elvárt eredmény: Az API 400-as hibával elutasítja az értékeket.
- Eredmény: Sikeres

## 15. Terhelés Value Object validáció
- Művelet: Negatív terhelés küldése az API-nak.
- Elvárt eredmény: Az API 400-as hibával elutasítja az értéket.
- Eredmény: Sikeres

## 16. Sportoló létrehozása
- Művelet: Sportoló létrehozása névvel, céllal és felszereléssel.
- Elvárt eredmény: A sportoló sikeresen létrejön és megjelenik a listában.
- Eredmény: Sikeres

## 17. Sportoló adatainak megmaradása
- Művelet: Az oldal frissítése a sportoló létrehozása után.
- Elvárt eredmény: A korábban létrehozott sportoló továbbra is megjelenik.
- Eredmény: Sikeres

## 18. Sportoló létrehozása cél és felszerelés nélkül
- Művelet: Sportoló létrehozása névvel, de cél és felszerelés megadása nélkül.
- Elvárt eredmény: A sportoló létrejön, a hiányzó adatok pedig „Nincs megadva” értékkel jelennek meg.
- Eredmény: Sikeres

## 19. Üres sportolónév
- Művelet: Sportoló létrehozása üres névvel.
- Elvárt eredmény: Az API 400-as hibával elutasítja a kérést.
- Eredmény: Sikeres

## 20. Sportolók lekérése
- Művelet: A sportolók lekérése a GET /api/sportolok végponton.
- Elvárt eredmény: Az adatbázisban tárolt sportolók adatai visszaérkeznek.
- Eredmény: Sikeres

## 21. Sportoló szerepkörű felhasználó létrehozása
- Művelet: Felhasználó létrehozása sportolo szerepkörrel.
- Elvárt eredmény: A felhasználó sikeresen létrejön Sportoló szerepkörrel.
- Eredmény: Sikeres

## 22. Edző szerepkörű felhasználó létrehozása
- Művelet: Felhasználó létrehozása edzo szerepkörrel.
- Elvárt eredmény: A felhasználó sikeresen létrejön Edző szerepkörrel.
- Eredmény: Sikeres

## 23. Érvénytelen szerepkör
- Művelet: Felhasználó létrehozása admin szerepkörrel.
- Elvárt eredmény: Az API 400-as hibával elutasítja a kérést.
- Eredmény: Sikeres

## 24. Felhasználók lekérése
- Művelet: A felhasználók lekérése a GET /api/felhasznalok végponton.
- Elvárt eredmény: A létrehozott felhasználók a megfelelő szerepkörrel jelennek meg.
- Eredmény: Sikeres

## 25. Felhasználó létrehozása a felületről
- Művelet: Edző szerepkörű felhasználó létrehozása az Angular felületen.
- Elvárt eredmény: A felhasználó azonnal megjelenik, a mezők alaphelyzetbe állnak, és oldalfrissítés után is megmarad.
- Eredmény: Sikeres