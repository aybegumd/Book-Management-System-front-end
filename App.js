import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './screens/HomePage';
import BookList from './screens/BookList';
import BookDetail from './screens/BookDetails';
import SignUp from './screens/SignUp'; 
import AdminPage from './screens/AdminPage'; 

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomePage} 
          options={{ title: 'Home' }}
        />
        <Stack.Screen 
          name="BookList" 
          component={BookList} 
          options={{ title: 'Book List' }}
        />
        <Stack.Screen 
          name="BookDetail" 
          component={BookDetail} 
          options={{ title: 'Book Detail' }}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUp} 
          options={{ title: 'Üye Ol' }} // Başlık
        />
         <Stack.Screen 
          name="AdminPage" 
          component={AdminPage} 
          options={{ title: 'Admin Page' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
