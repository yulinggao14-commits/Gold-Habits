import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function MainMenuScreen() {
    const [koiName, setKoiName] = useState('');
    const canContinue = koiName.trim().length > 0;

    const handleContinue = () => {
        if (canContinue) {
            Keyboard.dismiss();
            router.push({
                pathname: '/(tabs)/mainmenuCheckIn',
                params: { koiName: koiName.trim() },
            });
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <Image
                source={require('../../assets/images/carp_default.png')}
                style={styles.logo}
                resizeMode="contain"
                pointerEvents="none"
            />

            <Text style={styles.title}>Gold Habits</Text>

            <TextInput
                style={styles.inputBox}
                placeholder="Enter your Koi's name"
                placeholderTextColor="#798497"
                value={koiName}
                onChangeText={setKoiName}
            />

            <TouchableOpacity
                style={[styles.button, !canContinue && styles.buttonDisabled]}
                onPress={handleContinue}
                disabled={!canContinue}
            >
                <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#275DAD',
    paddingBottom: 120,
  },
  logo: {
    width: 700,
    height: 700,
    marginVertical: -325, 
    position: 'absolute',
    
  },
  title: {
    fontSize: 55,
    color: '#FFC145',
    fontWeight: 'bold',
    fontFamily: 'Georgia',
    marginBottom: 175, 
  },
  inputBox: {
    width: 325,
    height: 60,
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: 15,
    fontSize: 18,
    fontFamily: 'Georgia',
    fontWeight: 'bold',
    marginTop: 110, 
    marginBottom: 25, 
  },
  button: {
    width: 325,
    height: 60,
    position: 'absolute',
    bottom: 155,
    backgroundColor: '#FFC145',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Georgia',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});