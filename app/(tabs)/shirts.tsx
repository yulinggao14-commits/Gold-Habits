import React from "react";
import { View, Text, Button, StyleSheet, } from "react-native";
import { useRouter } from "expo-router";

export default function shirts() {
    const router = useRouter();

    return (
        <View>
            <Text style={styles.elementText}>
                Hats
            </Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    elementText: {
        flex: 1,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },

});