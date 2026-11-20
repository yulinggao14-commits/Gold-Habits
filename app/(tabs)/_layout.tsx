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
      
      <Tabs.Screen // rearrangeed Tabs.Screens past this so that screens are in order of 
        name="mainmenuName" // how you would access them
        options={{ // main menu name --> check-in --> homepage --> other buttons
          title: 'Main Menu Name', // index moved to bottom
          headerShown: false,
          tabBarStyle: { display: 'none' }, // Hide the tab bar for this screen
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
      <Tabs.Screen
        name="mainmenuCheckIn"
        options={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
          // href: null, (unsure what this does but it makes the name screen unable to forward to it)
        }} />
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
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }} 
      />
      
      <Tabs.Screen
        name="task-manager"
      />

      <Tabs.Screen 
        name="dressup"
        options={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen 
        name="reward"
        options={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen 
        name="background"
        options={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      />

      <Tabs.Screen 
        name="Shop"
        options={{
          title: 'Shop',
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="dressup"
        options={{
          title: 'Dress Up',
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="hats"
        options={{
          title: 'Hats',
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="faceAcc"
        options={{
          title: 'Accessories',
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="shirts"
        options={{
          title: 'Shirts',
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="bgShop"
        options={{
          title: 'Backgrounds',
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      />

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
    </Tabs>
  );
}
