import { GenericInput } from '@/components/my-components/generic-input';
import { useAuth } from '@/hooks/use-auth';
import { Button, Text, View, VStack } from '@gluestack-ui/themed';
import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();
    const { control, handleSubmit } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            await login(data.email, data.password);
            console.log('Login bem-sucedido');
            router.replace('/home'); 
        } catch (error) {
            console.error('Erro ao logar:', error);
            alert('Login inválido');
        }
    };

    return (
        <VStack className="p-4 space-y-0 bg-white w-full h-full pt-16">
            <View className="mb-8 w-full h-1/3 items-center justify-center">
                <Image
                    source={require('assets/images/logo.svg')}
                    style={{ width: '90%', height: '100%' }}
                    resizeMode="contain"
                />
            </View>

            <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => (
                    <GenericInput
                        label="Email"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Digite seu email"
                        type="text"
                        validate={() => fieldState.error?.message ?? null}
                    />
                )}
            />

            <Controller
                control={control}
                name="password"
                render={({ field, fieldState }) => (
                    <GenericInput
                        label="Senha"
                        value={field.value}
                        onChange={field.onChange}
                        type="password"
                        placeholder="Digite sua senha"
                        helperText="Deve ter pelo menos 6 caracteres."
                        validate={() => fieldState.error?.message ?? null}
                    />
                )}
            />

            <Button
                onPress={handleSubmit(onSubmit)}
                className="bg-blue-500 rounded-full px-4 py-3 mt-4 w-full"
            >
                <Text className="text-white text-center text-2xl font-bold">Entrar</Text>
            </Button>
        </VStack>
    );
}
