// Importerer React og useState.
import React, { useState } from 'react';

// Importerer React Native-komponenter.
import {
  View,
  Text,
  Button,
  Alert
} from 'react-native';

// Importerer Expo Notifications.
import * as Notifications from 'expo-notifications';

// Importerer fælles styling.
import GlobalStyles from '../styles/GlobalStyles';


// Bestemmer hvordan notifikationer vises,
// hvis appen er åben, når notifikationen kommer.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


// ReminderSettingsScreen modtager det valgte køb via navigation.
export default function ReminderSettingsScreen({
  route,
  navigation
}) {

  // Henter købet fra den forrige screen.
  const { purchase } = route.params;

  // Gemmer hvor mange dage før returfristen
  // brugeren ønsker en påmindelse.
  const [daysBefore, setDaysBefore] = useState(3);


  // Konverterer en dato fra DD/MM/YYYY
  // til et JavaScript Date-objekt.
  const parseDate = (dateString) => {

    // Deler datoen ved "/".
    const parts = dateString.split('/');

    // Stopper hvis formatet ikke er korrekt.
    if (parts.length !== 3) {
      return null;
    }

    // Henter dag, måned og år.
    const day = Number(parts[0]);
    const month = Number(parts[1]);
    const year = Number(parts[2]);

    // Kontrollerer at værdierne er tal.
    if (
      Number.isNaN(day) ||
      Number.isNaN(month) ||
      Number.isNaN(year)
    ) {
      return null;
    }

    // Opretter datoen.
    // Notifikationen sættes til kl. 10.00.
    return new Date(
      year,
      month - 1,
      day,
      10,
      0,
      0
    );
  };


  // Beder brugeren om tilladelse til notifikationer.
  const requestNotificationPermission = async () => {

    // Henter den nuværende tilladelse.
    const currentPermission =
      await Notifications.getPermissionsAsync();

    // Hvis tilladelsen allerede er givet.
    if (currentPermission.granted) {
      return true;
    }

    // Ellers spørges brugeren om tilladelse.
    const newPermission =
      await Notifications.requestPermissionsAsync();

    // Returnerer true hvis brugeren accepterede.
    return newPermission.granted;
  };


  // Planlægger en rigtig påmindelse før returfristen.
  const scheduleReminder = async () => {

    try {

      // Beder først om tilladelse.
      const permissionGranted =
        await requestNotificationPermission();

      // Stopper hvis brugeren ikke gav tilladelse.
      if (!permissionGranted) {

        Alert.alert(
          'Notifikationer er slået fra',
          'Returnly skal have tilladelse til at sende påmindelser.'
        );

        return;
      }


      // Konverterer returfristen til en JavaScript-dato.
      const deadline =
        parseDate(purchase.returnDeadline);

      // Stopper hvis datoen ikke kunne læses.
      if (!deadline) {

        Alert.alert(
          'Ugyldig returfrist',
          'Returfristen kunne ikke læses.'
        );

        return;
      }


      // Kopierer returfristen.
      const reminderDate =
        new Date(deadline);

      // Trækker det valgte antal dage fra returfristen.
      reminderDate.setDate(
        reminderDate.getDate() - daysBefore
      );


      // Henter tidspunktet lige nu.
      const now = new Date();

      // Kontrollerer at påmindelsen ligger i fremtiden.
      if (reminderDate <= now) {

        Alert.alert(
          'Påmindelsen ligger i fortiden',
          'Vælg færre dage før returfristen.'
        );

        return;
      }


      // Planlægger notifikationen.
      await Notifications.scheduleNotificationAsync({

        // Indholdet der vises i notifikationen.
        content: {

          // Titel.
          title: 'Returnly – returfrist nærmer sig',

          // Besked.
          body:
            `${purchase.product} fra ${purchase.store} ` +
            `skal returneres om ${daysBefore} dage.`,

          // Gemmer information om købet.
          // Det bruger vi senere til at åbne det rigtige køb.
          data: {
            purchaseId: purchase.id,
          },

          // Standard notifikationslyd.
          sound: true,
        },


        // SDK 58 kræver en korrekt trigger-type.
        trigger: {

          // Fortæller Expo at dette er en bestemt dato.
          type:
            Notifications
              .SchedulableTriggerInputTypes
              .DATE,

          // Datoen hvor notifikationen skal vises.
          date: reminderDate,
        },
      });


      // Viser bekræftelse.
      Alert.alert(
        'Påmindelse aktiveret',
        `Du bliver mindet om ${purchase.product} ` +
        `${daysBefore} dage før returfristen.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );

    } catch (error) {

      // Viser fejlen i terminalen.
      console.log(
        'Fejl ved oprettelse af påmindelse:',
        error
      );

      // Informerer brugeren.
      Alert.alert(
        'Der opstod en fejl',
        'Påmindelsen kunne ikke oprettes.'
      );
    }
  };


  // Laver en testnotifikation om 10 sekunder.
  const testNotification = async () => {

    try {

      // Beder om tilladelse.
      const permissionGranted =
        await requestNotificationPermission();

      // Stopper hvis tilladelsen ikke blev givet.
      if (!permissionGranted) {
        return;
      }


      // Planlægger testnotifikationen.
      await Notifications.scheduleNotificationAsync({

        // Notifikationens indhold.
        content: {

          title: 'Returnly test',

          body:
            `Husk returfristen på ${purchase.product}.`,

          sound: true,

          // Gemmer også købets id her.
          data: {
            purchaseId: purchase.id,
          },
        },


        // Udløses efter 10 sekunder.
        trigger: {

          // Fortæller Expo at det er et tidsinterval.
          type:
            Notifications
              .SchedulableTriggerInputTypes
              .TIME_INTERVAL,

          // Antal sekunder.
          seconds: 10,
        },
      });


      // Bekræfter testen.
      Alert.alert(
        'Test planlagt',
        'Du modtager en Returnly-notifikation om 10 sekunder.'
      );

    } catch (error) {

      // Viser eventuel fejl.
      console.log(
        'Fejl ved testnotifikation:',
        error
      );

      // Informerer brugeren.
      Alert.alert(
        'Der opstod en fejl',
        'Testnotifikationen kunne ikke oprettes.'
      );
    }
  };


  // Returnerer skærmens interface.
  return (
    <View style={GlobalStyles.container}>

      {/* Overskrift. */}
      <Text style={GlobalStyles.sectionTitle}>
        Påmindelse
      </Text>


      {/* Viser produktet. */}
      <Text style={GlobalStyles.text}>
        Produkt: {purchase.product}
      </Text>


      {/* Viser returfristen. */}
      <Text style={GlobalStyles.text}>
        Returfrist: {purchase.returnDeadline}
      </Text>


      {/* Forklarer valget. */}
      <Text style={GlobalStyles.label}>
        Hvornår vil du påmindes?
      </Text>


      {/* 1 dag før. */}
      <View style={GlobalStyles.buttonContainer}>
        <Button
          title={
            daysBefore === 1
              ? '✓ 1 dag før'
              : '1 dag før'
          }
          onPress={() => setDaysBefore(1)}
        />
      </View>


      {/* 3 dage før. */}
      <View style={GlobalStyles.buttonContainer}>
        <Button
          title={
            daysBefore === 3
              ? '✓ 3 dage før'
              : '3 dage før'
          }
          onPress={() => setDaysBefore(3)}
        />
      </View>


      {/* 7 dage før. */}
      <View style={GlobalStyles.buttonContainer}>
        <Button
          title={
            daysBefore === 7
              ? '✓ 7 dage før'
              : '7 dage før'
          }
          onPress={() => setDaysBefore(7)}
        />
      </View>


      {/* Gemmer den rigtige påmindelse. */}
      <View style={GlobalStyles.buttonContainer}>
        <Button
          title="Aktivér påmindelse"
          onPress={scheduleReminder}
        />
      </View>


      {/* Hurtig testfunktion. */}
      <View style={GlobalStyles.buttonContainer}>
        <Button
          title="Test notifikation"
          onPress={testNotification}
        />
      </View>

    </View>
  );
}