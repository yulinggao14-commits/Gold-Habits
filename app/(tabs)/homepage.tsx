import { Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomePage() {
  return (
    <TouchableOpacity style={styles.dressup}>
      <Image
        source={require('../../assets/images/dressup_icon.png')}
        style={styles.dressup}
        resizeMode="contain"
      />
      <Image
        source={require('../../assets/images/reward_icon.png')}
        style={styles.reward}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    dressup: {
      width: 50,
      height: 50,
      position: 'absolute',
      top: 15,
      right: 15,
      bottom: 15,
    },
    reward: {
      width: 50,
      height: 50,
      position: 'absolute',
      top: 15,
      left: 15,
      bottom: 15,
    }
});