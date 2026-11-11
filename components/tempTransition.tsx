import { useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Transition() { 
    const [activePage, setActivePage] = useState(0);
    const slideAnim = useRef(new Animated.Value(0)).current;

    const gotoPage = (page: number) => {
        setActivePage(page);
        Animated.timing(slideAnim, {
            toValue: -page * width, 
            duration: 300, 
            useNativeDriver: true,
        }).start();
    };
    
    return (
        <View style={styles.viewport}>
            <Animated.View style={[
                styles.slider, { transform: [{ translateX: slideAnim }] }
            ]}>
                <View style={styles.page}>
                    <Text>Screen 1</Text>
                    <TouchableOpacity onPress={() => gotoPage(1)}>
                        <View style={styles.button}>
                            <Text>--{'\u003E'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.page}>
                    <Text>Screen 2</Text>
                    <TouchableOpacity onPress={() => gotoPage(0)}>
                        <View style={styles.button}>
                            <Text>{'\u003C'}--</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewport: {
        position: 'absolute',
        width: width, 
        flex: 1,
        overflow: 'hidden',
    },
    slider: {
        flexDirection: 'row',
        width: width * 2, 
        flex: 1,
    },
    page: {
        borderWidth: 5, // border's there so i can see where the views start & end
        width, flex: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 30, 
        height: 30, 
        borderRadius: 15, 
        backgroundColor: 'skyblue', 
        alignItems: 'center',
        justifyContent: 'center',
    }
});