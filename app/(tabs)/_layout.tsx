import { Link, Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { Pressable } from 'react-native';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: 'chevron.left.forwardslash.chevron.right',
                android: 'code',
                web: 'code',
              }}
              tintColor={color}
              size={28}
            />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable style={{ marginRight: 15 }}>
                {({ pressed }) => (
                  <SymbolView
                    name={{ ios: 'info.circle', android: 'info', web: 'info' }}
                    size={25}
                    tintColor={Colors[colorScheme].text}
                    style={{ opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: 'chevron.left.forwardslash.chevron.right',
                android: 'code',
                web: 'code',
              }}
              tintColor={color}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen // NOTE: i made my changes based on a version of main with the mainmenu screen,
        name="mainmenu" // but the mainmenu & CustomSplashScreen files weren't transferred 
        options={{ // when i switched from a main branch to the feature/homepage branch
          title: 'Main Menu', // hopefully you can just insert the two files back in and it'll work fine
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: 'chevron.left.forwardslash.chevron.right',
                android: 'code',
                web: 'code',
              }}
              tintColor={color}
              size={28}
            />
          ),
          headerShown: false
        }}
        />
        <Tabs.Screen
        name="homepage"
        options={{
          title: 'Home Page',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: 'chevron.left.forwardslash.chevron.right',
                android: 'code',
                web: 'code',
              }}
              tintColor={color}
              size={28}
            />
          ),
          headerShown: false
        }}
      />
    </Tabs>
  );
}
