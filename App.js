import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TabBar } from './src/TabBar';
import { WeatherPage } from './src/WeatherPage';

export default function App() { 
  const [tab, setTab] = useState('weather');

  function onTabPressed(tabPressed) {
    if (tabPressed !== tab) {
      setTab(tabPressed);
    } 
  }

  const weatherPage = (tab === 'weather') ? <WeatherPage /> : null;

  return (
    <View style={styles.container}>
      <TabBar tab={tab} onTabPressed={onTabPressed} />
      {weatherPage}
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
