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

**## 26. Edzésterv-ajánlás érvényes adatokkal**
- Művelet: Edzésterv-ajánlás kérése olyan sportolóhoz, akinek támogatott célja és megadott felszerelése van.
- Elvárt eredmény: A rendszer személyre szabott edzéstervet készít, amely 2 különböző, a célhoz és a felszereléshez megfelelő gyakorlatot tartalmaz.
- Eredmény: Sikeres

**## 27. Edzésterv-ajánlás hiányzó adatokkal**
- Művelet: Edzésterv-ajánlás kérése olyan sportolóhoz, akinek nincs megadva célja és felszerelése.
- Elvárt eredmény: A rendszer nem készít edzéstervet, hanem hibaüzenetet jelenít meg.
- Eredmény: Sikeres

**## 28. Edzésterv-ajánlás hiányzó felszereléssel**
- Művelet: Edzésterv-ajánlás kérése olyan sportolóhoz, akinek van célja, de nincs megadva felszerelése.
- Elvárt eredmény: A rendszer nem készít edzéstervet, hanem jelzi a hiányzó felszerelést.
- Eredmény: Sikeres

**## 29. Nem támogatott cél kezelése**
- Művelet: Edzésterv-ajánlás kérése olyan sportolóhoz, akinek a célja nem szerepel a támogatott célok között.
- Elvárt eredmény: A rendszer nem készít ajánlást, hanem hibaüzenetet jelenít meg.
- Eredmény: Sikeres

**## 30. Felszerelés figyelembevétele az ajánlásban**
- Művelet: Edzésterv-ajánlás kérése olyan sportolóhoz, akinek rendelkezésre áll például súlyzó és fekpad.
- Elvárt eredmény: Az ajánlás csak a sportoló számára elérhető felszereléssel végezhető vagy felszerelést nem igénylő gyakorlatokat tartalmaz, és ahol van megfelelő felszereléses gyakorlat, az ajánlás használja is a rendelkezésre álló felszerelést.
- Eredmény: Sikeres

**## 31. Strukturált LLM-kimenet**
- Művelet: Edzésterv-ajánlás generálása a helyi LLM segítségével.
- Elvárt eredmény: Az LLM strukturált formában adja vissza a terv nevét, valamint a gyakorlatok nevét, sorozatszámát és mennyiségét.
- Eredmény: Sikeres

**## 32. Tartalmilag hibás LLM-válasz kezelése**
- Művelet: Olyan ajánlási folyamat futtatása, amelyben az LLM első válasza nem felel meg a backend tartalmi ellenőrzésének.
- Elvárt eredmény: A rendszer nem fogadja el a hibás választ, hanem új ajánlást kér az LLM-től, legfeljebb 3 próbálkozással.
- Eredmény: Sikeres

**## 33. Ismétlés alapú ajánlás**
- Művelet: Olyan edzésterv generálása, amely ismétlés alapú gyakorlatokat tartalmaz.
- Elvárt eredmény: A gyakorlatok mellett a sorozatszám és az ismétlésszám megfelelően jelenik meg.
- Eredmény: Sikeres

**## 34. Másodperc alapú ajánlás**
- Művelet: Olyan edzésterv generálása, amely időalapú, másodpercben megadott gyakorlatot tartalmaz.
- Elvárt eredmény: A mennyiség „másodperc” mértékegységgel jelenik meg.
- Eredmény: Sikeres

**## 35. Perc alapú ajánlás**
- Művelet: Olyan edzésterv generálása, amely percben megadott gyakorlatot tartalmaz.
- Elvárt eredmény: A mennyiség „perc” mértékegységgel jelenik meg.
- Eredmény: Sikeres

**## 36. Edzésterv-ajánlás megjelenítése az Angular felületen**
- Művelet: Az „Edzésterv ajánlása” gomb használata egy megfelelő adatokkal rendelkező sportolónál.
- Elvárt eredmény: A generált terv az adott sportoló alatt jelenik meg a gyakorlatokkal, mennyiségekkel és szükséges felszereléssel.
- Eredmény: Sikeres

**## 37. Ajánlási hiba megjelenítése az Angular felületen**
- Művelet: Ajánlás kérése olyan sportolónál, akinél az ajánlás nem készíthető el.
- Elvárt eredmény: A hibaüzenet az érintett sportoló alatt jelenik meg.
- Eredmény: Sikeres

**## 38. Több sportoló ajánlásának megjelenítése**
- Művelet: Egymás után több különböző sportolóhoz edzésterv-ajánlás készítése.
- Elvárt eredmény: A korábban elkészített ajánlások megmaradnak a felületen, és minden ajánlás a megfelelő sportoló alatt jelenik meg.
- Eredmény: Sikeres

**## 39. Ajánlás újragenerálása**
- Művelet: Ugyanahhoz a sportolóhoz ismételten edzésterv-ajánlás kérése.
- Elvárt eredmény: Az adott sportoló korábbi ajánlását az új ajánlás váltja fel, a többi sportoló ajánlása változatlan marad.
- Eredmény: Sikeres