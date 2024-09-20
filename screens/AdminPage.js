import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AdminPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Page</Text>
      <Text>Burada kitap ekleyebilirsiniz.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F4F2',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AdminPage;
