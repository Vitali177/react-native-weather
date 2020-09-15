import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const WeatherPage = (props) => {
  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState(null);
  const [weather, setWeather] = useState(null);
  
  async function getWeather() {
    const query = 'https://api.darksky.net/forecast/';
    const secretKey = 'e5b418752262d6f5440bb6d510002282';
    const geo = `/${coords.lat},${coords.lng}?lang=en`;

    const url = query + secretKey + geo;

    const res = await fetch(url);
    const data = await res.json();

    setWeather(data.currently);
  }

  if (!weather && coords) {
    getWeather();
  }

  async function success(pos) {
    setCoords({
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    });

    const apiKey = '611a1328-1344-4ccd-8e76-3d6b632071a9';
    const url = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${apiKey}&geocode=${pos.coords.longitude},${pos.coords.latitude}`;
  
    const res = await fetch(url);
    const data = await res.json();
    
    setAddress(data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted);
  }

  if (!coords) {
    navigator.geolocation.getCurrentPosition(success, (err) => {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    });
  }

  return (
    <View>
      <Text style={styles.coords}>Coords - {coords ? `${coords.lat}, ${coords.lng}` : ''}</Text>
      <Text style={styles.coords}>Address - {address ? address : ''}</Text>
      <Text style={styles.coords}>Temperature - {weather ? `${Math.round((weather.temperature - 32) * 0.55)} C` : ''}</Text>
      <Text style={styles.coords}>Wind speed - {weather ? `${weather.windSpeed} m/s` : ''}</Text>
      <Text style={styles.coords}>Wind gust - {weather ? `${weather.windGust} m/s` : ''}</Text>
      <Text style={styles.coords}>Humidity - {weather ? weather.humidity : ''}</Text>
    </View>    
  );
}

const styles = StyleSheet.create({
  coords: {
    color: '#FFF',
    fontSize: 18,
    marginTop: 30
  }
});