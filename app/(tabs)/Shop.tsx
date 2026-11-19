import { router } from 'expo-router';
import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const { width, height } = Dimensions.get('window');
// import React from "react";
// import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

// 1. Define the TypeScript interface for your catalogue item

export default function Shop() {

    return (
        //Categories
        
        // the screen crashed when i tried to give the ScrollView a style to hide the white space
        // i (jaden le) would have replaced it but the other person (LightNCrescent) added it
        // and i assume that they need specifically ScrollView in lieu of View for something
        <ScrollView> 
            <View style={styles.header}>

                <Image
                    source={require('../../assets/images/back_icon.png')}
                    style={styles.icon}
                    resizeMode="contain"
                />
                <TouchableOpacity style={styles.button} activeOpacity={0.4} 
                    onPress={() => router.push({ pathname: '/(tabs)/homepage' })}/>

                <View style={styles.valueContainer}>
                    <Text style={[styles.valueText, {fontSize: 20}]}>Gold: 0</Text>
                </View>

            </View>
            <View style={styles.shopTab}>
                <Text style={styles.titleText}> Categories </Text>
                <View style={styles.buttonColumn}> 
                    <Button title="Hats"
                        onPress = {() => router.push('/hats')}
                    />
                    <Button title="Accessories"
                        onPress = {() => router.push('/faceAcc')}
                    />
                    <Button title="Shirts"
                        onPress = {() => router.push('/shirts')}
                    />
                    <Button title="Backgrounds"
                        onPress = {() => router.push('/bgShop')}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row', 
        alignItems: 'flex-end', 
        width: width,
        height: height / 10,
        justifyContent: 'space-between',
        backgroundColor: '#275DAD',
        padding: 10,
        borderColor: '#275DAD',
    },
    icon: {
        width: width,
        height: height,
        position: 'absolute',
        top: 10,
    },
    button: {
        width: 50,
        height: 50,
        marginLeft: 10,
        // temporary border for visibility
        borderWidth: 3, 
        borderRadius: 25, 
        borderColor: "red", 
    },
    valueContainer: {
        justifyContent: 'center',
        width: 100,
        height: 40,
        backgroundColor: '#2f95dc',
        borderRadius: 10,
        margin: 5,
    },
    valueText: {
        padding: 5,
        fontWeight: 'bold',
    },

    titleText: {
        padding: 10,
        flex: 1,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    shopTab: {
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        // for some reson changing justifyContent isnt doing anything, no idea why
        width: width,
        height: 21 * height / 22,
        backgroundColor: '#5BC0EB',
        padding: 10,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    },
    buttonColumn: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 16,
        gap: 12,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#267FC7',
    },
});
