import React, { useState } from 'react';
import { View, TextInput, Button, ActivityIndicator, StyleSheet, Alert, Text } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // State variable for error message

  const handleLogin = async () => {
    setLoading(true);
    setError(''); // Reset error message before making the request
    try {
      // Construct the URL for the POST request
      const url = 'https://dev.dealershive.com/login_with_email';

      // Make the POST request using Axios
      const response = await axios.post(url, {
        email,
        passcode: "",
        password: "",
        fcm_token: "adfad56f47a6s47dg47asd867g86a786gf47a86d47gf867s86d7g86asd786f74d867f867sd86f7",
        timezone: "-300",
        type: "login",
        phone: 0
      });

      // Log the data to the console
      console.log('API Response:', response.data);

      // Check if the status is true
      if (response.data.status) {
        // Navigate to OTPScreen.js
        navigation.navigate('OTPScreen', { email }); // Passing email as a parameter if needed
      } else {
        setError(response.data.message || 'An error occurred. Please try again.');
      }

    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {/* Show error message below the email input field */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <View style={styles.buttonContainer}>
        <Button title={loading ? '' : 'Login'} onPress={handleLogin} disabled={loading} />
        {loading && <ActivityIndicator size="small" color="blue" style={styles.loadingIndicator} />}
      </View>
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
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5, // Reduced margin to make space for error message
  },
  buttonContainer: {
    position: 'relative',
    width: '80%',
  },
  loadingIndicator: {
    position: 'absolute',
    right: 100,
    top: 14,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    width: '80%',
    textAlign: 'center',
  },
});

export default LoginScreen;
