import { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
    onAnimationComplete: () => void;
}

export default function SplashScreen({ onAnimationComplete }: SplashScreenProps) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const handleAnimationEnd = () => {
        if (onAnimationComplete) {
            onAnimationComplete();
        }
    };

    const splashScreenAnimation = () => {
        const fadeinTimeline = Animated.timing(fadeAnim,
            {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            });

        Animated.sequence([fadeinTimeline]).start(handleAnimationEnd);
    }

    useEffect(() => {
        splashScreenAnimation();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../assets/images/splashScreenLogo.png')}
                style={[styles.logo, { opacity: fadeAnim }]}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create
    ({
        container:
        {
            flex: 1,
            backgroundColor: '#FFC145',
            justifyContent: 'center',
            alignItems: 'center',
        },
        logo:
        {
            width: width * 1.5,
            height: width * 1.5,
        },
    });