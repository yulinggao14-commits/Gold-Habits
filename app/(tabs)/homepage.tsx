import { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';

// import EditScreenInfo from '@/components/EditScreenInfo';
import Transition from '@/components/tempTransition';
import { Text, View } from '@/components/Themed';

const { width, height } = Dimensions.get('window');

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
  // put each TouchableOpacity in the "flexDirection: 'column'" View of the corresponding Text
  */

  return (
    <View style={styles.values}>

      <View style={{ flexDirection: 'column'}}>
        <View style={styles.valueContainer}>
          <Text>Level: {currentLevel}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'column'}}>
        <View style={styles.valueContainer}>
          <Text>Gold: {currentGold}</Text>
        </View>
      </View>

    </View>
  );
};

/* kept the template stuff for no particular reason, you can probably just grab it from branch history
<Text style={styles.title}>Home Page</Text>
<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
<EditScreenInfo path="app/(tabs)/homepage.tsx" />
*/

export default function HomepageScreen() {
  return ( 
    <View style={styles.container}>

      <DisplayStats /> 
      <Transition />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueContainer: {
    alignItems: 'center',
    width: 70,
    height: 20,
    backgroundColor: '#2f95dc',
    borderRadius: 5,
  },
  values: {
    flexDirection: 'row', 
    alignItems: 'center', 
    width: width,
    position: 'absolute',
    top: 70,
    justifyContent: 'space-between',
    borderWidth: 5, // border's there so i can see where the views start & end
  },
  /*
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  tempButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
  },
  */
});
/* talking to myself
issue: DisplayStats currently shows the values even when on Screen 2 from Transition
option a: turn DisplayStats into a component and have it activate in tempTransition
          so that the stats are attatched to the Screen 1 view
          (would probably create new issues with formatting the Screen 1 view)
option b: reformat the DisplayStats view so that it's a proper header that looks
          natural in the other screens attatched to it
          (dress-up, shop, reward should be related enough to gold for it to stay on-screen)
          (might be more of a ui thing)
option c: rewrite a new Transition component that actually allows movement between different tabs,
          rather than just having multiple screens' worth of info offscreen
          (i currently don't know how to do that)
*/