## Lokale Entwicklung
Um an der Website lokal zu arbeiten, um sie weiterzuentwicklen,
empfiehlt es sich mit `npx live-server` sich einen aktuellen Stand der Seite anzeigen zu lassen.

Um `npx` zu benutzen braucht man `nodejs`. Dieses kann man sich mit dem Paket-Manager seiner Wahl herunterladen.
```powershell
scoop install nodejs
```
Danach kann man einfach `npx live-server` in der Base-Dir des Projekts starten.

## Projekt Struktur
Dieses ganze Ding ist Reverse-Engineered, daher ist zu hinterfragen, was wirklich alles davon gebraucht wird.

```cmd

│   index.html
│   README.md
│
├───css
│       main.css
│       normalize.min.css
│
├───fonts
│       abellio-kundencenter-monitore.woff
│
├───img
│       abellio-logo.png
│       disturber-travel-information.png
│
└───js
    │   main.min.js                 => hier passiert die Magie
    │   plugins.min.js              => wahrscheinlich überflüssig
    │
    └───vendor
            jquery-1.11.2.min.js    => müsste wahrscheinlich mal geupdatet werden

```
