// Importerer React og useState-hooket, som bruges til at gemme appens køb i state.
import React, { useState } from 'react';

// Importerer NavigationContainer, som omslutter hele React Navigation-strukturen.
import { NavigationContainer } from '@react-navigation/native';

// Importerer funktionen til at oprette en Stack Navigator.
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importerer appens startside.
import HomeScreen from './screens/HomeScreen';

// Importerer siden med oversigten over brugerens køb.
import PurchasesScreen from './screens/PurchasesScreen';

// Importerer siden med detaljer om et bestemt køb.
import PurchaseDetailsScreen from './screens/PurchaseDetailsScreen';

// Importerer siden, hvor brugeren kan oprette et nyt køb.
import AddPurchaseScreen from './screens/AddPurchaseScreen';

// Opretter vores Stack Navigator.
const Stack = createNativeStackNavigator();

// App er hovedkomponenten og startpunktet for applikationen.
export default function App() {

  // purchases indeholder alle køb i appen.
  // setPurchases bruges, når listen skal ændres.
  const [purchases, setPurchases] = useState([

    // Første eksempelprodukt i MVP'en.
    {
      id: '1',
      product: 'Nike Air Max',
      store: 'Zalando',
      price: '899',
      purchaseDate: '05/09/2026',
      returnDeadline: '25/09/2026',
      daysLeft: 4,
    },

    // Andet eksempelprodukt i MVP'en.
    {
      id: '2',
      product: 'Overshirt',
      store: 'Zara',
      price: '499',
      purchaseDate: '10/09/2026',
      returnDeadline: '30/09/2026',
      daysLeft: 9,
    },

    // Tredje eksempelprodukt i MVP'en.
    {
      id: '3',
      product: 'Jeans',
      store: 'H&M',
      price: '349',
      purchaseDate: '12/09/2026',
      returnDeadline: '12/10/2026',
      daysLeft: 21,
    },
  ]);

  // Funktionen modtager et nyt køb fra AddPurchaseScreen.
  const addPurchase = (newPurchase) => {

    // Opdaterer state og placerer det nye køb øverst på listen.
    setPurchases((currentPurchases) => [
      newPurchase,
      ...currentPurchases,
    ]);
  };

  // Returnerer appens navigation.
  return (
    <NavigationContainer>

      {/* Stack Navigator styrer navigationen mellem appens screens. */}
      <Stack.Navigator initialRouteName="Home">

        {/* Startskærmen. */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Returnly' }}
        />

        {/* Oversigten over køb. */}
        <Stack.Screen
          name="Purchases"
          options={{ title: 'Mine køb' }}
        >
          {(props) => (

            // purchases sendes videre som prop til PurchasesScreen.
            <PurchasesScreen
              {...props}
              purchases={purchases}
            />
          )}
        </Stack.Screen>

        {/* Detaljesiden for det valgte køb. */}
        <Stack.Screen
          name="PurchaseDetails"
          component={PurchaseDetailsScreen}
          options={{ title: 'Købsdetaljer' }}
        />

        {/* Skærmen til oprettelse af nye køb. */}
        <Stack.Screen
          name="AddPurchase"
          options={{ title: 'Tilføj køb' }}
        >
          {(props) => (

            // addPurchase-funktionen sendes til AddPurchaseScreen.
            <AddPurchaseScreen
              {...props}
              onAddPurchase={addPurchase}
            />
          )}
        </Stack.Screen>

      </Stack.Navigator>

    </NavigationContainer>
  );
}