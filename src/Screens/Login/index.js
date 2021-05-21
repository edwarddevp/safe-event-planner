import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback, Platform} from 'react-native';
import {Button, Input, Text, Icon, Spinner} from '@ui-kitten/components';
import Toast from 'react-native-toast-message';
import {ImageOverlay} from '../../Shared/image-overlay.component';
import {EmailIcon} from '../../Shared/icons';
import {KeyboardAvoidingView} from '../../Shared/3rd-party';
import {AuthContext} from '../../Navigation/AuthProvider';
import {useForm, Controller} from "react-hook-form";
import {authBgImage, emailRegex} from "../../lib/constants";
import { StatusBar } from 'react-native';

export const LoginScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const image = {uri: authBgImage};
  const {login} = useContext(AuthContext);

  useEffect(() => {
    if(Platform.OS === 'android') {
      StatusBar.setBarStyle('light-content');
    }
    return () => {
      StatusBar.setBarStyle('dark-content');
    }
  }, []);

  const {control, handleSubmit, formState: {errors} } = useForm({
    defaultValues: {
      email:'test8@email.com',
      password: 'asd123'
    },
  });

  const onSubmit = async ({email, password}) => {
    setLoading(true);
    const response = await login(email, password);

    if (!response?.success) {
      setLoading(false);
      Toast.show({
        text1:`Error ${response?.errors?.error?.[0]}`,
        type:'error'
    });
    }
  };

  const onSignUpButtonPress = () => {
    navigation && navigation.navigate('Signup');
  };

  const renderPasswordIcon = (props) => (
    <TouchableWithoutFeedback onPress={()=>setPasswordVisible(!passwordVisible)}>
      <Icon {...props} name={passwordVisible ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );

  return (
    <KeyboardAvoidingView>
      <ImageOverlay
        style={styles.container}
        source={image}
      >
        <View style={styles.headerContainer}>
          <Text
            category='h1'
            status='control'>
            Hello
          </Text>
          <Text
            style={styles.signInLabel}
            category='s1'
            status='control'>
            Sign in to your account
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Controller
            control={control}
            render={({fieldState:{isTouched},field: {onChange, onBlur, value}}) => (
              <Input
                status={(errors.email && isTouched) ? 'danger' : 'control'}
                placeholder='Email'
                accessoryRight={EmailIcon}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="email"
            rules={{required: true, pattern: emailRegex}}
            defaultValue=""
          />
          {
            errors.email?.type === 'required' ?
              <Text status='danger'>This is required.</Text> :
              errors.email?.type === 'pattern' &&
              <Text status='danger'>Invalid Email.</Text>
          }
          <Controller
            control={control}
            render={({fieldState:{isTouched},field: {onChange, onBlur, value}}) => (
              <Input
                style={styles.passwordInput}
                status={(errors.password && isTouched) ? 'danger' : 'control'}
                placeholder='Password'
                accessoryRight={renderPasswordIcon}
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
                secureTextEntry={!passwordVisible}
              />
            )}
            name="password"
            rules={{required: true}}
            defaultValue=""
          />
          {errors.password && <Text status='danger'>This is required.</Text>}
        </View>
        <Button
          type='submit'
          style={styles.signInButton}
          size='giant'
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        >
          {
            loading ?
              <View style={styles.indicator}>
                <Spinner size='small' status='control'/>
              </View> :
              'SIGN IN'
          }

        </Button>

        <Button
          style={styles.signUpButton}
          appearance='ghost'
          status='control'
          onPress={onSignUpButtonPress}>
          Don't have an account? Sign Up
        </Button>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    minHeight: 216,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  passwordInput: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  signUpButton: {
    marginVertical: 12,
  },
  socialAuthContainer: {
    marginTop: 32,
  },
  socialAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 16,
  },
});