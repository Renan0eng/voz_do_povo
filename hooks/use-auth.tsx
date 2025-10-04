import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

//     {
//         "idUser": "cmfy98mom0000f8d08ea1y0ep",
//         "email": "maria.souza@email.com",
//         "name": "Maria Souza",
//         "active": true,
//         "createdAt": "2025-09-24T17:25:14.292Z",
//         "updatedAt": "2025-10-02T15:34:48.172Z",
//         "roleId": null
//     }

type User = {
  idUser: string;
  email: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  roleId: string | null;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      const savedToken = await AsyncStorage.getItem("authToken");
      const savedUser = await AsyncStorage.getItem("authUser");
      if (savedToken && savedUser) {
        // Valida o token no backend
        try {
          const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/validate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: savedToken }),
          });

          if (response.ok) {
            console.log("Token validado com sucesso");
            const data = await response.json();
            if (data.valid) {
              setToken(savedToken);
              setUser(JSON.parse(savedUser));
            } else {
              // Token inválido
              await AsyncStorage.removeItem("authToken");
              await AsyncStorage.removeItem("authUser");
              setToken(null);
              setUser(null);
              console.log("Token inválido, redirecionando para login");
              router.replace("/auth/login");
            }
          } else {
            router.replace("/auth/login");
            throw new Error("Falha ao validar token");
          }
        } catch (err) {
          console.error("Erro validando token:", err);
          await AsyncStorage.removeItem("authToken");
          await AsyncStorage.removeItem("authUser");
          setToken(null);
          setUser(null);
        }
      }
    };
    loadSession();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setToken(data.access_token);
      setUser(data.user);

      await AsyncStorage.setItem("authToken", data.access_token);
      await AsyncStorage.setItem("authUser", JSON.stringify(data.user));
    } else {
      const errText = await response.text();
      console.error("Erro login:", errText);
      throw new Error("Login inválido");
    }
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("authUser");
    // redirecionar para a tela de login pode ser feito no componente que chama logout
    console.log("Logout realizado com sucesso");
    router.replace("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
