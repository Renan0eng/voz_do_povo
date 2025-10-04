import { AlertCircleIcon, EyeIcon, EyeOffIcon, Input, InputField } from '@gluestack-ui/themed';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export interface GenericInputProps {
    label: string;
    value: string;
    onChange: (text: string) => void;
    placeholder?: string;
    type?: 'text' | 'password';
    isRequired?: boolean;
    helperText?: string;
    validate?: (value: string) => string | null;
}

export const GenericInput: React.FC<GenericInputProps> = ({
    label,
    value,
    onChange,
    placeholder,
    type = 'text',
    isRequired = false,
    helperText,
    validate,
}) => {
    const [error, setError] = React.useState<string | null>(null);
    const [visible, setVisible] = React.useState(false);

    const handleChange = (text: string) => {
        onChange(text);
        if (validate) {
            const validationResult = validate(text);
            setError(validationResult);
        }
    };

    const toggleVisibility = () => setVisible(!visible);

    return (
        <View className="w-full mb-4">

            {/* Label */}
            <Text className="text-gray-700 font-medium mb-1 pl-3">
                {label} {isRequired && <Text className="text-red-500">*</Text>}
            </Text>

            {/* Input */}
            <Input className={`relative px-2 py-1 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-full`}>
                <InputField
                    type={type === 'password' ? (visible ? 'text' : 'password') : type}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={handleChange}
                    className="px-3 py-2 text-gray-900 pr-10" // pr-10 para dar espaço pro ícone
                />

                {/* Ícone de visibilidade */}
                {type === 'password' && (
                    <TouchableOpacity
                        onPress={toggleVisibility}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                        {visible ? (
                            <EyeIcon height={20} width={20} />
                        ) : (
                            <EyeOffIcon height={20} width={20} />
                        )}
                    </TouchableOpacity>
                )}
            </Input>

            {/* Helper Text */}
            {helperText && !error && <Text className="text-gray-400 text-sm mt-1">{helperText}</Text>}

            {/* Error Text */}
            {error && (
                <View className="flex flex-row items-center mt-1">
                    <AlertCircleIcon className="text-red-500 mr-1" />
                    <Text className="text-red-500 text-sm">{error}</Text>
                </View>
            )}
        </View>
    );
};
