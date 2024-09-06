import React, { useEffect, useState } from 'react';
import { View, Button, Alert, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const HomeScreen = ({ route }) => {
    const [token, setToken] = useState(null);
    const [id, setId] = useState(null);
    const [apiData, setApiData] = useState(null); 

    useEffect(() => {
        const retrieveData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('authData');
                if (storedData) {
                    const { token, user } = JSON.parse(storedData);
                    setToken(token);
                    setId(user);  
                    console.log('Token and ID retrieved successfully:', user );
                } else {
                    console.log('No token and ID found in storage.');
                }
            } catch (e) {
                console.error('Failed to retrieve token and ID.', e);
            }
        };
        retrieveData();
    }, []);

    const ShowData = async () => {
      const url = `https://dev.dealershive.com/visitDealerProfile?id=${id}`;
  
      try {
          const response = await axios.get(url, {
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
              }
          });
  
          console.log('API Response:', response.data);
          setApiData(response.data); 
         
      } catch (error) {
          console.error('Something went wrong', error);
      }
  };
  
    return (
        <View style={styles.container}>
            <Button title="Show Data" onPress={ShowData} />
            {apiData && (
                <View style={styles.dataContainer}>
                    <Text style={styles.dataText}>API Data: {JSON.stringify(apiData, null, 2)}</Text>
                </View>
            )}
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
    dataContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    dataText: {
        fontSize: 16,
    },
});

export default HomeScreen;
