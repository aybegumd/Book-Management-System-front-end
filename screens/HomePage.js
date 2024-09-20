import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const HomePage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const auth = getAuth();
    
    const lowerCaseEmail = email.toLowerCase();

    signInWithEmailAndPassword(auth, lowerCaseEmail, password)
      .then(() => {
        // Başarılı giriş
        navigation.navigate('BookList');
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Giriş Hatası', 'Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyin.');
      });
  };

  const handleAdminLogin = () => {
    const adminUsername = 'Admin1';
    const adminPassword = '080502';

    if (email === adminUsername && password === adminPassword) {
      navigation.navigate('AdminPage');
    } else {
      Alert.alert('Admin Giriş Hatası', 'Admin kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyin.');
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/bookpic.png')} 
        style={styles.image} 
      />
      <Text style={styles.welcomeText}>Welcome!</Text>
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        autoCompleteType="email"
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
          <Text style={styles.buttonText}>User Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleAdminLogin}>
          <Text style={styles.buttonText}>Admin Login</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.registerText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F4F2',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#B68FB2',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: '#B68FB2',
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerText: {
    color: '#B68FB2',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default HomePage;
