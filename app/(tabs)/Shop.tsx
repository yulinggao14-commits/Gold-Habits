import { Href, router } from 'expo-router';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const { width, height } = Dimensions.get('window');
// import React from "react";
// import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

// 1. Define the TypeScript interface for your catalogue item

const handleContinue = (tabName: Href) => {
  router.push(tabName);
}

export default function Shop() {

    return (
        //Categories

        <ScrollView style={styles.container}>
            <View style={styles.header}>

                <Image
                    source={require('../../assets/images/back_icon.png')}
                    style={styles.icon}
                    resizeMode="contain"
                />
                <TouchableOpacity style={styles.button} activeOpacity={0.4}
                    onPress={ () => handleContinue('/homepage') } />

                <View style={styles.valueContainer}>
                    <Text style={[styles.valueText, { fontSize: 20 }]}>Gold: 0</Text>
                </View>

            </View>

            <View style={styles.shopTab}>
                <Text style={styles.titleText}> Categories </Text>
                <View style={styles.items}>
                
                    <TouchableOpacity style={styles.itemSpace}
                        onPress={ () => handleContinue('/hats') }>
                        <Image
                            source={require('../../assets/images/carp_default.png')}
                            style={styles.itemImage}
                            resizeMode="contain"
                        />
                        <Image
                            source={require('../../assets/images/assets_accessory_bow.png')}
                            style={[styles.itemImage, { left: -65 }]}
                            resizeMode="contain"
                        />
                        <Text style={styles.valueText}>Hats</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemSpace}
                        onPress={ () => handleContinue('/faceAcc') }>
                        <View style={styles.placeholder}>
                            <Text style={styles.valueText}>PLACE HOLDER</Text>
                        </View>
                        <Text style={styles.valueText}>Accessories</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemSpace}
                        onPress={ () => handleContinue('/shirts') }>
                        <View style={styles.placeholder}>
                            <Text style={styles.valueText}>PLACE HOLDER</Text>
                        </View>
                        <Text style={styles.valueText}>Shirts</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.itemSpace}
                        onPress={ () => handleContinue('/bgShop') }>
                        <View style={[styles.background, {backgroundColor: '#cb74e6'}]}/>
                        <Image
                            source={require('../../assets/images/carp_default.png')}
                            style={styles.itemImage}
                            resizeMode="contain"
                        />
                        <Text style={styles.valueText}>Backgrounds</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#267FC7',
    },
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
        top: 5,
        left: -2,
    },
    button: {
        width: 50,
        height: 50,
        marginLeft: 10,
        // borderWidth: 3,
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
        fontSize: 20,
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
        justifyContent: 'space-between',
        width: width,
        height: 21 * height / 22,
        backgroundColor: '#5BC0EB',
        padding: 10,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    },
    items: {
        flexDirection: 'row',
        alignContent: 'space-around',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        width: 9 * width / 10,
        height: 17 * height / 20,
        borderColor: '#2f95dc',
        borderWidth: 2,
        padding: 10,
        rowGap: 15,
        borderRadius: 10,
    },
    itemSpace: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: 150,
        height: 300,
        borderColor: '#2f95dc',
        borderWidth: 2,
        padding: 5,
        borderRadius: 10,
    },
    itemImage: {
        flex: 1,
        width: 250,
        height: 250,
        position: 'absolute',
        top: 0,
        left: -55,
    },
    placeholder: {
        position: 'absolute',
        top: 80,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 80,
        backgroundColor: '#2f95dc',
        borderRadius: 10,
    },
    background: {
        flex: 1,
        width: 140,
        height: 140,
        position: 'absolute',
        top: 50,
        borderRadius: 10,
    },

    buttonColumn: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 16,
        gap: 12,
    },
});
