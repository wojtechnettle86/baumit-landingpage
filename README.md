# Baumit – Wau fasáda

Responzivní statická landing page podle dodané textace a banneru. HTML, CSS a JavaScript bez instalace závislostí nebo sestavování. Fonty, logo a fotografie jsou uloženy lokálně. Veškeré cesty k souborům jsou relativní, takže funguje i projektová adresa `uzivatel.github.io/repozitar/`.

## Spuštění

Otevřete `index.html` v prohlížeči nebo spusťte lokální statický server v této složce, například `python -m http.server 4173` a otevřete `http://localhost:4173`.

## GitHub Pages

1. Nahrajte projekt do GitHub repozitáře na větev `main`.
2. V repozitáři otevřete **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Push na `main` spustí připravený workflow `.github/workflows/pages.yml`. Případně ho spusťte ručně v **Actions → Deploy GitHub Pages → Run workflow**.
4. Adresa publikované stránky se zobrazí v **Settings → Pages** a ve výsledku workflow.

Workflow zveřejní pouze `index.html`, styly, skripty a adresář `assets`. Zdrojové zadání a pracovní soubory se do webového artefaktu nekopírují. Pro jinou hlavní větev upravte `branches` ve workflow. Alternativně lze nasadit z kořene větve přes „Deploy from a branch“, tento způsob ale vystaví i ostatní soubory v kořeni.

## Kontaktní formulář

GitHub Pages neposkytují server pro odesílání e-mailů. Formulář obsahuje validaci, povinný souhlas, výběr typu stavby, více oblastí poradenství, chybový stav a ochranu před opakovaným odesláním. Tlačítka u jednotlivých typů staveb předvyplní odpovídající volbu.

Pro skutečné odesílání nastavte v `config.js` hodnotu `formEndpoint` na HTTPS adresu schváleného formulářového backendu. Endpoint musí přijímat `POST` s `multipart/form-data`, povolit CORS pro doménu stránky a vracet úspěšný HTTP stav až po přijetí zprávy. Pole: `name`, `email`, `phone`, `postcode`, `project`, opakované `advice`, `message`, `consent`. Případné směrování na odborníka podle PSČ musí zajistit backend. Do veřejného JavaScriptu nevkládejte tajné API klíče.

Dokud není endpoint vyplněný, žádné údaje se neodesílají ani neukládají a formulář nabídne skutečný kontakt na Baumit.cz. Zobrazení úspěchu nastává až po úspěšné odpovědi backendu. Napojení nebylo otestováno se skutečným příjemcem.

## Podklady a úpravy

Texty jsou vložené přímo v `index.html`. Vzhled je v `styles.css` a `header.css`, `footer.css`, chování v `script.js`. Podklady: `BAUMIT_LANDING_PAGE_WAU_02.docx`, `00922_Baumit_tendr_WAU-banner_web.jpg`. Logo, Avenir Next World a doplňkové fotografie pocházejí z Baumit.cz; jejich použití je určeno pro tento projekt Baumit.

Hlavička a patička jsou lokální implementace vzhledu a navigace Baumit.cz. Externí odkazy vedou na původní web; přihlášení, vyhledávání a výběr země využívají jeho stránky. Stránka nepřidává analytiku ani volitelné cookies.

Další použité fotografie hotových fasád: řešení „Prémiová silikonová fasádní omítka a barva“, „Elegantní tmavé fasádní omítky a barvy“ na Baumit.cz; venkovská rekonstrukce z oficiální galerie https://mailing.baumit.cz/cz/historicka-budova-rekonstrukce-sanace-fotogalerie. Produktová sestava Baumit open z jeho stránky řešení.

Ilustrační fotografie chalupy: JiriMatejicek, Zalesni Lhota 48.jpg, https://commons.wikimedia.org/wiki/File:Zalesni_Lhota_48.jpg, CC BY-SA 3.0 https://creativecommons.org/licenses/by-sa/3.0/. Lokální WebP a ořez jsou pod stejnou licencí. Nejde o referenci systému Baumit.
