import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Input from '../screens/inputScreen';
import Home from '../screens/homeScreen';
import Mapview from '../screens/mapScreen';
import Direction from '../screens/directionScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Input" component={Input} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Mapview" component={Mapview} />
                <Stack.Screen name="Direction" component={Direction} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


