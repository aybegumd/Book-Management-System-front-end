import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const auth = getAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
        } else {
          Alert.alert('Error', 'User information not found.');
        }
      }
    };

    fetchUserData();
  }, [auth]);

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Yes", onPress: async () => {
            try {
              await signOut(auth);
              navigation.navigate('Home'); 
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          }
        }
      ]
    );
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword'); 
  };

  if (!userInfo) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>First Name: <Text style={styles.value}>{userInfo.firstName}</Text></Text>
        <Text style={styles.label}>Last Name: <Text style={styles.value}>{userInfo.lastName}</Text></Text>
        <Text style={styles.label}>Email: <Text style={styles.value}>{userInfo.email}</Text></Text>
        <Text style={styles.label}>Membership Date: <Text style={styles.value}>{userInfo.createdAt.toDate().toLocaleDateString()}</Text></Text>
      </View>

      <Button title="Change Password" onPress={handleChangePassword} color="#B68FB2" />
      
      <View style={styles.logoutContainer}>
        <Button title="Log Out" onPress={handleLogout} color="#FF5733" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#F6F4F2',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#B68FB2',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  value: {
    fontWeight: 'bold',
  },
  logoutContainer: {
    marginTop: 20,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});

export default UserProfile;

