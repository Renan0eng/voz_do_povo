import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import '@/global.css';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { config } from '../gluestack-ui.config';

export const unstable_settings = {
  anchor: 'home/index',
};

function AppStack() {
  const { token, user } = useAuth();

  // Verifica o estado inicial de carregamento do token (AsyncStorage)
  if (token === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      {!token ? (
        // Se NÃO há token, mostra APENAS a tela de login
        <Stack.Screen
          name="auth/login" // Nome da sua rota de login (arquivo/pasta)
          // component={Login}
          options={{ headerShown: false }}
        />
      ) : (
        // Se HÁ token, mostra APENAS as rotas autenticadas (Home)
        <Stack.Screen
          name="home/index" // Nome da pasta que contém suas rotas protegidas
          options={{ headerShown: false }}
        />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <GluestackUIProvider config={config}>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <AppStack />
          <StatusBar style="auto" />
        </ThemeProvider>
      </GluestackUIProvider>
    </AuthProvider>
  );
}