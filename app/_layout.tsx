import { TasksProvider } from '@/context/TasksContext';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import CustomSplashScreen from '@/components/CustomSplashScreen';
import { useColorScheme } from '@/components/useColorScheme';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [showCustomSplash, setShowCustomSplash] = useState(true);

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (showCustomSplash) {
    return (
      <CustomSplashScreen
        onAnimationComplete={() => setShowCustomSplash(false)}
      />
    );
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <TasksProvider>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >

          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="taskManagerScreen"
            />
            <Stack.Screen
              name="tasks-manager"
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="task-editor"
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="modal"
              options={{ presentation: 'modal' }}
            />
          </Stack>
        </ThemeProvider>
      </TasksProvider>
    </SafeAreaProvider>
  );
}

