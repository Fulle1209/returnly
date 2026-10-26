// Importerer React.
import React from 'react';

// Importerer komponenterne til listen.
import {
  View,
  Text,
  FlatList,
  Pressable
} from 'react-native';

// Importerer fælles styling.
import GlobalStyles from '../styles/GlobalStyles';

// Komponenten modtager navigation og køb fra App.js.
export default function PurchasesScreen({
  navigation,
  purchases
}) {

  // Returnerer købsoverblikket.
  return (
    <View style={GlobalStyles.container}>

      {/* Sidens overskrift. */}
      <Text style={GlobalStyles.sectionTitle}>
        Mine køb
      </Text>

      {/* Viser alle køb i en FlatList. */}
      <FlatList
        data={purchases}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          // Hele kortet kan trykkes på.
          <Pressable
            style={GlobalStyles.purchaseCard}
            onPress={() =>
              navigation.navigate(
                'PurchaseDetails',
                { purchase: item }
              )
            }
          >

            {/* Produktets navn. */}
            <Text style={GlobalStyles.purchaseTitle}>
              {item.product}
            </Text>

            {/* Butikkens navn. */}
            <Text style={GlobalStyles.text}>
              {item.store}
            </Text>


            {/* Viser forskellig information afhængigt af status. */}
            {item.returned ? (

              // Købet er allerede returneret.
              <Text style={GlobalStyles.returnedText}>
                Returneret ✓
              </Text>

            ) : (

              // Købet er stadig aktivt.
              <Text style={GlobalStyles.text}>
                {item.daysLeft} dage tilbage
              </Text>

            )}

          </Pressable>
        )}
      />

    </View>
  );
}