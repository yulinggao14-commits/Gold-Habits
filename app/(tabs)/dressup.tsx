import { ITEMS, type Category, type WardrobeItem } from '@/constants/Wardrobe';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');


const SCALE = width / 1080;
const BAND_TOP = 760;
const BAND_HEIGHT = 720;

const CARP = require('../../assets/images/carp_default.png');


const LAYERS: Category[] = ['shirts', 'face', 'neck', 'hats'];

type CommunityIconName = keyof typeof MaterialCommunityIcons.glyphMap;

const TABS: { key: Category; icon: CommunityIconName }[] = [
  { key: 'favorites', icon: 'heart' },
  { key: 'face', icon: 'sunglasses' },
  { key: 'hats', icon: 'hat-fedora' },
  { key: 'shirts', icon: 'tshirt-crew' },
  { key: 'neck', icon: 'bow-tie' },
];

export default function DressUp() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<Category>('hats');

  const [worn, setWorn] = useState<Partial<Record<Category, string>>>({});

  const tabItems = ITEMS.filter((item) => item.category === tab);
  const wornItems = LAYERS.flatMap((category) => ITEMS.filter((item) => item.id === worn[category]));

  const emptyBoxes = Math.max(6, Math.ceil(tabItems.length / 3) * 3) - tabItems.length;


  const toggle = (item: WardrobeItem) =>
    setWorn((prev) => ({ ...prev, [item.category]: prev[item.category] === item.id ? undefined : item.id }));

  return (
    <View style={styles.screen}>

      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <Pressable onPress={() => router.push('/(tabs)/homepage')} hitSlop={10}>
          <Ionicons name="arrow-back" size={34} color="black" />
        </Pressable>
        <View style={styles.nameRow}>
          <Text style={styles.name}>Name</Text>
          <Ionicons name="pencil" size={26} color="black" />
        </View>
      </View>


      <View style={styles.stage}>
        <View style={styles.band}>
          <Image source={CARP} style={styles.layer} />
          {wornItems.map((item) => (
            <Image key={item.id} source={item.image} style={styles.layer} />
          ))}
        </View>
      </View>


      <View style={styles.tabBar}>
        {TABS.map((t) => (
          <Pressable key={t.key} onPress={() => setTab(t.key)} style={[styles.tab, tab === t.key && styles.tabActive]}>
            <MaterialCommunityIcons
              name={t.icon}
              size={24}
              color={tab === t.key ? '#000' : '#888'}
            />
          </Pressable>
        ))}
      </View>


      <ScrollView style={styles.panel} contentContainerStyle={[styles.grid, { paddingBottom: insets.bottom + 16 }]}>
        {tabItems.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => toggle(item)}
            style={[styles.box, worn[item.category] === item.id && styles.boxWorn]}>
            <Image source={item.thumb} style={styles.thumb} resizeMode="contain" />
          </Pressable>
        ))}
        {Array.from({ length: emptyBoxes }, (_, i) => (
          <View key={`empty-${i}`} style={styles.box} />
        ))}
      </ScrollView>
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