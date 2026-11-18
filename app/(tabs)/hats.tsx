import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function hats() {
    return (
        <View style={styles.container}>
            <Text style={styles.hatTitle}>
                Hats
            </Text>
        </View>
    );
}

const styles = StyleSheet.create ({
    hatTitle: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1,
    },
    container: {
        color: "#448DF2",
        flex: 1,

    },
})