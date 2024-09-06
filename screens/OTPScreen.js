import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const OTPScreen = ({ route }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpInputs = useRef([]);
  const navigation = useNavigation();

  const handleOTPChange = (value, index) => {
    const otpCopy = [...otp];
    otpCopy[index] = value;
    setOtp(otpCopy);

    if (value && index < otpInputs.current.length - 1) {
      otpInputs.current[index + 1].focus();
    } else if (!value && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  const storeToken = async (token, user) => {
    try {
      const data = { token, user };
      await AsyncStorage.setItem('authData', JSON.stringify(data));
      console.log('Token and ID stored successfully:', data);
    } catch (e) {
      console.error('Failed to store the token and ID.', e);
    }
  };

  const handleVerify = async () => {
    const otpNumber = otp.join('');
    const numericOtp = Number(otpNumber);

    const url = 'https://dev.dealershive.com/login_with_email';
    try {
        const response = await axios.post(url, {
            email,
            passcode: numericOtp,
            fcm_token: "adfad56f47a6s47dg47asd867g86a786gf47a86d47gf867s86d7g86asd786f74d867f867sd86f7",
            timezone: "-300",
            type: "verify",
            phone: 0,
        });

        console.log('Full API Response:', response.data);

        if (response.data.status) {
            Alert.alert('Success', response.data.message || 'OTP verified successfully.');
            const { token, user } = response.data;

            console.log('Token:', token);
            console.log('Received ID:', user);

            await storeToken(token, user.id);

            navigation.navigate('Home', { token, user });
        } else {
            Alert.alert('Verification Failed', response.data.message || 'An error occurred. Please try again.');
        }

    } catch (error) {
        console.error('Error during OTP verification:', error);
        Alert.alert('Error', 'An error occurred during OTP verification. Please try again.');
    }
};

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter OTP</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            value={digit}
            onChangeText={(value) => handleOTPChange(value, index)}
            keyboardType='phone-pad'
            maxLength={1}
            ref={(ref) => otpInputs.current[index] = ref}
          />
        ))}
      </View>
      <Button title="Verify" onPress={handleVerify} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default OTPScreen;
