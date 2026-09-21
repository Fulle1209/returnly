// Importerer React.
import React from 'react';

// Importerer React Native-komponenterne til siden.
import {
  View,
  Text,
  FlatList,
  Pressable
} from 'react-native';

// Importerer den fælles styling.
import GlobalStyles from '../styles/GlobalStyles';

// Komponenten modtager navigation samt listen med purchases fra App.js.
export default function PurchasesScreen({
  navigation,
  purchases
}) {

  // Funktionen bestemmer hvilken status en returfrist skal have.
  const getReturnStatus = (daysLeft) => {

    // Hvis tallet er negativt, er returfristen allerede overskredet.
    if (daysLeft < 0) {
      return {
        text: 'Returfrist udløbet',
        style: GlobalStyles.statusExpired
      };
    }

    // 0-3 dage betragtes som akut.
    if (daysLeft <= 3) {
      return {
        text: `${daysLeft} dage tilbage`,
        style: GlobalStyles.statusUrgent
      };
    }

    // 4-7 dage vises som en kommende deadline.
    if (daysLeft <= 7) {
      return {
        text: `${daysLeft} dage tilbage`,
        style: GlobalStyles.statusSoon
      };
    }

    // Mere end syv dage betragtes som god tid.
    return {
      text: `${daysLeft} dage tilbage`,
      style: GlobalStyles.statusSafe
    };
  };

  // Returnerer købsoverblikket.
  return (
    <View style={GlobalStyles.container}>

      {/* Sidens overskrift. */}
      <Text style={GlobalStyles.sectionTitle}>
        Mine køb
      </Text>

      {/* Kort beskrivelse af sidens funktion. */}
      <Text style={GlobalStyles.description}>
        Hold styr på dine returfrister og se,
        hvilke køb du skal reagere på først.
      </Text>

      {/* FlatList bruges til effektivt at vise listen med køb. */}
      <FlatList

        // Data kommer fra purchases-arrayet.
        data={purchases}

        // Hvert element får sin unikke id som key.
        keyExtractor={(item) => item.id}

        // Fjerner den visuelle scrollbar.
        showsVerticalScrollIndicator={false}

        // Bestemmer hvordan hvert køb skal vises.
        renderItem={({ item }) => {

          // Finder den relevante status for det aktuelle køb.
          const status = getReturnStatus(item.daysLeft);

          // Returnerer et klikbart købskort.
          return (
            <Pressable

              // Bruger styling for kortet.
              style={GlobalStyles.purchaseCard}

              // Åbner detaljesiden og sender købet videre.
              onPress={() =>
                navigation.navigate(
                  'PurchaseDetails',
                  { purchase: item }
                )
              }
            >

              {/* Øverste række indeholder produkt og status. */}
              <View style={GlobalStyles.cardTopRow}>

                {/* Venstre side viser produktinformation. */}
                <View>

                  {/* Produktets navn. */}
                  <Text style={GlobalStyles.purchaseTitle}>
                    {item.product}
                  </Text>

                  {/* Butikkens navn. */}
                  <Text style={GlobalStyles.storeText}>
                    {item.store}
                  </Text>

                </View>

                {/* Højre side viser status for returfristen. */}
                <View style={status.style}>

                  {/* Teksten fx "3 dage tilbage". */}
                  <Text style={GlobalStyles.statusText}>
                    {status.text}
                  </Text>

                </View>

              </View>

              {/* Den konkrete returdato. */}
              <Text style={GlobalStyles.deadlineText}>
                Returfrist: {item.returnDeadline}
              </Text>

            </Pressable>
          );
        }}
      />

    </View>
  );
}