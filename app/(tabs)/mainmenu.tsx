import { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function MainMenuScreen() {
    const [koiName, setKoiName] = useState('');
    const canContinue = koiName.trim().length > 0;

    const handleContinue = () => {
        if (canContinue) {
            Keyboard.dismiss();
            console.log('Koi Name:', koiName.trim());
        };
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <Text style={styles.title}>Gold Habits</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your Koi's name"
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
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: 'blue',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});