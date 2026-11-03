# FitTrack

A FitTrack egy edzéstervek, gyakorlatok és teljesített sorozatok nyilvántartására szolgáló webalkalmazás, amely mesterséges intelligencia segítségével személyre szabott edzésterv-ajánlásokat is képes készíteni.

## Felhasznált technológiák

- **Frontend:** Angular, TypeScript, HTML, CSS
- **Backend:** Node.js, Express, TypeScript
- **Adatbázis:** MySQL (XAMPP / MariaDB)
- **Mesterséges intelligencia:** Ollama, qwen3:1.7b
- **API-tesztelés:** Postman
- **Verziókezelés:** Git, GitHub

## Fő funkciók

### Sportolók kezelése
- Sportolók létrehozása és listázása.
- Edzéscél és rendelkezésre álló felszerelés megadása.
- Hiányzó adatok kezelése.
- Személyre szabott edzésterv-ajánlás kérése.

### Felhasználók kezelése
- Sportoló és Edző szerepkörű felhasználók létrehozása.
- Felhasználók listázása.
- Szerepkörök megjelenítése különböző színű jelvényekkel.
- Érvénytelen szerepkörök elutasítása.

### Edzéstervek és gyakorlatok
- Új edzésterv létrehozása és listázása.
- Gyakorlatok hozzáadása az edzéstervekhez.
- Edzésterv és gyakorlat közötti adatbázis-kapcsolat kezelése.

### Edzésnapló
- Teljesített sorozatok rögzítése.
- Ismétlésszám és terhelés megadása.
- Rögzített edzések megjelenítése.
- Adatok megőrzése az adatbázisban.
- Ismetlesszam és Terheles Value Objectek használata az adatok validálásához.

### AI-alapú edzésterv-ajánlás
- Helyben futó Ollama LLM használata.
- qwen3:1.7b nyelvi modell.
- Ajánlás a sportoló célja és felszerelése alapján.
- Gyakorlatok előszűrése egy előre meghatározott katalógusból.
- Strukturált JSON-kimenet feldolgozása.
- Generált ajánlások backendoldali ellenőrzése.
- Hibás ajánlások újrapróbálása, legfeljebb három alkalommal.
- Ismétlés-, másodperc- és percalapú gyakorlatok támogatása.
- Ajánlások sportolónkénti megjelenítése.

Az AI-ajánlások nem kerülnek automatikusan mentésre az adatbázisba.

### Bejelentkezési rendszer
- Adminfiókos bejelentkezés.
- Jelszavak sózott, hash-elt tárolása.
- Tokenalapú hitelesítés, nyolcórás lejárati idővel.
- Védett backend API-végpontok.
- Bejelentkezett állapot megőrzése oldalfrissítéskor, érvényes token esetén.
- Kijelentkezés.
- A bejelentkezett felhasználó kezdőbetűjének megjelenítése a fejlécben.

A bejelentkezési fiókokat az `auth_fiok` adatbázistábla tárolja.

A Felhasználók menüpontban létrehozott Sportoló és Edző szerepkörű személyek jelenleg nem kapnak automatikusan bejelentkezési fiókot. A többfelhasználós regisztráció és a szerepköralapú jogosultságkezelés még nem része az alkalmazásnak.

## Telepítés és indítás

A projekt forráskódja GitHubról letölthető vagy klónozható. A működéshez a helyi adatbázist, a backend hitelesítési beállításait és az Ollama szolgáltatást is elő kell készíteni.

### Előfeltételek

- Node.js és npm (az Angular 21-gyel kompatibilis verzió)
- MySQL vagy MariaDB, például XAMPP
- Ollama a `qwen3:1.7b` modellel (az AI-ajánlásokhoz)
- Git (opcionális, ZIP-letöltés esetén nem szükséges)

### 1. Projekt letöltése

A repository klónozása:

```bash
git clone https://github.com/KovacsAttilaMarcell/FitTrack.git
cd FitTrack
```

Alternatív megoldásként a GitHubon a **Code → Download ZIP** lehetőséggel is letölthető a projekt.

A letöltött ZIP nem tartalmazza a helyi `.env` fájlt, a telepített `node_modules` függőségeket vagy a MySQL adatbázis adatait.

### 2. Adatbázis létrehozása

1. Indítsd el a MySQL/MariaDB szolgáltatást (például XAMPP segítségével).
2. Nyisd meg a phpMyAdmin felületét.
3. Importáld a projekt főkönyvtárában található `database.sql` fájlt.
4. Az SQL-fájl létrehozza a `fittrack` adatbázist és az alkalmazás alapvető tábláit.

A jelenlegi `backend/src/database.ts` a következő helyi adatbázis-kapcsolatot használja:

```text
host: localhost
port: 3306
user: root
password: (üres)
database: fittrack
```

Amennyiben a MySQL-telepítés eltérő felhasználót, jelszót vagy portot használ, a `backend/src/database.ts` beállításait módosítani kell.

### 3. Backend konfigurálása és indítása

A `backend` mappában hozz létre egy `.env` fájlt a `.env.example` alapján.

Windows parancssorban:

```bat
cd backend
copy .env.example .env
```

A `.env` fájlban add meg a saját adminbejelentkezési adatokat:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=egy_eros_sajat_jelszo
AUTH_SECRET=egy_hosszu_veletlenszeru_titkos_kulcs
```

Az `ADMIN_PASSWORD` és `AUTH_SECRET` értékét saját, erős értékre kell cserélni.

Ezután telepítsd a függőségeket, és indítsd el a backendet:

```bash
npm install
npm run dev
```

A backend alapértelmezett címe:

`http://localhost:3000`

Az első indításkor létrejön az `auth_fiok` adatbázistábla és az adminfiók.

**Fontos:** meglévő adminfiók esetén a `.env` fájlban megváltoztatott jelszó nem feltétlenül írja felül a korábban adatbázisban tárolt jelszót.

### 4. Frontend indítása

Nyiss egy második terminált a projekt főkönyvtárában:

```bash
cd frontend
npm install
npm start
```

Az alkalmazás alapértelmezett címe:

`http://localhost:4200`

A bejelentkezéshez a backend konfigurálásakor megadott adminfiók adatai szükségesek.

### 5. Ollama és AI-ajánlások

Telepítsd és indítsd el az Ollamát.

A használt modell letöltése:

```bash
ollama pull qwen3:1.7b
```

Az Ollama szolgáltatás alapértelmezett címe:

`http://localhost:11434`

Ha szükséges, a szolgáltatás elindítható az alábbi paranccsal:

```bash
ollama serve
```

A backend opcionálisan az alábbi környezeti változókat támogatja:

```env
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=qwen3:1.7b
```

Az AI-alapú edzésterv-ajánlások működéséhez az Ollama szolgáltatásnak és a megfelelő modellnek elérhetőnek kell lennie.

### 6. Gyors működésellenőrzés

A telepítés után a következő lépésekkel ellenőrizhető az alkalmazás:

1. Nyisd meg a FitTrack felületét.
2. Jelentkezz be az adminfiókkal.
3. Hozz létre egy sportolót céllal és felszereléssel.
4. Kérj személyre szabott AI-edzésterv-ajánlást.
5. Hozz létre egy edzéstervet, és adj hozzá gyakorlatot.
6. Rögzíts egy teljesített sorozatot az Edzésnaplóban.
7. Frissítsd az oldalt, és ellenőrizd a tárolt adatok megmaradását.

### Gyakori indítási problémák

- **Adatbázis-kapcsolati hiba:** ellenőrizd a MySQL szolgáltatást és a `backend/src/database.ts` beállításait.
- **Hiányzó adminbeállítások:** ellenőrizd a `backend/.env` fájlt.
- **Nem működik az AI-ajánlás:** ellenőrizd az Ollama szolgáltatást és a `qwen3:1.7b` modell meglétét.
- **Hiányzó npm-csomagok:** futtasd az `npm install` parancsot a backend és frontend mappában.
- **Foglalt port:** ellenőrizd, hogy más alkalmazás nem használja-e a szükséges portokat.

## Tesztelés

A projekt funkcióinak ellenőrzésére 47 manuális teszteset készült, amelyek sikeresen teljesültek.

A tesztek többek között az alábbiakat vizsgálják:

- Edzéstervek és gyakorlatok létrehozása.
- Adatok megmaradása.
- Ismétlésszám és terhelés validációja.
- Sportolók és felhasználók kezelése.
- AI-ajánlások generálása és ellenőrzése.
- Hibás és hiányzó adatok kezelése.
- Bejelentkezés és hitelesítés.

A tesztesetek és azok eredményei a `Manual_tests.md` fájlban találhatók.

## AI-használat dokumentációja

A fejlesztés során használt fontosabb AI-promptokat és azok eredményeit az `AI_prompt_napló.md` fájl dokumentálja.

## Megjegyzések

- Az AI-ajánlásokhoz az Ollama helyi futtatása szükséges.
- A bejelentkezéshez jelenleg adminfiók használható.
- A jelszavakat és titkos kulcsokat tartalmazó `.env` fájl nem kerülhet fel a GitHubra.
- Az alkalmazás oktatási célú projekt.
