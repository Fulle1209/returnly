// Importerer React.
import React from 'react';

// Importerer de React Native-komponenter, som bruges i inputfeltet.
import {
  Text,
  TextInput
} from 'react-native';

// Importerer appens fælles styling.
import GlobalStyles from '../styles/GlobalStyles';

// FormInput er en genbrugelig komponent til formularfelter.
// Komponenten modtager label, placeholder, value,
// onChangeText og keyboardType som props.
export default function FormInput({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default'
}) {

  // Returnerer både label og inputfelt.
  return (
    <>
      {/* Viser navnet på inputfeltet. */}
      <Text style={GlobalStyles.label}>
        {label}
      </Text>

      {/* Inputfeltet genbruges med forskellige værdier via props. */}
      <TextInput
        style={GlobalStyles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </>
  );
}