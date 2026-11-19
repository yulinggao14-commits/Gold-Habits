import { useRouter } from "expo-router";
import { useState } from 'react';
import { Button, Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function MainMenuScreen() {

    const router = useRouter();
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
            maxLength={20}
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={handleContinue}
            accessibilityLabel="Koi name"
            accessibilityHint="Enter a name for your koi, up to 20 characters"
            />
            <Text style={styles.characterCount}>
            {koiName.length}/20
            </Text>

            <TouchableOpacity
            style={[styles.button, !canContinue && styles.buttonDisabled]}
            onPress={handleContinue}
            disabled={!canContinue}
            accessibilityRole="button"
            accessibilityLabel="Confirm koi name"
            accessibilityState={{ disabled: !canContinue }}
            >
                <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          <View> 
            <View>
              <Button
                title="Task Manager"
                onPress={() => router.push('/task-manager') }
              />
            </View>
          </View>
          <View>
            <Button 
              title="Shop"
              onPress = { () => router.push('/Shop') }
            />
          </View>
        </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#275DAD',
    paddingHorizontal: 20,
    paddingVertical: 30,
},
  logo: {
    width: 170,
    height: 170,
    marginBottom: 20,
},
  title: {
    fontSize: 42,
    color: '#FFC145',
    fontWeight: 'bold',
    fontFamily: 'Georgia',
    marginBottom: 30,
    textAlign: 'center',
},
  inputBox: {
    width: '100%',
    maxWidth: 325,
    height: 60,
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: 15,
    fontSize: 18,
    fontFamily: 'Georgia',
    fontWeight: 'bold',
    marginBottom: 8,
},
  button: {
    width: '100%',
    maxWidth: 325,
    height: 60,
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
    characterCount: {
    width: '100%',
    maxWidth: 325,
    textAlign: 'right',
    color: 'white',
    fontSize: 14,
    marginBottom: 20,
},
});
