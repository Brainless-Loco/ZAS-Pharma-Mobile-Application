import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Appearance } from 'react-native';

export default function Layout() {
  useEffect(() => Appearance.setColorScheme('light'),
  [])
  return (
    <Stack
      screenOptions={{
        headerShown:false
      }}>
      <Stack.Screen name="(tabs)" options={{}} />
    </Stack>
  );
}
