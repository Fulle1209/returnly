// Importerer StyleSheet fra React Native.
import { StyleSheet } from 'react-native';

// Samler appens styling ét centralt sted.
const GlobalStyles = StyleSheet.create({

  // Standardcontainer til appens normale screens.
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F6F7F9',
  },

  // Container til startsiden, hvor indholdet centreres vertikalt.
  centeredContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#F6F7F9',
  },

  // Stor titel på startsiden.
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1D1D1F',
  },

  // Undertitel/value proposition.
  subtitle: {
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 35,
    color: '#555555',
  },

  // Overskrifter på de enkelte screens.
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1D1D1F',
  },

  // Beskrivende tekst under overskrifter.
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#666666',
    marginBottom: 22,
  },

  // Standard brødtekst.
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333333',
  },

  // Skaber afstand omkring knapper.
  buttonContainer: {
    marginVertical: 8,
  },

  // Kort til et køb i FlatList.
  purchaseCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    marginBottom: 14,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },

  // Placerer produktinfo og returstatus på samme række.
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Styling af produktnavn.
  purchaseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginBottom: 4,
  },

  // Styling af butik.
  storeText: {
    fontSize: 14,
    color: '#777777',
  },

  // Styling af selve returdatoen.
  deadlineText: {
    fontSize: 14,
    color: '#555555',
    marginTop: 14,
  },

  // Rød status når returfristen er tæt på.
  statusUrgent: {
    backgroundColor: '#FDE8E8',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  // Gul status når returfristen nærmer sig.
  statusSoon: {
    backgroundColor: '#FFF4D6',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  // Grøn status når der er god tid.
  statusSafe: {
    backgroundColor: '#E4F5EA',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  // Grå status når returfristen er overskredet.
  statusExpired: {
    backgroundColor: '#E5E5E5',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  // Teksten inde i statusmærket.
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
  },

  // Label over inputfelter.
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333333',
  },

  // Styling af TextInput-felterne.
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    padding: 13,
    marginBottom: 17,
    fontSize: 16,
  },

  // Sikrer plads nederst i formularen.
  formContent: {
    paddingBottom: 40,
  },

  // Kort omkring screenshot-importfunktionen.
  importBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },

  // Titel i importboksen.
  importTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginBottom: 6,
  },

  // Forklarende tekst i importboksen.
  importDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666666',
    marginBottom: 15,
  },

  // Overskrift til manuel registrering.
  manualTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginBottom: 15,
  },

  // Container omkring preview af screenshot.
  imagePreviewContainer: {
    marginTop: 15,
  },

  // Størrelsen på screenshot-previewet.
  receiptImage: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    resizeMode: 'cover',
  },

  // Bekræftelsestekst efter valg af billede.
  imageSelectedText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },

});

// Eksporterer styles, så de kan bruges i alle screens.
export default GlobalStyles;