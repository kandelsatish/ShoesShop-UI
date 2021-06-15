import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native'
import { Octicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from '../screen/HomeScreen';
import { TouchableOpacityBase } from 'react-native'

const Stack = createStackNavigator();
export const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    title: "SHOES SELECTOR",
                    headerTintColor: 'grey',
                    headerLeft: () => (<TouchableOpacity>
                        <Octicons name="three-bars" size={24} color="black" style={{marginLeft:40}}/>
                    </TouchableOpacity>),
                    headerRight: () => (<TouchableOpacity>
                        <FontAwesome name="search" size={24} color="black"  style={{marginRight:40}}/>
                    </TouchableOpacity>)
                }}
            />
        </Stack.Navigator>
    )
}
