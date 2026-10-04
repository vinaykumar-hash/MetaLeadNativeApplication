import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#13233C' },
  hero: { backgroundColor: '#13233C', paddingHorizontal: 24, paddingTop: 24, paddingBottom: 25 },
  title: { color: '#FFFFFF', fontSize: 34, fontWeight: '700', letterSpacing: -0.8 },
  heroFooter: { marginTop: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sessionCount: { alignItems: 'flex-end' },
  sessionCountNumber: { color: '#FFFFFF', fontSize: 21, fontWeight: '700', lineHeight: 23 },
  sessionCountLabel: { color: '#8092AB', fontSize: 9, fontWeight: '800', letterSpacing: 0.8, marginTop: 2 },
  list: { flexGrow: 1, backgroundColor: '#F4F6F9', paddingHorizontal: 18, paddingTop: 22 },
  emptyList: { paddingBottom: 24 },
  listHeading: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14, paddingHorizontal: 3 },
  listTitle: { color: '#1C2A3D', fontSize: 16, fontWeight: '700' },
  listMeta: { color: '#718096', fontSize: 12, fontWeight: '600' },
});
