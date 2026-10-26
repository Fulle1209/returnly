// Importerer React samt hooks til state og side effects.
import React, { useEffect, useState } from 'react';

// Importerer AsyncStorage til lokal permanent lagring.
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importerer Expo Notifications.
import * as Notifications from 'expo-notifications';

// Importerer React Navigation.
// createNavigationContainerRef gør det muligt at navigere
// fra fx en notifikation uden at være inde i en screen.
import {
  NavigationContainer,
  createNavigationContainerRef
} from '@react-navigation/native';

// Importerer Stack Navigation.
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importerer appens screens.
import HomeScreen from './screens/HomeScreen';
import PurchasesScreen from './screens/PurchasesScreen';
import PurchaseDetailsScreen from './screens/PurchaseDetailsScreen';
import AddPurchaseScreen from './screens/AddPurchaseScreen';
import ReminderSettingsScreen from './screens/ReminderSettingsScreen';


// Opretter Stack Navigator.
const Stack = createNativeStackNavigator();

// Opretter en navigation reference.
// Den bruges når brugeren trykker på en notifikation.
const navigationRef = createNavigationContainerRef();

// Nøglen der bruges til at gemme køb i AsyncStorage.
const STORAGE_KEY = '@returnly_purchases';


// Eksempeldata bruges første gang appen åbnes.
const defaultPurchases = [
  {
    id: '1',
    product: 'Nike Air Max',
    store: 'Zalando',
    price: '899',
    purchaseDate: '05/10/2026',
    returnDeadline: '04/11/2026',
    daysLeft: 9,
    returned: false,
  },
  {
    id: '2',
    product: 'Overshirt',
    store: 'Zara',
    price: '499',
    purchaseDate: '10/10/2026',
    returnDeadline: '09/11/2026',
    daysLeft: 14,
    returned: false,
  },
];


// App er hovedkomponenten.
export default function App() {

  // Indeholder alle brugerens køb.
  const [purchases, setPurchases] = useState([]);

  // Holder styr på om eksisterende data er hentet.
  const [isLoaded, setIsLoaded] = useState(false);


  // Henter gemte køb når appen starter.
  useEffect(() => {

    // Funktion til at hente data fra AsyncStorage.
    const loadPurchases = async () => {

      try {

        // Forsøger at hente tidligere gemte køb.
        const storedPurchases =
          await AsyncStorage.getItem(STORAGE_KEY);

        // Hvis der findes gemte data.
        if (storedPurchases !== null) {

          // Konverterer data tilbage til et JavaScript-array.
          setPurchases(JSON.parse(storedPurchases));

        } else {

          // Ellers bruges eksempeldata.
          setPurchases(defaultPurchases);
        }

      } catch (error) {

        // Viser eventuel fejl i konsollen.
        console.log(
          'Fejl ved indlæsning af køb:',
          error
        );

        // Bruger eksempeldata som fallback.
        setPurchases(defaultPurchases);

      } finally {

        // Markerer at indlæsningen er færdig.
        setIsLoaded(true);
      }
    };

    // Kører funktionen.
    loadPurchases();

  }, []);


  // Gemmer automatisk køb hver gang purchases ændres.
  useEffect(() => {

    // Undgår at overskrive data før de er hentet.
    if (!isLoaded) {
      return;
    }

    // Funktion til at gemme data.
    const savePurchases = async () => {

      try {

        // Gemmer køb som tekst i AsyncStorage.
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(purchases)
        );

      } catch (error) {

        // Viser eventuel fejl.
        console.log(
          'Fejl ved lagring af køb:',
          error
        );
      }
    };

    // Kører gemmefunktionen.
    savePurchases();

  }, [purchases, isLoaded]);


  // Håndterer hvad der skal ske,
  // når brugeren trykker på en Returnly-notifikation.
  const handleNotificationResponse = async (response) => {

    // Henter data fra notifikationen.
    const notificationData =
      response.notification.request.content.data;

    // Henter id'et på købet.
    const purchaseId =
      notificationData?.purchaseId;

    // Hvis notifikationen ikke indeholder et purchaseId,
    // kan vi ikke finde et bestemt køb.
    if (!purchaseId) {
      return;
    }

    // Finder købet med det samme id.
    const selectedPurchase =
      purchases.find(
        (purchase) =>
          purchase.id === purchaseId
      );

    // Hvis købet ikke længere findes,
    // stopper funktionen.
    if (!selectedPurchase) {

      console.log(
        'Kunne ikke finde købet fra notifikationen.'
      );

      return;
    }

    // Kontrollerer at navigationen er klar.
    if (navigationRef.isReady()) {

      // Navigerer direkte til det konkrete køb.
      navigationRef.navigate(
        'PurchaseDetails',
        {
          purchase: selectedPurchase,
        }
      );
    }

    // Fjerner den seneste notification response,
    // så samme notifikation ikke åbner købet igen
    // næste gang appen starter.
    await Notifications.clearLastNotificationResponseAsync();
  };


  // Lytter efter at brugeren trykker på en notifikation.
  useEffect(() => {

    // Vi venter til brugerens køb er hentet.
    if (!isLoaded) {
      return;
    }


    // Listener der kører mens appen allerede eksisterer
    // i forgrunden eller baggrunden.
    const subscription =
      Notifications.addNotificationResponseReceivedListener(
        (response) => {

          // Sender notifikationen videre til vores funktion.
          handleNotificationResponse(response);
        }
      );


    // Kontrollerer om appen netop blev åbnet
    // ved at brugeren trykkede på en notifikation.
    const checkLastNotification = async () => {

      // Henter den seneste notification response.
      const lastResponse =
        await Notifications.getLastNotificationResponseAsync();

      // Hvis der findes en response,
      // håndteres den.
      if (lastResponse) {

        await handleNotificationResponse(
          lastResponse
        );
      }
    };

    // Kører kontrollen.
    checkLastNotification();


    // Fjerner listeneren hvis komponenten genindlæses.
    return () => {

      subscription.remove();
    };

  }, [isLoaded, purchases]);


  // Tilføjer et nyt køb.
  const addPurchase = (newPurchase) => {

    // Lægger det nye køb øverst på listen.
    setPurchases((currentPurchases) => [
      newPurchase,
      ...currentPurchases,
    ]);
  };


  // Markerer et bestemt køb som returneret.
  const markPurchaseAsReturned = (purchaseId) => {

    // Gennemgår alle køb.
    setPurchases((currentPurchases) =>
      currentPurchases.map((purchase) => {

        // Finder købet med det rigtige id.
        if (purchase.id === purchaseId) {

          // Returnerer en ny version
          // med returned sat til true.
          return {
            ...purchase,
            returned: true,
          };
        }

        // Andre køb ændres ikke.
        return purchase;
      })
    );
  };


  // Returnerer appens navigation.
  return (

    // navigationRef kobles på NavigationContainer,
    // så vi kan navigere fra en notifikation.
    <NavigationContainer ref={navigationRef}>

      <Stack.Navigator initialRouteName="Home">


        {/* Startskærmen. */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Returnly'
          }}
        />


        {/* Oversigt over brugerens køb. */}
        <Stack.Screen
          name="Purchases"
          options={{
            title: 'Mine køb'
          }}
        >
          {(props) => (

            <PurchasesScreen
              {...props}
              purchases={purchases}
            />

          )}
        </Stack.Screen>


        {/* Detaljeside for et bestemt køb. */}
        <Stack.Screen
          name="PurchaseDetails"
          options={{
            title: 'Købsdetaljer'
          }}
        >
          {(props) => (

            <PurchaseDetailsScreen
              {...props}
              onMarkReturned={
                markPurchaseAsReturned
              }
            />

          )}
        </Stack.Screen>


        {/* Skærm til oprettelse af nye køb. */}
        <Stack.Screen
          name="AddPurchase"
          options={{
            title: 'Tilføj køb'
          }}
        >
          {(props) => (

            <AddPurchaseScreen
              {...props}
              onAddPurchase={addPurchase}
            />

          )}
        </Stack.Screen>


        {/* Skærm til indstilling af påmindelser. */}
        <Stack.Screen
          name="ReminderSettings"
          component={ReminderSettingsScreen}
          options={{
            title: 'Påmindelse'
          }}
        />


      </Stack.Navigator>

    </NavigationContainer>
  );
}