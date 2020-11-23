import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'; 
import SignIn from '../pages/SingIn';
import SignUp from '../pages/SingUp'; 
import StoreList from '../pages/StoreList';
import StoreDetails from '../pages/StoreDetails';
 

const NoPrivate = createStackNavigator();

const RoutesNoPrivate: React.FC = () => {
    return ( 
        <NoPrivate.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#7159c1' }
            }}
        >
            <NoPrivate.Screen name="StoreList" component={StoreList} />
            <NoPrivate.Screen name="SignIn" component={SignIn} />
            <NoPrivate.Screen name="SignUp" component={SignUp} /> 
            <NoPrivate.Screen name="StoreDetails" component={StoreDetails} />
           
           
        </NoPrivate.Navigator>

    )
}
export default RoutesNoPrivate;