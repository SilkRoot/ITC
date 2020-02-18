Anforderungen:
- verschiedene Turnierformate -> verfügbare Algorithmen?
- Statistiken -> DC.js/d3.js (schöne Statistiken)
- ggf. Export der Ergebnisse / Teilen der Ergebnisse per Whatsapp -> DIV als JPG?
- User-Verwaltung der Spieler inkl. Profile (Name, Profilbild / ICON, ...)
- "intelligente" Turnierauswertungen (bestimmte Regeln) / Automatische Tabellenbildung
- Turnier fortsetzen -> d.h. wenn z.B. Hinrunde vorbei, Rückspiel anbieten, sonst "abschließen"
- Bild aufnehmen zum Abschluss des Turniers?
- Push-Notification für Ligen -> neues Turnier führt zu Push-Notification, Abschluss eines Turnier -> Push des Siegers

nicht funktional:
- responsive -> PWA
- als native Android-App veröffentlichen (als APK speichern)
- ...

Startmenü
	- Login (Player-Name auswählen)
	- Settings
		- Mode
		- 
	- Manage Players
		- create new Player (write/insert)
			Name, Icon, Bild?, Subscribe to League
		- Player-Profil
			Name, Icon, Bild, persönliche Statistik (Anzahl Titel, Nemesis, höchster Sieg, höchste Niederlage, längste Niederlagenserie, ...)
		- update
		- delete
	- Manage Leagues
		- create League
		- update League settings (name)
		- drop League
	- Manage Tournaments
		- Display last Tournaments (Name, Liga, Status)(nur Turniere mit eigener Beteiligung) -> Detailseite (Display Tournament)
		- Create Tournaments
			- Tournament-Type (Liga (Hinspiel), Liga (Hin- und Rückspiel), Liga+Playoffs, Playoffs // Tiebreaker-Regeln)
			- Anzahl Spieler & Spielername(n) (mindestens 2 Spieler)
				- Spielername aus Players wählen (ggf. hinzufügen)
			- Name
			- League wählen
			- Tiebreaker-Regeln (Tabelle-> Tordifferenz, Anzahl geschossener Tore, direkter Vergleich, ...)
			- erstellen
		- Tournament-Views (Detailseite - aktiv):
			- Spieltag(e) & Partien
			- Ergebnis eintragen
			- Tabelle (aktueller Stand, sortiert nach Regeln (Punkte, Tordifferenz, geschossene Tore)
			- nach Abschluss des letzten Spiels -> Fortsetzung anbieten und generieren
			- Abschließen (ohne Fortsetzung) (ggf. später mit Abschlussbild)	
		- Tournament-Views (Detailseite - beendet):	
			- Spieltag(e) & Partien
			- Abschlusstabelle
			- Auswertungen
				- Übersicht mit bestimmten Statistiken
					- meiste Turniersiege, Punkte / Spiel, meisten Tore, meisten Gegentore, wenigsten Turniersiege, ...
					- Auswertungen für Spieler
	
Tables / Objekte / Entitäten:
- Players
- Leagues
- Tournaments (FK Leagues)
- Matches (FK Tournaments)

Vorgehen:
- ToDo-App mit React fertig (Sebastian)
- React, Angular anschauen (Georg)

Ziel:
- PWA
- in Docker-Container auf NAS
