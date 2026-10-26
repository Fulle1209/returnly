# Returnly

Returnly er en React Native-mobilapplikation udviklet som en del af
Innovation og Ny Teknologi på Copenhagen Business School.

## Problem

Personer, der handler online, kan miste overblikket over deres køb og
returfrister. Returnly har derfor følgende value proposition:

**"Glem aldrig en returfrist igen."**

## Funktioner

- Den nuværende version af Returnly indeholder blandt andet:
- Oversigt over brugerens køb
- Registrering af nye køb
- Automatisk beregning af antal dage til returfristen
- Mulighed for at vælge et screenshot af en ordrebekræftelse
- Permanent lagring af køb med AsyncStorage
- Mulighed for at markere et køb som returneret
- Lokal påmindelse før en returfrist
- Valg mellem påmindelse 1, 3 eller 7 dage før returfristen
- Testnotifikation
- Navigation direkte til det relevante køb, når brugeren trykker på en notifikation
- Genbrugelig FormInput-komponent

Screenshot-funktionen kan på nuværende tidspunkt vælge og vise en ordrebekræftelse, men automatisk aflæsning af oplysninger fra billedet er endnu ikke implementeret.

## Teknologier
- React Native
- Expo
- React Navigation
- AsyncStorage
- Expo Notifications
- Expo ImagePicker

## Sådan køres projektet

1. Clone repository:

git clone [INDSÆT GITHUB-LINK]

2. Gå ind i projektmappen:

cd returnly

3. Installer dependencies:

npm install

4. Start Expo:

npx expo start

5. Scan QR-koden med Expo Go.

## Demovideo
Demovideo af Returnly:
https://www.youtube.com/watch?v=WG_-jID0UTc