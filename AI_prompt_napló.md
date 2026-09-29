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

## 13. Felhasználói szerepkörök
**Prompt:** Bővítsd a FitTrack alkalmazást Sportoló és Edző felhasználói szerepkörökkel.

**Eredmény:** Elkészült a felhasználók adatbázistáblája, amely sportolo és edzo szerepkört támogat.

## 14. Szerepkörök backend kezelése
**Prompt:** Készíts REST API-t a felhasználók létrehozásához és lekéréséhez, és csak a sportolo vagy edzo szerepkört engedélyezd.

**Eredmény:** Elkészült a felhasználók létrehozása és lekérése. Az érvénytelen szerepköröket a backend 400-as hibával elutasítja.

## 15. Szerepkörök Angular felülete
**Prompt:** Egészítsd ki a FitTrack Angular felületét a felhasználók létrehozásával, listázásával és a Sportoló vagy Edző szerepkör kiválasztásával.

**Eredmény:** A felületen létrehozható Sportoló vagy Edző szerepkörű felhasználó, és a felhasználók a hozzájuk tartozó szerepkörrel jelennek meg.

## 16. Szerepkörök tesztelése
**Prompt:** Ellenőrizd a Sportoló és Edző szerepkör létrehozását, az érvénytelen szerepkör elutasítását, a lekérést és az adatok megmaradását.

**Eredmény:** A szerepkör-kezelés backend és frontendtesztjei sikeresen lefutottak.

## 17. Helyi LLM-integráció
**Prompt:** Valósítsd meg a FitTrack személyre szabott edzésterv-ajánlását helyben futó Ollama LLM használatával, külső fizetős API nélkül.

**Eredmény:** A backend összekapcsolásra került az Ollamával, és a qwen3:1.7b modell segítségével képes edzésterv-ajánlást generálni.

## 18. Cél és felszerelés alapú ajánlás
**Prompt:** Az edzésterv-ajánlás kizárólag a sportoló rögzített célja és rendelkezésre álló felszerelése alapján készüljön, és csak ezeknek megfelelő gyakorlatokat használjon.

**Eredmény:** Elkészült a támogatott célok és gyakorlatok katalógusa, valamint a cél és felszerelés alapján történő előszűrés.

## 19. Hiányzó adatok kezelése
**Prompt:** Ha a sportoló célja vagy felszerelése nincs megadva, az LLM ne találjon ki hiányzó adatot és ne készítsen edzéstervet.

**Eredmény:** A backend ajánlás előtt ellenőrzi a szükséges adatokat, és hiányzó cél vagy felszerelés esetén hibaüzenettel elutasítja az ajánlást.

## 20. Strukturált LLM-kimenet
**Prompt:** Az LLM az edzéstervet strukturált formában adja vissza, pontosan két különböző gyakorlattal, sorozatszámmal és mennyiséggel.

**Eredmény:** Az Ollama strukturált JSON-kimenetet ad vissza, amely tartalmazza a terv nevét és a két kiválasztott gyakorlat adatait.

## 21. LLM-válasz tartalmi ellenőrzése
**Prompt:** Ellenőrizd a generált edzéstervet a backendben, és csak olyan ajánlást fogadj el, amely a megengedett gyakorlatokat és ésszerű mennyiségeket tartalmazza.

**Eredmény:** Elkészült a tartalmi validáció. A backend ellenőrzi a gyakorlatokat, a sorozatokat és mennyiségeket, valamint azt, hogy az ajánlás megfelel-e a sportoló céljának és felszerelésének.

## 22. Hibás LLM-válasz újrapróbálása
**Prompt:** Ha az LLM által készített ajánlás nem felel meg a tartalmi ellenőrzésnek, próbáljon új ajánlást készíteni legfeljebb három alkalommal.

**Eredmény:** A rendszer a hibás LLM-választ nem fogadja el, hanem újrapróbálja a generálást. Három sikertelen próbálkozás után hibaüzenetet ad vissza.

## 23. Ajánlások változatossága
**Prompt:** Az újragenerált edzéstervek ne mindig ugyanazokat a gyakorlatokat tartalmazzák, miközben továbbra is megfelelnek a cél és felszerelés feltételeinek.

**Eredmény:** Az LLM számára átadott megfelelő gyakorlatok sorrendje próbálkozásonként keverésre kerül, így többféle érvényes ajánlás készülhet.

## 24. Felszerelés tényleges használata
**Prompt:** Ha a sportoló felszereléséhez tartozik megfelelő gyakorlat, az ajánlás legalább egy olyan gyakorlatot tartalmazzon, amely ténylegesen használja ezt a felszerelést.

**Eredmény:** A prompt és a backend tartalmi ellenőrzése biztosítja, hogy megfelelő esetben legalább egy felszerelést használó gyakorlat szerepeljen az ajánlásban.

## 25. Mértékegységek kezelése
**Prompt:** Az ajánlott gyakorlatoknál az ismétlés, másodperc és perc mértékegységek megfelelően legyenek kezelve és megjelenítve.

**Eredmény:** A gyakorlatkatalógus tárolja a gyakorlatok mértékegységét, amelyet a backend hozzáad a végleges ajánláshoz. Az ismétlés, másodperc és perc alapú ajánlások sikeresen tesztelve lettek.

## 26. Angular LLM-integráció
**Prompt:** Kösd össze az Angular felületet az edzésterv-ajánlási API-val, és minden sportolónál legyen lehetőség személyre szabott edzésterv kérésére.

**Eredmény:** A sportolók mellett megjelent az „Edzésterv ajánlása” gomb, és a generált terv az adott sportoló alatt jelenik meg.

## 27. Ajánlások és hibák megjelenítése
**Prompt:** Az elkészült ajánlások sportolónként külön jelenjenek meg, a sikertelen ajánlások hibaüzenete pedig az érintett sportoló alatt legyen látható.

**Eredmény:** Több sportoló ajánlása egyszerre megmaradhat a felületen, az újragenerálás csak az adott sportoló ajánlását cseréli le, a hibák pedig helyben jelennek meg.

## 28. LLM-validáció finomítása
**Prompt:** Enyhítsd az ajánlások mennyiségi ellenőrzését úgy, hogy az LLM kisebb eltérései miatt ne bukjon el egy egyébként használható terv, miközben az ésszerűtlen értékeket továbbra is utasítsa el.

**Eredmény:** A mennyiségi validáció általános, ésszerű tartományokra módosult, miközben a cél- és felszerelésalapú tartalmi ellenőrzés változatlanul megmaradt.

## 29. Szerepkörök vizuális megkülönböztetése
**Prompt:** Tedd vizuálisan egyértelműbbé a Sportoló és Edző szerepköröket anélkül, hogy külön jogosultsági rendszert építenénk.

**Eredmény:** A Sportoló és Edző szerepkörök különböző színű jelvényként jelennek meg a felhasználók listájában.

## 30. FitTrack felület rendezése
**Prompt:** Rendezd át a FitTrack felületét úgy, hogy a fő funkciók ne kizárólag egymás alatt jelenjenek meg, és a felület áttekinthetőbb, alkalmazásszerűbb legyen.

**Eredmény:** A felület reszponzív, többoszlopos elrendezést kapott. A Sportolók és Felhasználók, valamint az Új edzésterv és Edzésnapló egymás mellett jelennek meg nagyobb képernyőn, az Edzéstervek pedig teljes szélességben maradtak. A fő funkciók visszafogott színkódolást kaptak.