import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { TabBar } from './src/TabBar';
import { WeatherPage } from './src/WeatherPage';
import { HistoryPage } from './src/HistoryPage';

export default function App() { 
  const [coords, setCoords] = useState(null);
  const [address, setAddress] = useState(null);
  const [weather, setWeather] = useState(null); 
  const [history, setHistory] = useState([{
    "apparentTemperature": 69.28,
    "time": 1600169518,
  },
  {
    "apparentTemperature": 79.28,
    "time": 1600169777,
  },
  {
    "apparentTemperature": 59.28,
    "time": 1600169707,
  },
  {
    "apparentTemperature": 49.28,
    "time": 1600169757,
  },
  {
    "apparentTemperature": 79.28,
    "time": 1600169772,
  },
  {
    "apparentTemperature": 79.28,
    "time": 1600169773,
  },
  {
    "apparentTemperature": 79.28,
    "time": 1600169774,
  },
  {
    "apparentTemperature": 79.28,
    "time": 1600169776,
  },
  {
    "apparentTemperature": 79.28,
    "time": 1600169779,
  },
  {
    "apparentTemperature": 79.28,
    "time": 1600169277,
  },
  {
    "apparentTemperature": 79.28,
    "time": 1600169117,
  }]);  
  const [tab, setTab] = useState('weather');

  useEffect(() => {
    async function getWeather() {
      const query = 'https://api.darksky.net/forecast/';
      const secretKey = 'e5b418752262d6f5440bb6d510002282';
      const geo = `/${coords.lat},${coords.lng}?lang=en`;
  
      const url = query + secretKey + geo;
  
      const res = await fetch(url);
      const data = await res.json();
  
      setWeather(data.currently);

      // const arr = [{a: 1, b:'hi'}, {a: 2, b:'hello'}];
      // AsyncStorage.removeItem('weather');

      // if (await AsyncStorage.getItem('weather')) {
      //   async function saveToStorage() {
      //     const prevHistory = await AsyncStorage.getItem('weather');
      //     await console.log('prev');
      //     await console.log(JSON.parse(prevHistory));
      //     await console.log('new');
      //     await console.log(data.currently);
      //     // await AsyncStorage.setItem('weather', JSON.stringify([data.currently, prevHistory]));
      //   }
      //   saveToStorage();
      // } else {
      //   console.log('set');
      //   AsyncStorage.setItem('weather', JSON.stringify([data.currently]));
      // }
    }    
    if (coords) {
      console.log('get weather');
      getWeather();
    }
  }, [coords]);

  function onTabPressed(tabPressed) {
    if (tabPressed !== tab) {
      setTab(tabPressed);
    } 
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
    console.log('get location');
    navigator.geolocation.getCurrentPosition(success, (err) => {
      throw new Error(`ERROR(${err.code}): ${err.message}`);
    });
  }   

  const weatherPage = (tab === 'weather') ? <WeatherPage coords={coords} address={address} weather={weather} /> : null;
  const historyPage = (tab === 'history') ? <HistoryPage address={address} history={history} /> : null;

  return (
    <View style={styles.container}>
      <TabBar tab={tab} onTabPressed={onTabPressed} />
      {weatherPage}
      {historyPage}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'flex-start'
  }
});
