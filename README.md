# Design Maker

## Descriere generală

„Design Maker" este o aplicație web interactivă destinată utilizatorilor care doresc să creeze rapid și intuitiv design-uri grafice personalizate. Aplicația oferă o interfață modernă și prietenoasă, accesibilă doar după autentificare, prin care utilizatorii pot adăuga, edita și salva conținut vizual precum forme, text, imagini și coduri QR.

## Adresa repository-ului

[https://github.com/Vasile-Marinel/design-maker](https://github.com/Vasile-Marinel/design-maker)

## Tehnologii utilizate

- **React.js** — interfața utilizator
- **Node.js / Express.js** — backend și API
- **Firebase Firestore** — stocarea datelor
- **Firebase Authentication** — autentificarea utilizatorilor
- **Cloudinary** — gestionarea și stocarea imaginilor
- **CSS / Tailwind CSS** — stilizare

## Structura principală a colecțiilor Firestore

| Colecție | Conținut |
|---|---|
| `users` | Informații despre utilizatori |
| `designs` | Design-urile create de utilizatori |
| `templates` | Șabloane predefinite |
| `user_images` | Imagini încărcate de utilizatori |
| `design_images` | Imagini puse la dispoziție de aplicație |
| `background_images` | Imagini de fundal oferite în aplicație |

---

## Pipeline DevSecOps
![DevSecOps Pipeline](https://github.com/Vasile-Marinel/design-maker/actions/workflows/devsecops-pipeline.yml/badge.svg)

Proiectul integrează un pipeline de securitate automatizat configurat cu **GitHub Actions**, care rulează la fiecare `push` sau `pull request` pe branch-urile `main` și `master`. Pipeline-ul implementează trei straturi de analiză complementare: SCA, Secret Scanning și SAST.

### Arhitectura pipeline-ului

```
Push / Pull Request
        │
        ▼
┌───────────────────────────────────────────┐
│           GitHub Actions Runner           │
│                                           │
│  1. actions/checkout@v5                   │
│     └─ Istoric Git complet (fetch-depth 0)│
│                                           │
│  2. NPM Audit ──────────► SCA             │
│     └─ Raport JSON + gate pe Critical     │
│                                           │
│  3. TruffleHog ─────────► Secret Scanning │
│     └─ Scanare istoric Git complet        │
│                                           │
│  4. Semgrep ────────────► SAST            │
│     └─ 120 reguli JS/Node/React/Secrets   │
└───────────────────────────────────────────┘
```

### Tool-uri utilizate

#### 1. NPM Audit — Software Composition Analysis (SCA)

Verifică toate dependențele din `package.json` față de baza de date NVD (National Vulnerability Database) și identifică pachete cu vulnerabilități cunoscute. Pipeline-ul salvează raportul complet în format JSON ca artifact descărcabil și blochează execuția doar la severitatea **Critical**, vulnerabilitățile de severitate inferioară nu blochează execuția, dar sunt documentate în raportul JSON.

#### 2. TruffleHog — Secret Scanning

Scanează **întregul istoric Git** al proiectului căutând secrete expuse accidental: chei API Firebase, token-uri Cloudinary, parole, credențiale cloud. Parametrul `fetch-depth: 0` la checkout este esențial, fără istoricul complet, un secret adăugat și „șters" în commit-uri anterioare ar trece nedetectat. Relevanța pentru Design Maker este directă: aplicația folosește Firebase și Cloudinary, servicii cloud ale căror credențiale compromise ar oferi acces complet la datele utilizatorilor și la stocarea media.

#### 3. Semgrep — Static Application Security Testing (SAST)

Analizează codul sursă fără execuție, căutând tipare de cod cunoscute ca vulnerabile. Sunt utilizate patru seturi de reguli complementare: `p/javascript` pentru vulnerabilități JavaScript generice, `p/nodejs` pentru riscuri specifice runtime-ului Express (path traversal, SSRF server-side), `p/react` pentru pattern-uri periculoase în frontend, și `p/secrets` ca strat suplimentar de detecție a secretelor hardcodate în cod.

### Fișierul de configurare

```yaml
name: DevSecOps Pipeline - Design Maker

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

# Least Privilege: token-ul are doar permisiuni de citire
permissions:
  contents: read

jobs:
  security_scan:
    runs-on: ubuntu-latest

    steps:
      # fetch-depth: 0 necesar pentru scanarea întregului istoric Git (TruffleHog)
      - name: Checkout code
        uses: actions/checkout@v5
        with:
          fetch-depth: 0

      # ── 1. SCA - Software Composition Analysis ───────────────────────────────
      # Colectăm raportul complet în JSON, blocăm pipeline-ul doar pe Critical
      - name: SCA - NPM Audit
        run: |
          npm audit --json > npm-audit-report.json || true
          npm audit --audit-level=critical

      # Raportul e disponibil ca artifact indiferent de rezultatul scanării
      - name: Upload NPM Audit Report
        uses: actions/upload-artifact@v6
        if: always()
        with:
          name: npm-audit-report
          path: npm-audit-report.json

      # ── 2. Secret Scanning ───────────────────────────────────────────────────
      # Scanează întregul istoric Git după chei API, token-uri, credențiale
      - name: Secret Detection - TruffleHog
        uses: trufflesecurity/trufflehog@v3.94.3
        with:
          path: ./

      # ── 3. SAST - Static Application Security Testing ────────────────────────
      # Analiză statică pe codul sursă JS/Node.js/React cu reguli de securitate
      - name: SAST - Semgrep
        uses: semgrep/semgrep-action@v1
        with:
          config: >-
            p/javascript
            p/nodejs
            p/react
            p/secrets
        env:
          SEMGREP_APP_TOKEN: ${{ secrets.SEMGREP_APP_TOKEN }}
```

---

## Analiza vulnerabilităților identificate

### Starea inițială — înainte de remediere

NPM Audit a identificat **28 de vulnerabilități** în dependențele proiectului:

| Severitate | Număr |
|---|---|
| 🔴 Critical | 3 |
| 🟠 High | 12 |
| 🟡 Moderate | 4 |
| 🟢 Low | 9 |

#### Vulnerabilități critice analizate

**`axios` — SSRF și Cloud Metadata Exfiltration**

Axios prezintă o vulnerabilitate de tip Server-Side Request Forgery ([GHSA-3p68-rc4w-qgx5](https://github.com/advisories/GHSA-3p68-rc4w-qgx5)) și o vulnerabilitate de exfiltrare a metadatelor cloud prin injectare de headere ([GHSA-fvcv-3m26-pcqx](https://github.com/advisories/GHSA-fvcv-3m26-pcqx)). În context cloud, SSRF permite unui atacator să redirecționeze request-uri către endpoint-ul intern de metadate al instanței (`169.254.169.254`), de unde poate extrage credențiale IAM temporare. Această vulnerabilitate este specifică mediilor cloud și nu ar fi exploatabilă în aceeași manieră pe o aplicație desktop.

**`cloudinary` — Argument Injection**

SDK-ul Cloudinary conține o vulnerabilitate de injectare a argumentelor prin parametri care includ caracterul `&` ([GHSA-g4mf-96x5-5m2c](https://github.com/advisories/GHSA-g4mf-96x5-5m2c)). Relevanța pentru Design Maker este directă, Cloudinary este utilizat pentru încărcarea și gestionarea imaginilor, operațiuni care procesează input de la utilizatori.

**`firebase-admin` — Dependențe vulnerabile (trade-off documentat)**

Firebase Admin SDK prezintă vulnerabilități prin dependențele sale tranzitive (`@google-cloud/firestore`, `@google-cloud/storage`). Fix-ul disponibil necesită un **breaking change**: downgrade la versiunea 10.3.0, incompatibilă cu API-ul utilizat în codul actual. Decizia adoptată: vulnerabilitatea este acceptată ca risc rezidual documentat, cu planificarea migrării într-o iterație viitoare, practică standard în industrie când costul remedierii imediate depășește riscul real în contextul specific al aplicației.

### Starea finală — după `npm audit fix`


```bash
npm audit fix
npm audit
```

| Severitate | Înainte | După |
|---|---|---|
| 🔴 Critical | 3 | [1] |
| 🟠 High | 12 | [3] |
| 🟡 Moderate | 4 | [8] |
| 🟢 Low | 9 | [2] |

Vulnerabilitățile reziduale după remediere sunt asociate exclusiv cu `firebase-admin` și dependențele sale, gestionate ca risc acceptat documentat (vezi secțiunea anterioară).

---

## Relevanța față de securitatea cloud

Pipeline-ul DevSecOps implementat adresează riscuri **specifice mediilor cloud**, distincte de securitatea generală a aplicațiilor:

**Protecția secretelor cloud** — TruffleHog scanează istoricul Git după credențiale Firebase și Cloudinary. Compromiterea acestora oferă acces complet la baza de date Firestore a tuturor utilizatorilor și la stocarea media, un impact imposibil în arhitecturi fără servicii cloud externe.

**Supply chain security în CI/CD** — Pipeline-ul însuși este o suprafață de atac. Acțiunile GitHub sunt versionate (`@v5`, `@v3.94.3`) pentru a preveni supply chain attacks prin modificarea tag-urilor. Permisiunile token-ului sunt restricționate la `read` prin principiul least privilege.

**SSRF și Cloud Metadata** — Vulnerabilitatea Axios de tip SSRF este exploatabilă specific în context cloud prin accesarea endpoint-ului de metadate al instanței (`169.254.169.254`), care returnează credențiale IAM temporare. Această clasă de atac nu există în aplicații desktop.

**Servicii managed și dependențe terțe** — Arhitectura Design Maker (Firebase, Cloudinary) elimină necesitatea gestionării infrastructurii, dar introduce dependențe față de SDK-uri third-party al căror supply chain trebuie monitorizat continuu prin SCA.

---

## Limitări cunoscute ale pipeline-ului

**Scanare imagini Docker** — Design Maker utilizează servicii cloud managed (Firebase, Cloudinary, Vercel/Netlify) și nu necesită containere Docker în arhitectura sa curentă. Într-o arhitectură bazată pe containere, pasul următor ar fi integrarea unui scanner de tip Trivy, care verifică vulnerabilitățile la nivel de sistem de operare din imaginea Docker, un strat pe care npm audit nu îl acoperă.

**DAST (Dynamic Application Security Testing)** — Pipeline-ul actual analizează codul static și dependențele, dar nu testează aplicația în execuție. Un pipeline complet ar include și DAST (ex: OWASP ZAP) pentru detectarea vulnerabilităților care apar doar la runtime.

**Runtime monitoring** — Pipeline-ul rulează la fiecare push, nu monitorizează aplicația în producție. Vulnerabilități exploatate activ nu ar fi detectate prin acest mecanism.

---

## Pași pentru rulare locală

1. Clonează repository-ul:
    ```bash
    git clone https://github.com/Vasile-Marinel/design-maker
    cd design-maker
    ```

2. Instalează dependențele:
    ```bash
    npm install
    ```
    ```bash
    cd frontend
    npm install
    ```

3. Adaugă fișierul `.env` cu cheile Firebase:
    ```
    VITE_API_KEY=...
    VITE_AUTH_DOMAIN=...
    VITE_PROJECT_ID=...
    VITE_STORAGE_BUCKET=...
    VITE_MESSAGING_SENDER_ID=...
    VITE_APP_ID=...
    ```

4. Rulează aplicația:
    ```bash
    npm run dev
    ```

## Compilare pentru producție

```bash
npm run build
```

## Rularea pipeline-ului DevSecOps

Pipeline-ul rulează automat la fiecare push pe GitHub. Pentru a vedea rezultatele, accesează tab-ul **Actions** din repository. Raportul NPM Audit complet este disponibil în secțiunea **Artifacts** a fiecărei rulări.

Pentru a rula analiza de vulnerabilități local:
```bash
npm audit
npm audit --json > npm-audit-report.json
```

---
