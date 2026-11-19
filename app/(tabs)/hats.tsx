import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const { width, height } = Dimensions.get('window');

// import React from "react";
import { router } from "expo-router";

// NOTE: BUTTONS DO NOT DO ANYTHING CURRENTLY
export default function hats() {
    return (
        <View style={styles.container}>

            <View style={styles.header}>

                <Image
                    source={require('../../assets/images/back_icon.png')}
                    style={styles.icon}
                    resizeMode="contain"
                />
                <TouchableOpacity style={styles.button} activeOpacity={0.4} 
                    onPress={() => router.push({ pathname: '/(tabs)/Shop' })}/>

                <View style={styles.valueContainer}>
                    <Text style={[styles.valueText, {fontSize: 20}]}>Gold: 0</Text>
                </View>

            </View>

            <View style={styles.shopTab}>

                <Text style={styles.titleText}>
                    Hats
                </Text>

                <View style={styles.items}>

                    <View style={styles.itemSpace}>
                        <Image 
                            source={require('../../assets/images/carp_default.png')}
                            style={styles.itemImage}
                            resizeMode="contain"
                        />
                        <Image // NOTE: the cosmetics are mis-aligned with the carp because of how the images are formatted
                            source={require('../../assets/images/assets_accessory_bow.png')}
                            style={[styles.itemImage, {left: -62}]}
                            resizeMode="contain"
                        />
                        <TouchableOpacity style={styles.itemButton} activeOpacity={0.4}>
                            <Text style={styles.valueText}>100 Gold</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.itemSpace}>
                        <Image 
                            source={require('../../assets/images/carp_default.png')}
                            style={styles.itemImage}
                            resizeMode="contain"
                        />
                        <Image // so i had to nudge them a little so they would fit
                            source={require('../../assets/images/assets_accessory_clown.png')}
                            style={[styles.itemImage, {top: -40}]}
                            resizeMode="contain"
                        />
                        <TouchableOpacity style={styles.itemButton} activeOpacity={0.4}>
                            <Text style={styles.valueText}>200 Gold</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.itemSpace}></View>

                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        backgroundColor: '#275DAD',
        flex: 1,
    },

    header: {
        flexDirection: 'row', 
        alignItems: 'flex-end', 
        width: width,
        height: height / 10,
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        padding: 10,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
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
        justifyContent: 'space-between', 
        // for some reson changing justifyContent isnt doing anything
        // so i have to modify the heights of shopTab & items in weird specific ways  
        // to configure the spacing between the text & box
        width: width,
        height: 21 * height / 22,
        backgroundColor: '#5BC0EB',
        padding: 10,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    },
    items: {
        flexDirection: 'row', 
        alignItems: 'flex-start', 
        justifyContent: 'space-between',
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
        width: 100,
        height: 140,
        borderColor: '#2f95dc',
        borderWidth: 2,
        padding: 5,
        borderRadius: 10,
    },
    itemImage: {
        flex: 1, 
        width: 200, 
        height: 200, 
        position: 'absolute', 
        top: -50, 
        left: -52,
    },
    itemButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 30,
        backgroundColor: '#2f95dc',
        borderRadius: 10,
    },
})