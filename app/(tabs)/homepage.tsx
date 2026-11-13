import { router } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/Themed';

const { width, height } = Dimensions.get('window');
const handleContinue = (tabName: string) => {
  router.push({ pathname: tabName }); // unsure how to make vscode ignore
}

const DisplayStats = () => { 
  const [currentLevel, setLevel] = useState(3);
  const [currentGold, setGold] = useState(81);
  
  // test code to show that it can update in real-time
  /* 
  const upLevel = () => setLevel(prevLevel => prevLevel + 1);
  const upGold = () => setGold(prevGold => prevGold + 1);
  // put in code to make the "increment thing" TouchableOpacities below work
  // also have to re-add the imports for everything
  */

  /*
  <TouchableOpacity style={styles.tempButton} onPress={upLevel}> 
    <Text>increment level</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.tempButton} onPress={upGold}>
    <Text>increment gold</Text>
  </TouchableOpacity>
  // put either TouchableOpacity somewhere in the View
  */

  return (
    <View style={styles.header}>

        <View style={styles.valueContainer}>
          <Text>Level: {currentLevel}</Text>
        </View>

        <View style={styles.valueContainer}>
          <Text>Gold: {currentGold}</Text>
        </View>

    </View>
  );
};

export default function HomePage() {
  return ( 
    // the icon.pngs are the size of the phone, so the icons have to be loaded like this to be visible
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/dressup_icon.png')}
        style={styles.icon}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/images/reward_icon.png')}
        style={styles.icon}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/images/background_icon.png')}
        style={styles.icon}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/images/shop_icon.png')}
        style={styles.icon}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/images/carp_default.png')}
        style={{width: width, height: height }}
        resizeMode="contain"
      />

      <DisplayStats />

      <View style={styles.buttonBar}>
        <TouchableOpacity style={styles.button} activeOpacity={0.4} 
          onPress={() => handleContinue('/(tabs)/dressup')}/>
        <TouchableOpacity style={styles.button} activeOpacity={0.4} 
          onPress={() => handleContinue('/(tabs)/reward')}/>
        <TouchableOpacity style={styles.button} activeOpacity={0.4} 
          onPress={() => handleContinue('/(tabs)/background')}/>
        <TouchableOpacity style={styles.button} activeOpacity={0.4} 
          onPress={() => handleContinue('/(tabs)/catalogue')}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#275DAD',
  },
  valueContainer: {
    alignItems: 'center',
    width: 70,
    height: 20,
    backgroundColor: '#2f95dc',
    borderRadius: 5,
  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center', 
    width: width,
    position: 'absolute',
    top: 70,
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    // border for visibility when modifying. yes its ugly but it wont be there for the final product, probably
    borderWidth: 5, 
    borderColor: "red",
  },
  icon: {
    width: width,
    height: height,
    position: "absolute",
    top: height / 25,
  },
  button: {
    width: 50,
    height: 50,
    margin: 5, 
    // visibility
    borderWidth: 3, 
    borderRadius: 25, 
    borderColor: "red", 
  },
  buttonBar: {
    flexDirection: 'column',
    width: 60,
    height: 280,
    position: 'absolute',
    right: 18,
    top: 104,
    backgroundColor: 'transparent',

  }
  /*
  reward: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 15,
    left: 15,
    bottom: 15,
    borderWidth: 5,
    borderRadius: 25,
  },
  */
});
