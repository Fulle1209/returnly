// Importerer React.
import React from 'react';

// Importerer nødvendige React Native-komponenter.
import {
  View,
  Text,
  Button
} from 'react-native';

// Importerer appens fælles styling.
import GlobalStyles from '../styles/GlobalStyles';

// Komponenten modtager route fra React Navigation.
export default function PurchaseDetailsScreen({
  route
}) {

  // Henter det valgte køb, som blev sendt fra PurchasesScreen.
  const { purchase } = route.params;

  // Returnerer detaljesiden.
  return (
    <View style={GlobalStyles.container}>

      {/* Viser produktets navn. */}
      <Text style={GlobalStyles.sectionTitle}>
        {purchase.product}
      </Text>

      {/* Viser hvilken butik varen kommer fra. */}
      <Text style={GlobalStyles.text}>
        Butik: {purchase.store}
      </Text>

      {/* Viser produktets pris. */}
      <Text style={GlobalStyles.text}>
        Pris: {purchase.price} kr.
      </Text>

      {/* Viser købsdatoen. */}
      <Text style={GlobalStyles.text}>
        Købsdato: {purchase.purchaseDate}
      </Text>

      {/* Viser returfristen. */}
      <Text style={GlobalStyles.text}>
        Returfrist: {purchase.returnDeadline}
      </Text>

      {/* Viser enten antal dage tilbage eller at fristen er udløbet. */}
      <Text style={GlobalStyles.sectionTitle}>
        {purchase.daysLeft < 0
          ? 'Returfristen er udløbet'
          : `${purchase.daysLeft} dage tilbage`}
      </Text>

      {/* Container omkring returknappen. */}
      <View style={GlobalStyles.buttonContainer}>

        {/* MVP-knap der demonstrerer fremtidig retur-status. */}
        <Button
          title="Markér som returneret"
          onPress={() =>
            alert('Varen er markeret som returneret')
          }
        />

      </View>

    </View>
  );
}