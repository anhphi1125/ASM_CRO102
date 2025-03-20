import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Seach from './Searcch'
const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 0,
                    height: 60,
                    paddingTop: 10
                },
                headerShown: false,
            }}
        >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Image
                                source={require('../assets/icons/home.png')}
                                style={{ width: 24, height: 24 }}
                            />
                            {
                                focused && (
                                    <Text style={{width: 5, height: 5, backgroundColor: '#000000',
                                        borderRadius: 10,
                                        marginTop: 3
                                    }}></Text>
                                )
                            }
                        </View>
                    ),
                    tabBarLabel: () => null,
                }}
            />
            <Tab.Screen
                name='Search'
                component={Seach}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Image
                                source={require('../assets/icons/search.png')}
                                style={{ width: 24, height: 24 }}
                            />
                            {
                                focused && (
                                    <Text style={{width: 5, height: 5, backgroundColor: '#000000',
                                        borderRadius: 10,
                                        marginTop: 3
                                    }}></Text>
                                )
                            }
                        </View>
                    ),
                    tabBarLabel: () => null,
                }}
            />
            <Tab.Screen
                name='Bell'
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Image
                                source={require('../assets/icons/bell.png')}
                                style={{ width: 24, height: 24 }}
                            />
                            {
                                focused && (
                                    <Text style={{width: 5, height: 5, backgroundColor: '#000000',
                                        borderRadius: 10,
                                        marginTop: 3
                                    }}></Text>
                                )
                            }
                        </View>
                    ),
                    tabBarLabel: () => null,
                }}
            />
            <Tab.Screen
                name='User'
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Image
                                source={require('../assets/icons/user.png')}
                                style={{ width: 24, height: 24 }}
                            />
                            {
                                focused && (
                                    <Text style={{width: 5, height: 5, backgroundColor: '#000000',
                                        borderRadius: 10,
                                        marginTop: 3
                                    }}></Text>
                                )
                            }
                        </View>
                    ),
                    tabBarLabel: () => null,
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomNavigation

const styles = StyleSheet.create({})