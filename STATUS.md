# Sharkie – Status & Umsetzungsplan

**Fortschritt: 42 % (23 / 55 Pflichtpunkte)** · Stand: 12.10.2026 · Basis: Commit e9bdc27

Diese Datei ist die einzige Fortschritts-Übersicht. Nach jeder Code-Änderung abhaken und Prozentwert neu berechnen.
Fortschritt = erledigte Pflichtpunkte / alle Pflichtpunkte; optionale Punkte zählen nicht mit.

## Reihenfolge der Umsetzung
1. Aufräumen & Fundament (A, B, Interval-Verwaltung aus E, Long-Idle)
2. Charakter-Mechanik (C)
3. Collectibles (C)
4. Gegner (D)
5. Level-Design & Balancing (D)
6. Spielablauf (E)
7. Sound (F)
8. Landingpage (G)
9. Responsive/Mobile (H)
10. Clean Code (I)
11. Abnahme (J)

## A – Git & Struktur
- [x] GitHub-Repo, regelmäßige Commits
- [ ] Aussagekräftige Commit-Messages (teils generisch, z. B. "Implement code changes…")
- [ ] .gitignore (graphify-out, .claude ausschließen)
- [x] index.html als Hauptseite
- [x] Klassenordner ("models" mit Unterordnern base / entities / hud / world / collectibles)
- [x] Bilder in eigenem img-Ordner

## B – Funktionalität & Design
- [x] Keine console.log (entfernt; Konsolenfehler im Browser noch prüfen)
- [ ] Debug-Hitboxen (drawFrame) entfernt – wird in World.addToMap noch aufgerufen
- [x] Schriftart lokal eingebunden
- [x] Favicon
- [ ] Buttons mit cursor: pointer
- [x] Hintergrund ohne Lücken

## C – Charakter
- [x] Idle-Animation
- [ ] Long-Idle nach max. 15 s (aktuell 2 min)
- [x] Schwimm-Animation
- [ ] Hurt-Animationen (Gift / Stromschlag) genutzt
- [x] Tod durch Gift + unbeweglich nach Tod
- [ ] Tod durch Stromschlag
- [x] Fin Slap mit Trefferlogik (SPACE, Pfad-Bug behoben)
- [x] Blasen-Angriff (Taste A)
- [ ] Gift-Blase (verbraucht Gift) – Logik vorhanden, Giftflaschen zum Einsammeln fehlen noch
- [x] Lebensleiste sinkt bei Schaden
- [x] HUD für Leben / Gift / Coins
- [x] Coins einsammeln
- [ ] Giftflaschen einsammeln

## D – Gegner
- [x] Kugelfisch: Bewegung / Patrouille
- [ ] Kugelfisch: Aufblasen + Tod
- [ ] Qualle (2. Gegnertyp, Stromschlag, Tod per Blase) – Klasse + Patrouille im Level vorhanden, Stromschlag/Tod offen
- [x] Endboss platziert + Bossbar
- [ ] Endboss: Intro bei Annäherung
- [ ] Endboss: Angriff / Bewegung
- [ ] Endboss: Hurt + Tod (nur per Gift-Blase)
- [x] Hitbox-Offsets definiert
- [ ] Level-Design & Balancing (Anzahl/Stärke, kein Überrennen am Start)

## E – Spielablauf
- [ ] Zentrale Interval-Verwaltung (Voraussetzung für Restart)
- [ ] Startscreen mit Start-Button
- [ ] Endscreen bei Sieg / Niederlage
- [ ] Restart ohne Reload + Zurück zum Home

## F – Sound
- [ ] Hintergrundmusik
- [ ] Soundeffekte Charakter (inkl. Schnarchen)
- [ ] Soundeffekte Gegner / Endboss
- [ ] Mute-Button stoppt alles, Status im localStorage

## G – Landingpage
- [ ] Hintergrundbild passend zum Thema
- [ ] Anleitung als Dialog (schließt per X / Klick daneben)
- [ ] Tastenbelegung einsehbar
- [ ] Impressum (keine echten Daten)
- [ ] (optional) Story
- [ ] (optional) Fullscreen

## H – Responsive / Mobile
- [ ] Canvas skaliert, keine Scrollbalken
- [ ] Touch-Buttons nur in Mobilansicht
- [ ] Kontextmenü auf Touch-Buttons deaktiviert
- [ ] Hochformat-Hinweis "Turn your device"

## I – Clean Code
- [x] Funktionen max. 14 Zeilen
- [x] camelCase, erster Buchstabe klein (z. B. imagesIdle)
- [x] JSDoc für alle Funktionen
- [x] Max. 400 Zeilen pro Datei

## J – Abnahme
- [ ] Komplette Checkliste getestet (Konsole, Tablet, Sounds, Restart)

## Änderungsprotokoll
- 12.10.2026: Übersicht angelegt (27 %).
- 12.10.2026: models in Unterordner gegliedert; JellyFish, Barrier, Coin angelegt und ins Level eingebaut (Coins einsammeln, Barrier blockiert) (31 %).
- 12.10.2026: JSDoc (Beschreibung, @param, @returns) für alle Klassen, Methoden und Funktionen in allen .js ergänzt (33 %).
- 12.10.2026: Alle Funktionen auf max. 14 Zeilen gekürzt (9 aufgeteilt), Bezeichner auf camelCase umbenannt (36 %).
- 12.10.2026: Alle deutschen Kommentare aus den .js-Dateien entfernt (Prozentwert unverändert).
- 12.10.2026: SPACE = Fin Slap, A = Blase (Projektil, Schaden je Angriffsart pro Gegner, besiegte Gegner verschwinden) (40 %).
- 12.10.2026: Abgleich mit Code: console.log ist entfernt → abgehakt (42 %).
- 12.10.2026: Character.attack in currentAttack umbenannt (Prozentwert unverändert).
- 12.10.2026: Barrier-Kollision pro Achse, Sharkie kann an Barrieren entlang schwimmen (Prozentwert unverändert).
- 12.10.2026: Barrier-Hitbox als Polygon (Geometry-Klasse, Punkte pro Variante anpassbar) (Prozentwert unverändert).
- 12.10.2026: Polygon-Hitboxen auch für Barrier 1 (zwei Teile) und Barrier 3 (Prozentwert unverändert).
- 12.10.2026: Barrier(x, y, variante, scale) – Position, Variante und Größenfaktor einstellbar (Prozentwert unverändert).
- 12.10.2026: Debug-Log der Charakter-Position alle 10 s (World.logPositionEvery, vor Abgabe entfernen; Prozentwert unverändert).
