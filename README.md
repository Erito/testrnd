Link Repository GitHub: https://github.com/Erito/testrnd

Tech Stack: React-Vite(frontend), Express.js(backend), Axios, TailwindCSS
Database: MySQL(MariaDB)

Struktur File(Hierarki):
C:.
|   struktur.txt
|   
+---backend
|   |   package-lock.json
|   |   package.json
|   |   
|   \---src
|           konekdb.js
|           server.js
|           
\---frontend
    |   .gitignore
    |   eslint.config.js
    |   index.css
    |   index.html
    |   package-lock.json
    |   package.json
    |   postcss.config.js
    |   tailwind.config.js
    |   vite.config.js
    |   
    +---public
    |       vite.svg
    |       
    \---src
        |   App.jsx
        |   main.jsx
        |   
        +---lib
        |       axios.js
        |       
        \---routes
                Adminpage.jsx
                Event.jsx
                Login.jsx
                Register.jsx
                


==================================================================
===============================PANDUAN============================
1.	Buat Database di MySQL(MariaDB), jangan lupa nyalakan selalu xamppnya:
mysql -u root -p
CREATE DATABASE titusrnd_db;
USE titusrnd_db
SOURCE D:/kuliah/titusrnd_db.sql;  (kalau ini salin path .sqlnya, klik kanan 'copy as path')


2. Open folder TitusRND (atau klik kanan open terminal, lalu ketik code . pada terminal)
//JALANKAN PERINTAH DIBAWAH INI DI TERMINAL
cd .\backend\
npm i
npm run dev

//BUKA TERMINAL BARU LAGI
cd .\frontend\
npm i
npm run dev
