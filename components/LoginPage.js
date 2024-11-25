import React, { useEffect, useState } from "react"; 
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { auth } from "../firebase"; // Certifique-se de importar auth corretamente
import { signInWithEmailAndPassword } from "firebase/auth"; // Importar a função

export default function Login({ navigation, route }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        if (route?.params?.clearFields) {
            setEmail('');
            setSenha('');
        }
    }, [route?.params]);

    function logar() {
        signInWithEmailAndPassword(auth, email, senha)
            .then(userCredential => {
                const user = userCredential.user;

                if (!user.emailVerified) {
                    Alert.alert("Atenção", "Por favor, verifique seu e-mail antes de fazer login.");
                    return;
                }

                navigation.navigate('Routes', { email });
            })
            .catch(error => {
                Alert.alert("Erro", error.message);
            });
    }

    return (
        <View style={estilo.container}>
            <Text style={estilo.titulo}>Login</Text>
            <TextInput 
                style={estilo.inputTexto} 
                onChangeText={text => setEmail(text)} 
                placeholder="Digite o email." 
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput 
                style={estilo.inputTexto} 
                secureTextEntry={true} 
                onChangeText={text => setSenha(text)} 
                placeholder="Digite a senha." 
            />
            <TouchableOpacity style={estilo.botaoLogar} onPress={logar}> 
                <Text style={estilo.textoBotaoLogar}>Logar</Text>
            </TouchableOpacity>

            <View style={estilo.signView}>
                <Text style={estilo.txtSign}>Primeiro acesso e deseja realizar um cadastro?</Text>
                <TouchableOpacity style={estilo.btnSign} onPress={() => navigation.navigate('Signin')}>
                    <Text style={estilo.txtBtnSign}> Clique aqui</Text>
                </TouchableOpacity>
            </View>

            <View style={estilo.signView}>
                <Text style={estilo.txtSign}>Esqueceu a senha?</Text>
                <TouchableOpacity style={estilo.btnSign} onPress={() => navigation.navigate('ForgotPass')}>
                    <Text style={estilo.txtBtnSign}> Clique aqui</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    titulo: {
        fontSize: 50,
        marginBottom: 35,
        textAlign: 'center',
        color: 'white',
    },
    inputTexto: {
        bottom: 20,
        width: 300,
        height: 50,
        textAlign: 'center',
        backgroundColor: 'white',
        marginVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 25,
    },
    botaoLogar: {
        width: 150,
        height: 50,
        borderRadius: 10,
        backgroundColor: 'grey',
        top: 5,
    },
    textoBotaoLogar: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        padding: 7,
    },
    signView: {
        marginVertical: 15,
        alignItems: 'center',
    },
    txtSign: {
        color: 'white',
        fontSize: 16,
    },
    btnSign: {
        marginTop: 5,
    },
    txtBtnSign: {
        color: 'lightblue',
        fontSize: 16,
    },
});
