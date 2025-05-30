import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Regular from './Regular';
import Login from './Login';
import Logout from './Logout';
import Home from './Home';
import BottomNavigation from './BottomNavigation';
import Detail from './Detail';
import Search from './Search';
import Cart from './Cart';
import Payment from './Payment';

const Stack = createStackNavigator();

export default function AppNavigation() {
    return (

        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
            <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
            <Stack.Screen name='Bottom' component={BottomNavigation} options={{headerShown: false}}/>
            <Stack.Screen name='Regular' component={Regular} options={{headerShown: false}}/>
            <Stack.Screen name='Cart' component={Cart} options={{headerShown: false}}/>
            <Stack.Screen name='Payment' component={Payment} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};