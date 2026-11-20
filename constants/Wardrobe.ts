import { ImageSourcePropType } from 'react-native';

// One key per tab in the orange bar
export type Category = 'favorites' | 'face' | 'hats' | 'shirts' | 'neck';

export type WardrobeItem = {
  id: string;
  category: Category;
  image: ImageSourcePropType; // full-size PNG, same 1080x2340 canvas as carp_default.png (worn on the fish)
  thumb: ImageSourcePropType; // cropped PNG, shown in the grid box
};

// To add an item: put both PNGs in assets/images and add one entry here
export const ITEMS: WardrobeItem[] = [
  // Hats
  {
    id: 'sun_hat',
    category: 'hats',
    image: require('../assets/images/Beach_hat.png'),
    thumb: require('../assets/images/Beach_hat.png'),
  },
  {
    id: 'Every_day_hat',
    category: 'hats',
    image: require('../assets/images/Every_day_hat.png'),
    thumb: require('../assets/images/Every_day_hat.png'),
  },
  {
    id: 'cap',
    category: 'hats',
    image: require('../assets/images/cap.png'),
    thumb: require('../assets/images/cap.png'),
  },
  {
    id: 'brim_hat',
    category: 'hats',
    image: require('../assets/images/brim_hat.png'),
    thumb: require('../assets/images/brim_hat.png'),
  },

  {
    id: 'bow',
    category: 'hats',
    image: require('../assets/images/assets_accessory_bow.png'),
    thumb: require('../assets/images/assets_accessory_bow.png'),
  },
  {
    id: 'clown',
    category: 'hats',
    image: require('../assets/images/assets_accessory_clown.png'),
    thumb: require('../assets/images/assets_accessory_clown.png'),
  },



  {
    id: 'orange_shirt',
    category: 'shirts',
    image: require('../assets/images/Orange_Shirt.png'),
    thumb: require('../assets/images/Orange_Shirt.png'),
  },
  {
    id: 'Dress_shirt',
    category: 'shirts',
    image: require('../assets/images/Dress_shirt.png'),
    thumb: require('../assets/images/Dress_shirt.png'),
  },

  {
    id: 'Star_Dress',
    category: 'shirts',
    image: require('../assets/images/Star_Dess.png'),
    thumb: require('../assets/images/Star_Dess.png'),
  }

];