# Teknologian valintatyökalu

### 📝 Yleiskuvaus


Tämä projekti on teknologian valintatyökalu, joka on kehitetty tukemaan käyttäjiä valitsemaan oikeat teknologiat suunnittelemaansa projektiin. Työkalu analysoi käyttötarkoituksen, osaamistason ja vaikeustason perusteella suosituksia backend-, frontend- ja tietokantateknologioista.

### 🚀 Ominaisuudet

* Suosituksia käyttäjän projektin tarpeiden mukaan.
*	Vaihtoehtoinen ehdotus, jos käyttäjän osaamistaso ei vastaa ensisijaista suositusta.
*	Käyttäjäystävällinen käyttöliittymä ja dynaaminen päivitys suosituksille.
*	Varoitukset teknologioista, jotka eivät sovi valittuun käyttötarkoitukseen.

### 🛠️ Käytetyt teknologiat

Tässä projektissa käytetyt teknologiat ja niiden dokumentaatio:
*	Next.js / React: Käyttöliittymän rakentamiseen. [React-opas](https://react.dev/) / [Next.js opas](https://nextjs.org/docs)
*	TypeScript: Tyypitetty JavaScript-kieli. [TypeScript-opas](https://www.typescriptlang.org/docs/)
*	CSS: Tyylitiedostot visuaaliseen ilmeeseen.
*	Node.js: Palvelinpuolen logiikka ja riippuvuuksien hallinta. [Node.js-opas](https://nodejs.org/docs/latest/api/)

### 📂 Projektin rakenne 

```
  src/
    ├── components/
    │   ├── Suggestions.tsx       # Suositusten näyttäminen
    │   ├── Warnings.tsx          # Varoitusten näyttäminen
    │   ├── TechnologySelector.tsx # Teknologian valintatyökalu
    ├── styles/
    │   ├── Global.css            # Tyylitiedosto
    ├── technologies.ts           # Teknologioiden määrittely ja yhteensopivuudet
```

### 🔧 Asennusohjeet

1.	Kloonaa repository ja siirry kansioon
```
  git clone <repository-url>
  cd <repository-name>
```
2.	Asenna riippuvuudet
```
  npm install
```
3.	Käynnistä sovellus
``` 
  npm start
```
4.	Avaa selain ja navigoi osoitteeseen
```
  http://localhost:3000
```

### 📘 Käyttöohjeet

1.	Valitse projektin käyttötarkoitus pudotusvalikosta (esim. Verkkosovellus).
2.	Aseta osaamistasosi ja suunnitellun projektin haluttu vaikeustaso.
3.	Valitse mahdollisesti jo etukäteen osaamasi teknologiat valintalaatikoista.
4.	Tarkastele ehdotuksia ja varoituksia.

### 📄 Dokumentaatio

Kaikki komponentit on kattavasti kommentoitu koodissa. Jokainen tiedosto sisältää selityksiä siitä, mitä funktiot ja muuttujat tekevät, sekä miten komponentit toimivat keskenään.

### 📧 Tuki

Jos kohtaat ongelmia, voit ottaa yhteyttä projektin omistajaan.

