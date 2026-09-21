// Importerer React og useState-hooket.
import React, { useState } from 'react';

// Importerer React Native-komponenterne der bruges på siden.
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Image,
  ScrollView
} from 'react-native';

// Importerer Expo ImagePicker fra undervisningens teknologispor.
import * as ImagePicker from 'expo-image-picker';

// Importerer appens fælles styling.
import GlobalStyles from '../styles/GlobalStyles';

// Komponenten modtager navigation samt funktionen til at tilføje et køb.
export default function AddPurchaseScreen({
  navigation,
  onAddPurchase
}) {

  // Gemmer brugerens produktnavn.
  const [product, setProduct] = useState('');

  // Gemmer brugerens butik.
  const [store, setStore] = useState('');

  // Gemmer produktets pris.
  const [price, setPrice] = useState('');

  // Gemmer købsdatoen.
  const [purchaseDate, setPurchaseDate] = useState('');

  // Gemmer returfristen.
  const [returnDeadline, setReturnDeadline] = useState('');

  // Gemmer URI'en til det valgte screenshot.
  const [receiptImage, setReceiptImage] = useState(null);

  // Funktionen åbner telefonens billedbibliotek.
  const pickReceiptImage = async () => {

    // Starter Expo ImagePicker.
    const result =
      await ImagePicker.launchImageLibraryAsync({

        // Begrænser valget til billeder.
        mediaTypes: ['images'],

        // Giver brugeren mulighed for at beskære billedet.
        allowsEditing: true,

        // Reducerer billedkvaliteten lidt for at spare ressourcer.
        quality: 0.8,
      });

    // Kontrollerer at brugeren faktisk valgte et billede.
    if (!result.canceled) {

      // Gemmer adressen til det valgte billede i state.
      setReceiptImage(result.assets[0].uri);
    }
  };

  // Beregner antal dage mellem dags dato og returfristen.
  const calculateDaysLeft = (dateString) => {

    // Deler datoen op ved hvert "/".
    const parts = dateString.split('/');

    // Kontrollerer at datoen består af tre dele.
    if (parts.length !== 3) {
      return null;
    }

    // Konverterer den første del til dag.
    const day = Number(parts[0]);

    // Konverterer den anden del til måned.
    const month = Number(parts[1]);

    // Konverterer den tredje del til år.
    const year = Number(parts[2]);

    // Opretter et JavaScript Date-objekt for returfristen.
    const deadline =
      new Date(year, month - 1, day);

    // Henter dags dato.
    const today = new Date();

    // Nulstiller klokkeslættet, så kun datoerne sammenlignes.
    today.setHours(0, 0, 0, 0);

    // Nulstiller også klokkeslættet på returfristen.
    deadline.setHours(0, 0, 0, 0);

    // Finder tidsforskellen i millisekunder.
    const difference =
      deadline.getTime() - today.getTime();

    // Konverterer millisekunder til hele dage.
    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );
  };

  // Funktionen kaldes, når brugeren trykker "Tilføj køb".
  const handleAddPurchase = () => {

    // Kontrollerer at de vigtigste felter er udfyldt.
    if (!product || !store || !returnDeadline) {

      // Viser fejlbesked til brugeren.
      Alert.alert(
        'Manglende oplysninger',
        'Udfyld produkt, butik og returfrist.'
      );

      // Stopper funktionen.
      return;
    }

    // Beregner antal dage til returfristen.
    const daysLeft =
      calculateDaysLeft(returnDeadline);

    // Kontrollerer at datoformatet kunne behandles.
    if (daysLeft === null) {

      // Viser fejlbesked.
      Alert.alert(
        'Forkert datoformat',
        'Skriv datoen som DD/MM/YYYY.'
      );

      // Stopper funktionen.
      return;
    }

    // Opretter et nyt køb som JavaScript-objekt.
    const newPurchase = {

      // Genererer et simpelt unikt id ud fra tidspunktet.
      id: Date.now().toString(),

      // Gemmer produktnavnet.
      product,

      // Gemmer butikken.
      store,

      // Gemmer prisen.
      price,

      // Gemmer købsdatoen.
      purchaseDate,

      // Gemmer returfristen.
      returnDeadline,

      // Gemmer den beregnede returperiode.
      daysLeft,

      // Gemmer billedet, hvis brugeren har valgt et.
      receiptImage,
    };

    // Sender det nye køb tilbage til App.js.
    onAddPurchase(newPurchase);

    // Navigerer derefter til købsoverblikket.
    navigation.navigate('Purchases');
  };

  // Returnerer sidens interface i en ScrollView.
  return (
    <ScrollView
      style={GlobalStyles.container}
      contentContainerStyle={GlobalStyles.formContent}
    >

      {/* Sidens overskrift. */}
      <Text style={GlobalStyles.sectionTitle}>
        Tilføj køb
      </Text>

      {/* Forklarer de to registreringsmuligheder. */}
      <Text style={GlobalStyles.description}>
        Tilføj købet manuelt eller importér et screenshot
        af din ordrebekræftelse.
      </Text>

      {/* Område til automatisk/fremtidig import. */}
      <View style={GlobalStyles.importBox}>

        {/* Importfunktionens titel. */}
        <Text style={GlobalStyles.importTitle}>
          Importér ordrebekræftelse
        </Text>

        {/* Forklarer at automatisk aflæsning endnu er en fremtidig funktion. */}
        <Text style={GlobalStyles.importDescription}>
          Vælg et screenshot fra dit billedbibliotek.
          I en fremtidig version skal Returnly automatisk
          aflæse købsoplysningerne.
        </Text>

        {/* Åbner telefonens billedbibliotek. */}
        <Button
          title="Vælg screenshot"
          onPress={pickReceiptImage}
        />

        {/* Vises kun hvis brugeren har valgt et billede. */}
        {receiptImage && (

          <View style={GlobalStyles.imagePreviewContainer}>

            {/* Viser preview af ordrebekræftelsen. */}
            <Image
              source={{ uri: receiptImage }}
              style={GlobalStyles.receiptImage}
            />

            {/* Bekræfter at filen er valgt. */}
            <Text style={GlobalStyles.imageSelectedText}>
              Ordrebekræftelse valgt ✓
            </Text>

          </View>
        )}

      </View>

      {/* Overskrift til manuel registrering. */}
      <Text style={GlobalStyles.manualTitle}>
        Manuel indtastning
      </Text>

      {/* Label til produktnavn. */}
      <Text style={GlobalStyles.label}>
        Produktnavn
      </Text>

      {/* Inputfelt til produktnavn. */}
      <TextInput
        style={GlobalStyles.input}
        placeholder="Fx Nike Air Max"
        value={product}
        onChangeText={setProduct}
      />

      {/* Label til butik. */}
      <Text style={GlobalStyles.label}>
        Butik
      </Text>

      {/* Inputfelt til butik. */}
      <TextInput
        style={GlobalStyles.input}
        placeholder="Fx Zalando"
        value={store}
        onChangeText={setStore}
      />

      {/* Label til pris. */}
      <Text style={GlobalStyles.label}>
        Pris
      </Text>

      {/* Inputfelt med numerisk tastatur. */}
      <TextInput
        style={GlobalStyles.input}
        placeholder="Fx 899"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      {/* Label til købsdato. */}
      <Text style={GlobalStyles.label}>
        Købsdato
      </Text>

      {/* Inputfelt til købsdato. */}
      <TextInput
        style={GlobalStyles.input}
        placeholder="Fx 21/09/2026"
        value={purchaseDate}
        onChangeText={setPurchaseDate}
      />

      {/* Label til returfrist. */}
      <Text style={GlobalStyles.label}>
        Returfrist
      </Text>

      {/* Inputfelt til returfrist. */}
      <TextInput
        style={GlobalStyles.input}
        placeholder="Fx 15/10/2026"
        value={returnDeadline}
        onChangeText={setReturnDeadline}
      />

      {/* Container omkring knappen. */}
      <View style={GlobalStyles.buttonContainer}>

        {/* Opretter det nye køb. */}
        <Button
          title="Tilføj køb"
          onPress={handleAddPurchase}
        />

      </View>

    </ScrollView>
  );
}