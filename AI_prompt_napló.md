# AI prompt napló – FitTrack

## 1. Projekt felépítése
**Prompt:** Segíts egy FitTrack nevű webalkalmazás elkészítésében Angular frontenddel, TypeScript/Express backenddel és MySQL adatbázissal.

**Eredmény:** Létrejött a frontend és backend alapstruktúrája, valamint a MySQL adatbázis-kapcsolat.

## 2. Edzéstervek kezelése
**Prompt:** Készíts API végpontokat az edzéstervek létrehozásához és lekéréséhez.

**Eredmény:** Elkészült az edzéstervek hozzáadása és listázása.

## 3. Gyakorlatok kezelése
**Prompt:** Lehessen gyakorlatot hozzáadni egy kiválasztott edzéstervhez, és jelenjenek meg a tervhez tartozó gyakorlatok.

**Eredmény:** Elkészült a gyakorlatok hozzáadása és lekérdezése, az edzéstervhez kapcsolva.

## 4. Angular felület
**Prompt:** Készíts egyszerű Angular felületet, ahol edzésterv és gyakorlat adható hozzá, valamint látható az edzéstervek listája.

**Eredmény:** Elkészült az 1. heti MVP felülete és az alapvető megjelenés.

## 5. Tesztelés
**Prompt:** Adj manuális teszteseteket az 1. heti MVP ellenőrzéséhez.

**Eredmény:** Az edzésterv és gyakorlat-hozzáadás, az adatok megmaradása és az üres mezők kezelése sikeresen tesztelve lett.

## 6. Edzésnapló és teljesített sorozatok
**Prompt:** Bővítsd a FitTrack alkalmazást úgy, hogy a gyakorlatokhoz ismétlésszám és terhelés megadásával teljesített sorozatot lehessen rögzíteni, és ezek jelenjenek meg az edzésnaplóban.

**Eredmény:** Elkészült az Edzésnapló adatbázistáblája, REST API-ja és Angular felülete. A rögzített sorozatok frissítés után is megmaradnak.

## 7. Value Objectek
**Prompt:** Az Ismétlésszám és Terhelés a domainvázlatnak megfelelően külön Value Objectként legyen megvalósítva és használva az edzés rögzítésekor.

**Eredmény:** Elkészült az Ismetlesszam és Terheles Value Object, amelyek ellenőrzik az érvényes értékeket. A működés Postman tesztekkel is ellenőrizve lett.

## 8. Felület bővítése
**Prompt:** Igazítsd a meglévő FitTrack felületet a sorozatrögzítéshez és az edzésnapló megjelenítéséhez.

**Eredmény:** A gyakorlatoknál megadható az ismétlésszám és a terhelés, az Edzésnapló pedig rendezett formában jeleníti meg a teljesített sorozatokat.

## 9. Sportoló entitás
**Prompt:** Bővítsd a FitTrack alkalmazást Sportoló entitással, amelyhez név, cél és rendelkezésre álló felszerelés tartozik.

**Eredmény:** Elkészült a Sportoló adatbázistáblája, valamint a sportolók létrehozására és lekérésére szolgáló REST API.

## 10. Sportoló adatok validálása
**Prompt:** A sportoló neve legyen kötelező, a cél és a felszerelés viszont lehessen hiányzó adat.

**Eredmény:** A backend elutasítja az üres sportolói nevet, a hiányzó cél és felszerelés pedig null értékként tárolható. Ez előkészíti a személyre szabott edzésterv-ajánlás kritikus szabályát.

## 11. Sportolók Angular felülete
**Prompt:** Egészítsd ki a FitTrack Angular felületét sportolók hozzáadásával és listázásával, valamint jelenítsd meg a célt és a felszerelést.

**Eredmény:** A felületen sportoló hozható létre névvel, céllal és felszereléssel. A sportolók adatai rendezett formában jelennek meg, a hiányzó adatok pedig „Nincs megadva” szöveggel láthatók.

## 12. Sportoló funkció tesztelése
**Prompt:** Ellenőrizd a Sportoló funkció létrehozását, lekérését, adatmegmaradását és a kötelező név validációját.

**Eredmény:** A Sportoló funkció backend és frontendtesztjei sikeresen lefutottak.