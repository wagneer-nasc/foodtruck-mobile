import React from 'react'; 
import RoutesPrivate from './routes.private';
import RoutesNoPrivate from './routes.no.private';
import { useAuth } from '../auth/auth';
import { ActivityIndicator, View } from 'react-native';
 
const AuthRoutes: React.FC = () => {

    const { user, loading } = useAuth();
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#FFF" />
            </View>
        )
    } 
    return user ? <RoutesPrivate /> : <RoutesNoPrivate />
}
export default AuthRoutes;