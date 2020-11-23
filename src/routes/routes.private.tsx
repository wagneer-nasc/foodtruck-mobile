import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateStore from '../pages/CreateStore';
import Dashboard from '../pages/Dashboard';
import StoreList from '../pages/StoreList';
import StoreDetails from '../pages/StoreDetails';

const Private = createStackNavigator();

const RoutesPrivate: React.FC = () => {
    return ( 
        <Private.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#7159c1' }
            }}
        >
            <Private.Screen name="StoreList" component={StoreList} />
            <Private.Screen name="Dashboard" component={Dashboard} />
            <Private.Screen name="CreateStore" component={CreateStore} />
            <Private.Screen name="StoreDetails" component={StoreDetails} />
        </Private.Navigator>

    )
}
export default RoutesPrivate;