// Importerer React.
import React from 'react';

// Importerer nødvendige React Native-komponenter.
import {
  View,
  Text,
  Button,
  Alert
} from 'react-native';

// Importerer fælles styling.
import GlobalStyles from '../styles/GlobalStyles';

// Komponenten modtager købet via route
// samt funktionen til at markere det som returneret.
export default function PurchaseDetailsScreen({
  route,
  navigation,
  onMarkReturned
}) {

  // Henter det valgte køb fra navigationen.
  const { purchase } = route.params;


  // Funktionen kaldes når brugeren markerer varen som returneret.
  const handleMarkReturned = () => {

    // Opdaterer købet i App.js.
    onMarkReturned(purchase.id);

    // Viser en bekræftelse.
    Alert.alert(
      'Vare returneret',
      `${purchase.product} er markeret som returneret.`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };


  // Returnerer sidens indhold.
  return (
    <View style={GlobalStyles.container}>

      {/* Viser produktnavnet. */}
      <Text style={GlobalStyles.sectionTitle}>
        {purchase.product}
      </Text>

      {/* Viser butikken. */}
      <Text style={GlobalStyles.text}>
        Butik: {purchase.store}
      </Text>

      {/* Viser prisen hvis den er angivet. */}
      {purchase.price ? (
        <Text style={GlobalStyles.text}>
          Pris: {purchase.price} kr.
        </Text>
      ) : null}

      {/* Viser købsdato hvis den er angivet. */}
      {purchase.purchaseDate ? (
        <Text style={GlobalStyles.text}>
          Købsdato: {purchase.purchaseDate}
        </Text>
      ) : null}

      {/* Viser returfristen. */}
      <Text style={GlobalStyles.text}>
        Returfrist: {purchase.returnDeadline}
      </Text>


      {/* Hvis købet allerede er returneret vises status. */}
      {purchase.returned ? (

        <Text style={GlobalStyles.returnedText}>
          Returneret ✓
        </Text>

      ) : (

        <>
          {/* Viser antal dage tilbage. */}
          <Text style={GlobalStyles.sectionTitle}>
            {purchase.daysLeft} dage tilbage
          </Text>


          {/* Åbner den nye reminder-screen. */}
          <View style={GlobalStyles.buttonContainer}>
            <Button
              title="Indstil påmindelse"
              onPress={() =>
                navigation.navigate(
                  'ReminderSettings',
                  { purchase }
                )
              }
            />
          </View>


          {/* Markerer købet som returneret. */}
          <View style={GlobalStyles.buttonContainer}>
            <Button
              title="Markér som returneret"
              onPress={handleMarkReturned}
            />
          </View>

        </>
      )}

    </View>
  );
}