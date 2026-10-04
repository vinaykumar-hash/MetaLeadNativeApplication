import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 17, marginBottom: 12, borderWidth: 1, borderColor: '#E4E9F0', shadowColor: '#1B2A40', shadowOpacity: 0.04, shadowRadius: 10, elevation: 1 },
  newCard: { borderColor: '#BCDCCB', backgroundColor: '#FCFFFD' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  identity: { flex: 1, flexDirection: 'row', alignItems: 'center', minWidth: 0 },
  nameBlock: { flex: 1 },
  name: { color: '#1C2A3D', fontSize: 16, fontWeight: '700' },
  submitted: { color: '#7B899A', fontSize: 12, marginTop: 3 },
  divider: { height: 1, backgroundColor: '#EDF0F4', marginVertical: 15 },
  detail: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 9 },
  detailLabel: { width: 55, color: '#96A2B2', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  detailValue: { flex: 1, color: '#43546A', fontSize: 13, fontWeight: '500' },
});
