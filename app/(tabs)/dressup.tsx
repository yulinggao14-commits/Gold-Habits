import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>dress up</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/dressup.tsx" />

      <TouchableOpacity style={{ width: 100, height: 40, backgroundColor: '#2f95dc'}}
        onPress={() => router.push({ pathname: '/(tabs)/homepage' })}>
        <Text style={styles.title}>go back</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const PADDING = 16;
const GAP = 12;
const BOX = Math.floor((width - PADDING * 2 - GAP * 2) / 3); 

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#275DAD' },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: PADDING },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  name: { fontSize: 30, fontWeight: 'bold', fontFamily: 'Georgia', color: 'black' },

  stage: { flex: 3, justifyContent: 'center', overflow: 'hidden' },
  band: { width, height: BAND_HEIGHT * SCALE, overflow: 'hidden' },
  layer: { position: 'absolute', top: -BAND_TOP * SCALE, left: 0, width, height: 2340 * SCALE },

  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#E8A02A',
    paddingVertical: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tab: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  tabActive: { backgroundColor: '#F6C873' },
  tabIcon: { width: 36, height: 36 },

  panel: { flex: 2, backgroundColor: '#5BC0EB' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: GAP, padding: PADDING },
  box: {
    width: BOX,
    height: BOX * 0.9,
    borderRadius: 12,
    backgroundColor: '#3F7FC6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxWorn: { backgroundColor: '#e0d53a' },
  thumb: { width: '80%', height: '80%' },
});