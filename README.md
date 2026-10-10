# Salve! – Lateintrainer

Mobiler Latein-Deutsch-Trainer mit 37 Wörtern aus Wortschatz 1 „Sieg im Circus Maximus“, Abschnitte 1–3.

## Lernen

Antwort eingeben oder Karteikarten verwenden. Eine passende Bedeutung genügt. Artikel, Großschreibung und Satzzeichen werden normalisiert; Tippfehler werden nicht automatisch als richtig gewertet. Die Auswahl bevorzugt Wörter mit wenigen aufeinanderfolgenden richtigen Antworten. Nach drei richtigen Antworten gilt ein Wort als sicher gelernt. Falsch beantwortete Wörter sind zusätzlich über „Schwierige Wörter“ auswählbar. Jede Runde enthält maximal zehn unterschiedliche Wörter.

Der Lernstand liegt nur im Browser (`localStorage`), nicht in GitHub. Mit „Lernstand sichern/laden“ lässt er sich übertragen. Kein Login, Tracking oder Backend.

## Dauerhaft Wörter ergänzen

`data/vocabulary.json` ist die zentrale, versionierte Vokabeldatenbank. Neue Einträge im Array `words` hinzufügen, mit eindeutiger dauerhafter ID, `latin`, einer Liste `german`, optionaler Verbform `form`, `kind`, `lesson` und `section`. Zwischen Einträgen Kommas setzen; nach dem letzten Eintrag kein Komma. Im Trainer erzeugt „Wörter ergänzen“ einen fertigen JSON-Eintrag. Dieser wird erst nach einem Commit in der gemeinsamen Datei veröffentlicht. Neue Lektionen zusätzlich im Array `lessons` anlegen. Bestehende IDs nicht ändern, damit Lernstände gültig bleiben.

## GitHub Pages aktivieren

In Settings → Pages unter Source „GitHub Actions“ wählen. Falls Pages für das private Repository im aktuellen Tarif nicht verfügbar ist: passender GitHub-Tarif oder Repository unter Settings → General → Danger Zone öffentlich machen. Anschließend in Actions den Workflow „Publish Latin trainer“ manuell starten. Künftige Änderungen auf `main` veröffentlichen automatisch.

Vorgesehene URL: https://mroffline2k.github.io/latein-trainer/ (erst nach erfolgreichem Deployment aktiv).

## Lokal testen

`node tests/core.test.mjs`

`python -m http.server 8000`

Dann http://localhost:8000 öffnen. Keine Installation von Paketen nötig.
