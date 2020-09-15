import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const WeatherPage = ({ coords, address, weather }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coords - {coords ? `${coords.lat}, ${coords.lng}` : ''}</Text>
      <Text style={styles.text}>Address - {address ? address : ''}</Text>
      <Text style={styles.text}>Temperature - {weather ? `${Math.round((weather.temperature - 32) * 0.55)}` : ''} &#8451;</Text>
      <Text style={styles.text}>Wind speed - {weather ? `${weather.windSpeed} m/s` : ''}</Text>
      <Text style={styles.text}>Wind gust - {weather ? `${weather.windGust} m/s` : ''}</Text>
      <Text style={styles.text}>Humidity - {weather ? `${weather.humidity}%` : ''}</Text>
    </View>    
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60
  },
  text: {
    marginBottom: 30,
    color: '#FFF',
    fontSize: 18
  }
});