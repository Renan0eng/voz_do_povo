import { useAuth } from '@/hooks/use-auth';
import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
    // Dados de exemplo
    // const chamados = [
    //     { id: 1, image: require('assets/images/call1.jpg') },
    //     { id: 2, image: require('assets/images/call2.jpg') },
    //     { id: 3, image: require('assets/images/call3.jpg') },
    //     { id: 4, image: require('assets/images/call4.jpg') },
    //     { id: 5, image: require('assets/images/call5.jpg') },
    //     { id: 6, image: require('assets/images/call6.jpg') },
    // ];

    // const pedidos = [
    //     { id: 1, image: require('assets/images/pedido1.jpg'), title: 'Queda de árvore rua xxx', date: '11/09/2035' },
    //     { id: 2, image: require('assets/images/pedido2.jpg'), title: 'Queda de árvore rua xxx', date: '11/09/2035' },
    //     { id: 3, image: require('assets/images/pedido3.jpg'), title: 'Acidente BR 277', date: '01/09/2035' },
    // ];

    
    const { logout, user } = useAuth();
    const handleLogout = () => {
        try {
            console.log("Iniciando logout...");
            logout();
        } catch (error) {
            console.error("Erro durante logout:", error);
        }
    };

    return (
        <ScrollView className="bg-white p-4 pt-16" showsVerticalScrollIndicator={false}>
            {/* btn log out */}
            <TouchableOpacity className="bg-red-500 p-2 rounded-full" onPress={handleLogout}>
                <Text className="text-white">Sair</Text>
            </TouchableOpacity>

            {/* dados do usuário */}
            {user && (
                <View className="my-4 p-4 bg-gray-100 rounded-lg w-full">
                    <Text className="text-gray-700">Logado como:{user.name}</Text>
                    <Text className="text-gray-900 font-bold">{user.email}</Text>
                    <Text className="text-gray-600">Função: {user.roleId}</Text>
                </View>
            )}
            {/* Header */}
            <View className="flex-row justify-between items-center mb-6 w-full rounded-full py-2 px-4 shadow-md elevation-md bg-white">
                <Image source={require('assets/images/logo_p.svg')} style={{ width: 64, height: 50 }} />
                {/* <Image source={require('assets/images/avatar.png')} style={{ width: 40, height: 40, borderRadius: 20 }} /> */}
            </View>

            {/* Chamados do Cidadão */}
            <Text className="text-blue-700 font-bold text-lg mb-2">Chamados do Cidadão</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
                {/* {chamados.map((item) => (
                    <View key={item.id} className="w-24 h-24 mr-2 rounded-lg overflow-hidden bg-gray-200">
                        <Image source={item.image} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                    </View>
                ))} */}
                <TouchableOpacity className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-lg">
                    <Text className="text-blue-500">Ver Todos →</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Pedidos da Comunidade */}
            <Text className="text-blue-700 font-bold text-lg mb-2">Pedidos da Comunidade</Text>
            <View className="flex-row flex-wrap justify-between mb-6">
                {/* {pedidos.map((item) => (
                    <View key={item.id} className="w-[48%] h-40 mb-2 rounded-lg overflow-hidden bg-gray-200">
                        <Image source={item.image} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                        <View className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-1">
                            <Text className="text-white text-sm">{item.title}</Text>
                            <Text className="text-gray-200 text-xs">{item.date}</Text>
                        </View>
                    </View>
                ))} */}
                <TouchableOpacity className="w-[48%] h-40 flex items-center justify-center bg-gray-100 rounded-lg">
                    <Text className="text-blue-500 text-lg">Ver Todos →</Text>
                </TouchableOpacity>
            </View>

            {/* Votações Abertas */}
            <Text className="text-blue-700 font-bold text-lg mb-2">Votações Abertas</Text>
            <View className="w-full h-40 rounded-lg overflow-hidden bg-gray-200 mb-6">
                {/* <Image source={require('assets/images/votacao.jpg')} style={{ width: '100%', height: '100%' }} resizeMode="cover" /> */}
            </View>

        </ScrollView>
    );
}
