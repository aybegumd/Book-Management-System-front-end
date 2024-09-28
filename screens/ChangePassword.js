import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

const ChangePassword = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = async () => {
    if (currentPassword === '' || newPassword === '') {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }

    try {
      
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      
     
      await updatePassword(user, newPassword);
      Alert.alert('Success', 'Password changed successfully!');
      navigation.goBack(); 
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          Alert.alert('Error', 'The current password is incorrect.');
          break;
        case 'auth/requires-recent-login':
          Alert.alert('Error', 'Please log in again to change your password.');
          break;
        default:
          Alert.alert('Error', error.message);
          break;
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <Button title="Change Password" onPress={handleChangePassword} color="#B68FB2" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F6F4F2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#B68FB2',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default ChangePassword;
