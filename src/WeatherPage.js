import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const WeatherPage = ({ coords, address, weather }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.coords}>Coords - {coords ? `${coords.lat}, ${coords.lng}` : ''}</Text>
      <Text style={styles.coords}>Address - {address ? address : ''}</Text>
      <Text style={styles.coords}>Temperature - {weather ? `${Math.round((weather.temperature - 32) * 0.55)}` : ''} &#8451;</Text>
      <Text style={styles.coords}>Wind speed - {weather ? `${weather.windSpeed} m/s` : ''}</Text>
      <Text style={styles.coords}>Wind gust - {weather ? `${weather.windGust} m/s` : ''}</Text>
      <Text style={styles.coords}>Humidity - {weather ? `${weather.humidity}%` : ''}</Text>
    </View>    
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60
  },
  coords: {
    marginBottom: 30,
    color: '#FFF',
    fontSize: 18
  }
});