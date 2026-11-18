import { View, Button, Text, ScrollView, StyleSheet, Alert} from "react-native";
import React from "react";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// 1. Define the TypeScript interface for your catalogue item

export default function Shop() {
    const router = useRouter();

    return (
        //Categories
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.titleText}> Categories </Text>
                <View style={styles.buttonRow}>
                    <Button title="Hats"
                            onPress = {() => router.push('/hats')}
                    />
                    <Button title="Shirts"
                            onPress = {() => router.push('/shirts')}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 16,
        gap: 12,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '267FC7',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
});
