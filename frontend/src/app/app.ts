import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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

@Component({
    selector: 'app-root',
    imports: [CommonModule, FormsModule],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App implements OnInit {
    edzestervek = signal<Edzesterv[]>([]);
    ujEdzestervNev = '';
    gyakorlatNevek: { [key: number]: string } = {};

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.edzestervekBetoltese();
    }

    edzestervekBetoltese() {
        this.http.get<Edzesterv[]>('http://localhost:3000/api/edzestervek').subscribe({
            next: (adatok) => {
                this.edzestervek.set(adatok);
                adatok.forEach(terv => this.gyakorlatokBetoltese(terv));
            },
            error: (hiba) => console.error('Hiba az edzéstervek betöltésekor:', hiba)
        });
    }

    gyakorlatokBetoltese(terv: Edzesterv) {
        this.http.get<Gyakorlat[]>(`http://localhost:3000/api/edzestervek/${terv.id}/gyakorlatok`).subscribe({
            next: (adatok) => {
                this.edzestervek.update(tervek => tervek.map(t => t.id === terv.id ? { ...t, gyakorlatok: adatok } : t));
            },
            error: (hiba) => console.error('Hiba a gyakorlatok betöltésekor:', hiba)
        });
    }

    edzestervHozzaadasa() {
        if (!this.ujEdzestervNev.trim()) return;

        this.http.post('http://localhost:3000/api/edzestervek', { nev: this.ujEdzestervNev }).subscribe({
            next: () => {
                this.ujEdzestervNev = '';
                this.edzestervekBetoltese();
            },
            error: (hiba) => console.error('Hiba az edzésterv hozzáadásakor:', hiba)
        });
    }

    gyakorlatHozzaadasa(terv: Edzesterv) {
        const nev = this.gyakorlatNevek[terv.id];
        if (!nev || !nev.trim()) return;

        this.http.post('http://localhost:3000/api/gyakorlatok', { nev, edzesterv_id: terv.id }).subscribe({
            next: () => {
                this.gyakorlatNevek[terv.id] = '';
                this.gyakorlatokBetoltese(terv);
            },
            error: (hiba) => console.error('Hiba a gyakorlat hozzáadásakor:', hiba)
        });
    }
}