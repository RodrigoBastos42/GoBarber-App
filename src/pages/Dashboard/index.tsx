import React from 'react';
import { View, Button } from 'react-native'

import { useAuth } from '../../hooks/AuthContext';

const Dashboard: React.FC = () => {
    const { SignOut } = useAuth();
        return(
            <View>
                <Button title="Sair" onPress={SignOut} />
            </View>
        )
}

export default Dashboard;