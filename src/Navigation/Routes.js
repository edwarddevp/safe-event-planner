import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './AuthProvider';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

export const Routes = () => {
    const {user} = useContext(AuthContext);
    // const [initializing, setInitializing] = useState(true);

    // const onAuthStateChanged = (user) => {
    //     setUser(user);
    //     if (initializing)
    //         setInitializing(false);
    // };

    // useEffect(() => {
    //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //     return subscriber; // unsubscribe on unmount
    // }, []);

    // if (initializing)
    //     return null;

    return (
        <NavigationContainer>
            {user?.id? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};


