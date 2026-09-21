// Importerer React.
import React from 'react';

// Importerer de React Native-komponenter, der bruges på siden.
import {
  View,
  Text,
  Button
} from 'react-native';

// Importerer den fælles stylingfil.
import GlobalStyles from '../styles/GlobalStyles';

// HomeScreen er appens startside.
export default function HomeScreen({ navigation }) {

  // Returnerer det interface brugeren ser på startsiden.
  return (
    <View style={GlobalStyles.centeredContainer}>

      {/* Appens navn. */}
      <Text style={GlobalStyles.title}>
        Returnly
      </Text>

      {/* Returnlys value proposition. */}
      <Text style={GlobalStyles.subtitle}>
        Glem aldrig en returfrist igen.
        Hold styr på dine onlinekøb ét sted.
      </Text>

      {/* Container omkring første knap. */}
      <View style={GlobalStyles.buttonContainer}>

        {/* Navigerer brugeren til købsoverblikket. */}
        <Button
          title="Se mine køb"
          onPress={() =>
            navigation.navigate('Purchases')
          }
        />

      </View>

      {/* Container omkring anden knap. */}
      <View style={GlobalStyles.buttonContainer}>

        {/* Navigerer brugeren til formularen til nye køb. */}
        <Button
          title="Tilføj køb"
          onPress={() =>
            navigation.navigate('AddPurchase')
          }
        />

      </View>

    </View>
  );
}