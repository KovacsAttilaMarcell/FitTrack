
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Gyakorlat {
    id: number;
    nev: string;
    edzesterv_id: number;
}

interface Edzesterv {
    id: number;
    nev: string;
    gyakorlatok?: Gyakorlat[];
}

interface Edzesnaplo {
    id: number;
    ismetlesszam: number;
    terheles: string;
    datum: string;
    gyakorlat_nev: string;
    edzesterv_nev: string;
}

interface Sportolo {
    id: number;
    nev: string;
    cel: string | null;
    felszereles: string | null;
}

interface Felhasznalo {
    id: number;
    nev: string;
    szerepkor: 'sportolo' | 'edzo';
}

interface AjanlottGyakorlat {
    nev: string;
    sorozatok: number;
    ismetles: number;
    mertekegyseg: string;
    felszereles: string;
}

interface EdzestervAjanlas {
    sportolo: Sportolo;
    ajanlas: {
        tervNev: string;
        gyakorlatok: AjanlottGyakorlat[];
    };
}

@Component({
    selector: 'app-root',
    imports: [CommonModule, FormsModule],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App implements OnInit {
    private readonly apiUrl = 'http://localhost:3000/api';

    aktivOldal = signal<
        'sportolok' | 'felhasznalok' | 'edzestervek' | 'edzesnaplo'
    >('sportolok');

    // Bejelentkezés
    bejelentkezve = signal(false);
    belepesEllenorzes = signal(true);
    belepesFolyamatban = signal(false);
    belepesHiba = signal('');
    belepettNev = signal('');

    belepesNev = '';
    belepesJelszo = '';

    private authToken =
        sessionStorage.getItem('fittrack_token') || '';

    // Alkalmazásadatok
    edzestervek = signal<Edzesterv[]>([]);
    edzesnaplo = signal<Edzesnaplo[]>([]);
    sportolok = signal<Sportolo[]>([]);
    felhasznalok = signal<Felhasznalo[]>([]);

    edzestervAjanlasok =
        signal<Record<number, EdzestervAjanlas>>({});

    ajanlasHiba = signal('');
    ajanlasBetolteseSportoloId = signal<number | null>(null);
    kivalasztottSportoloId = signal<number | null>(null);

    ujEdzestervNev = '';

    gyakorlatNevek: { [key: number]: string } = {};
    ismetlesszamok: { [key: number]: number | null } = {};
    terhelesek: { [key: number]: number | null } = {};

    ujSportoloNev = '';
    ujSportoloCel = '';
    ujSportoloFelszereles = '';

    ujFelhasznaloNev = '';
    ujFelhasznaloSzerepkor: 'sportolo' | 'edzo' = 'sportolo';

    constructor(private http: HttpClient) {}

    ngOnInit() {
        if (!this.authToken) {
            this.belepesEllenorzes.set(false);
            return;
        }

        this.apiGet<{ username: string }>(
            `${this.apiUrl}/auth/me`
        ).subscribe({
            next: (adatok) => {
                this.belepettNev.set(adatok.username);
                this.bejelentkezve.set(true);
                this.belepesEllenorzes.set(false);
                this.adatokBetoltese();
            },
            error: () => {
                this.kijelentkezes();
                this.belepesEllenorzes.set(false);
            }
        });
    }

    // Hitelesített HTTP-kérések
    private authHeaders(): HttpHeaders {
        return new HttpHeaders({
            Authorization: `Bearer ${this.authToken}`
        });
    }

    private apiGet<T>(url: string): Observable<T> {
        return this.http.get<T>(url, {
            headers: this.authHeaders()
        });
    }

    private apiPost<T>(
        url: string,
        body: unknown
    ): Observable<T> {
        return this.http.post<T>(url, body, {
            headers: this.authHeaders()
        });
    }

    // Bejelentkezés
    bejelentkezes() {
        if (this.belepesFolyamatban()) {
            return;
        }

        if (!this.belepesNev.trim() || !this.belepesJelszo) {
            this.belepesHiba.set(
                'Add meg a felhasználónevet és a jelszót!'
            );
            return;
        }

        this.belepesHiba.set('');
        this.belepesFolyamatban.set(true);

        this.http.post<{
            token: string;
            username: string;
        }>(
            `${this.apiUrl}/auth/login`,
            {
                username: this.belepesNev.trim(),
                password: this.belepesJelszo
            }
        ).subscribe({
            next: (adatok) => {
                this.authToken = adatok.token;

                sessionStorage.setItem(
                    'fittrack_token',
                    adatok.token
                );

                this.belepettNev.set(adatok.username);
                this.belepesJelszo = '';
                this.bejelentkezve.set(true);
                this.belepesFolyamatban.set(false);

                this.adatokBetoltese();
            },
            error: (hiba) => {
                this.belepesHiba.set(
                    hiba.error?.message ||
                    'Nem sikerült bejelentkezni.'
                );

                this.belepesFolyamatban.set(false);
            }
        });
    }

    // Kijelentkezés
    kijelentkezes() {
        this.authToken = '';

        sessionStorage.removeItem('fittrack_token');

        this.bejelentkezve.set(false);
        this.belepettNev.set('');
        this.belepesJelszo = '';

        this.edzestervek.set([]);
        this.edzesnaplo.set([]);
        this.sportolok.set([]);
        this.felhasznalok.set([]);

        this.edzestervAjanlasok.set({});
        this.ajanlasHiba.set('');
        this.kivalasztottSportoloId.set(null);
        this.ajanlasBetolteseSportoloId.set(null);

        this.aktivOldal.set('sportolok');
    }

    private adatokBetoltese() {
        this.edzestervekBetoltese();
        this.edzesnaploBetoltese();
        this.sportolokBetoltese();
        this.felhasznalokBetoltese();
    }

    oldalValtas(
        oldal:
            'sportolok' |
            'felhasznalok' |
            'edzestervek' |
            'edzesnaplo'
    ) {
        this.aktivOldal.set(oldal);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Edzéstervek
    edzestervekBetoltese() {
        this.apiGet<Edzesterv[]>(
            `${this.apiUrl}/edzestervek`
        ).subscribe({
            next: (adatok) => {
                this.edzestervek.set(adatok);

                adatok.forEach(terv =>
                    this.gyakorlatokBetoltese(terv)
                );
            },
            error: (hiba) =>
                console.error(
                    'Hiba az edzéstervek betöltésekor:',
                    hiba
                )
        });
    }

    gyakorlatokBetoltese(terv: Edzesterv) {
        this.apiGet<Gyakorlat[]>(
            `${this.apiUrl}/edzestervek/${terv.id}/gyakorlatok`
        ).subscribe({
            next: (adatok) => {
                this.edzestervek.update(tervek =>
                    tervek.map(t =>
                        t.id === terv.id
                            ? { ...t, gyakorlatok: adatok }
                            : t
                    )
                );
            },
            error: (hiba) =>
                console.error(
                    'Hiba a gyakorlatok betöltésekor:',
                    hiba
                )
        });
    }

    edzestervHozzaadasa() {
        if (!this.ujEdzestervNev.trim()) {
            return;
        }

        this.apiPost(
            `${this.apiUrl}/edzestervek`,
            { nev: this.ujEdzestervNev }
        ).subscribe({
            next: () => {
                this.ujEdzestervNev = '';
                this.edzestervekBetoltese();
            },
            error: (hiba) =>
                console.error(
                    'Hiba az edzésterv hozzáadásakor:',
                    hiba
                )
        });
    }

    gyakorlatHozzaadasa(terv: Edzesterv) {
        const nev = this.gyakorlatNevek[terv.id];

        if (!nev || !nev.trim()) {
            return;
        }

        this.apiPost(
            `${this.apiUrl}/gyakorlatok`,
            {
                nev,
                edzesterv_id: terv.id
            }
        ).subscribe({
            next: () => {
                this.gyakorlatNevek[terv.id] = '';
                this.gyakorlatokBetoltese(terv);
            },
            error: (hiba) =>
                console.error(
                    'Hiba a gyakorlat hozzáadásakor:',
                    hiba
                )
        });
    }

    // Edzés rögzítése
    edzesRogzitese(gyakorlat: Gyakorlat) {
        const ismetlesszam =
            this.ismetlesszamok[gyakorlat.id];

        const terheles =
            this.terhelesek[gyakorlat.id];

        if (
            !ismetlesszam ||
            ismetlesszam <= 0 ||
            terheles === null ||
            terheles === undefined ||
            terheles < 0
        ) {
            return;
        }

        this.apiPost(
            `${this.apiUrl}/edzesnaplo`,
            {
                gyakorlat_id: gyakorlat.id,
                ismetlesszam,
                terheles
            }
        ).subscribe({
            next: () => {
                this.ismetlesszamok[gyakorlat.id] = null;
                this.terhelesek[gyakorlat.id] = null;

                this.edzesnaploBetoltese();
            },
            error: (hiba) =>
                console.error(
                    'Hiba az edzés rögzítésekor:',
                    hiba
                )
        });
    }

    edzesnaploBetoltese() {
        this.apiGet<Edzesnaplo[]>(
            `${this.apiUrl}/edzesnaplo`
        ).subscribe({
            next: (adatok) =>
                this.edzesnaplo.set(adatok),
            error: (hiba) =>
                console.error(
                    'Hiba az edzésnapló betöltésekor:',
                    hiba
                )
        });
    }

    // Sportolók
    sportolokBetoltese() {
        this.apiGet<Sportolo[]>(
            `${this.apiUrl}/sportolok`
        ).subscribe({
            next: (adatok) =>
                this.sportolok.set(adatok),
            error: (hiba) =>
                console.error(
                    'Hiba a sportolók betöltésekor:',
                    hiba
                )
        });
    }

    sportoloHozzaadasa() {
        if (!this.ujSportoloNev.trim()) {
            return;
        }

        this.apiPost(
            `${this.apiUrl}/sportolok`,
            {
                nev: this.ujSportoloNev,
                cel: this.ujSportoloCel,
                felszereles: this.ujSportoloFelszereles
            }
        ).subscribe({
            next: () => {
                this.ujSportoloNev = '';
                this.ujSportoloCel = '';
                this.ujSportoloFelszereles = '';

                this.sportolokBetoltese();
            },
            error: (hiba) =>
                console.error(
                    'Hiba a sportoló hozzáadásakor:',
                    hiba
                )
        });
    }

    // Felhasználók
    felhasznalokBetoltese() {
        this.apiGet<Felhasznalo[]>(
            `${this.apiUrl}/felhasznalok`
        ).subscribe({
            next: (adatok) =>
                this.felhasznalok.set(adatok),
            error: (hiba) =>
                console.error(
                    'Hiba a felhasználók betöltésekor:',
                    hiba
                )
        });
    }

    felhasznaloHozzaadasa() {
        if (!this.ujFelhasznaloNev.trim()) {
            return;
        }

        this.apiPost(
            `${this.apiUrl}/felhasznalok`,
            {
                nev: this.ujFelhasznaloNev,
                szerepkor: this.ujFelhasznaloSzerepkor
            }
        ).subscribe({
            next: () => {
                this.ujFelhasznaloNev = '';
                this.ujFelhasznaloSzerepkor = 'sportolo';

                this.felhasznalokBetoltese();
            },
            error: (hiba) =>
                console.error(
                    'Hiba a felhasználó hozzáadásakor:',
                    hiba
                )
        });
    }

    // AI-alapú edzésterv-ajánlás
    edzestervAjanlasKeszitese(sportolo: Sportolo) {
        this.ajanlasHiba.set('');
        this.kivalasztottSportoloId.set(sportolo.id);
        this.ajanlasBetolteseSportoloId.set(sportolo.id);

        this.apiPost<EdzestervAjanlas>(
            `${this.apiUrl}/sportolok/${sportolo.id}/ajanlas`,
            {}
        ).subscribe({
            next: (adatok) => {
                this.edzestervAjanlasok.update(ajanlasok => ({
                    ...ajanlasok,
                    [sportolo.id]: adatok
                }));

                this.ajanlasBetolteseSportoloId.set(null);
            },
            error: (hiba) => {
                console.error(
                    'Hiba az edzésterv-ajánlásnál:',
                    hiba
                );

                this.ajanlasHiba.set(
                    hiba.error?.message ||
                    'Hiba történt az edzésterv-ajánlás elkészítésekor.'
                );

                this.ajanlasBetolteseSportoloId.set(null);
            }
        });
    }
}
