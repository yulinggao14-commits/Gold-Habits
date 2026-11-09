import { useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function MainMenuCheckInScreen() {
    const [koiName, setKoiName] = useState('');
    const canContinue = koiName.trim().length > 0;

    const handleContinue = () => {
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <Text style={styles.title}>{'Check-in Bonus!'}</Text>
            <Text style={styles.subtitle}>{'Day #1'}</Text>


            <TouchableOpacity
                style={styles.button}
                onPress={handleContinue}
                activeOpacity={0.7}
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
    paddingTop: 75,
    paddingBottom: 120,
  },
  chest: {
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
    marginBottom: 10, 
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 45,
    color: '#FFC145',
    fontWeight: 'bold',
    fontFamily: 'Georgia',
    textAlign: 'center',
    marginBottom: 350, 
  },
  button: {
    width: 250,
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