# Aplicația „Design Maker”

## Descriere generală
„Design Maker” este o aplicație web interactivă destinată utilizatorilor care doresc să creeze rapid și intuitiv design-uri grafice personalizate. Aplicația oferă o interfață modernă și prietenoasă, accesibilă doar după autentificare, prin care utilizatorii pot adăuga, edita și salva conținut vizual precum forme, text, imagini și coduri QR.

## Adresa repository-ului
[Repository GitHub](https://github.com/Vasile-Marinel/design-maker)

## Tehnologii utilizate
- React.js pentru partea de interfață
- Node.js și Express.js pentru backend
- Firebase Firestore pentru stocarea datelor
- Firebase Authentication pentru autentificare
- Cloudinary pentru gestionarea imaginilor
- CSS și Tailwind CSS pentru stilizare

## Structura principală a colecțiilor Firestore
- **users** – informații despre utilizatori
- **designs** – design-urile create de utilizatori
- **templates** – șabloane predefinite
- **user_images** – imagini încărcate de utilizatori
- **design_images** – imagini puse la dispoziție de aplicație
- **background_images** – imagini de fundal oferite în aplicație

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

3. Adaugă fișierul `.env` cu următoarele chei pentru Firebase:
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

## Lansare aplicație
Momentan aplicația rulează doar local, dar poate fi distribuită folosind servicii de hosting precum Firebase Hosting, Vercel sau Netlify.

---
