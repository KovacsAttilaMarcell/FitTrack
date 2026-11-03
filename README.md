
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

### Előfeltételek

- Node.js és npm
- Angular CLI
- MySQL vagy MariaDB (például XAMPP)
- Ollama
- Letöltött qwen3:1.7b modell

### 1. Adatbázis

Indítsd el a MySQL szolgáltatást, majd hozd létre a FitTrack alkalmazáshoz szükséges `fittrack` adatbázist.

A backend adatbázis-kapcsolatát a környezeti változókban kell beállítani.

### 2. Backend indítása

Lépj be a backend könyvtárába:

```bash
cd backend
npm install
```

Állítsd be a backend által használt `.env` fájlt. A bejelentkezéshez szükséges környezeti változók például:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=egy_eros_sajat_jelszo
AUTH_SECRET=egy_hosszu_veletlenszeru_titkos_kulcs
```

Az adatbázis és az Ollama kapcsolódási beállításait is a backend konfigurációjának megfelelően kell megadni.

A backendet a projekt `package.json` fájljában meghatározott fejlesztői paranccsal kell elindítani.

### 3. Frontend indítása

```bash
cd frontend
npm install
npm start
```

Ezután nyisd meg a terminálban megjelenő helyi Angular-címet.

### 4. Ollama indítása

A szükséges modell letöltése:

```bash
ollama pull qwen3:1.7b
```

Az Ollama szolgáltatásnak futnia kell az AI-ajánlások használatához.

## Tesztelés

A projekt funkcióinak ellenőrzésére manuális tesztesetek készültek.

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
