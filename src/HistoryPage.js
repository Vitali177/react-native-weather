import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';

export const HistoryPage = ({ history, address }) => {
  const [openedItem, setOpenedItem] = useState(null);
  // const [data, setData] = useState(null);  

  // useEffect(() => {
  //   async function getData() {
  //     const weather = await AsyncStorage.getItem('weather');
  //     await console.log('history');
  //     await console.log(JSON.parse(weather));
  //     await setData(JSON.parse(weather));
  //   }
  //   getData(); 
  // }, []);  

  const onItemPressed = (itemTime) => (openedItem !== itemTime) ? setOpenedItem(itemTime) : setOpenedItem(null);  

  if (history) {
    history.map((item) => {
      const date = new Date(item.time * 1000);
      const res = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      // console.log(res);
    })
  }

  return (
    <View style={styles.container}>
      {history 
        ? <FlatList 
            keyExtractor={(_, idx) => idx.toString()}
            data={history}
            renderItem={({ item }) => <HistoryItem address={address} item={item} openedItem={openedItem} onItemPressed={onItemPressed} />}
          />
        : null}   
    </View>
  )
}

const HistoryItem = ({ address, item, openedItem, onItemPressed }) => {
  const date = new Date(item.time * 1000);
  const textDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  
  return (
    <TouchableOpacity 
      style={(openedItem === item.time) ? {...styles.historyItem, ...styles.openedHistoryItem} : styles.historyItem} 
      onPress={() => onItemPressed(item.time)}
    >
      <Text style={{...styles.textCity, ...styles.textItem}}>{address.split(',')[1]}</Text>
      <Text style={styles.textItem}>{textDate}</Text>
    </TouchableOpacity>
  )   
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    width: '100%'
  },
  historyItem: {
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#FFFF'
  },
  openedHistoryItem: {
    height: 150
  },
  textCity: {
    color: '#FFF',
  },
  textItem: {
    color: '#FFF',
    fontSize: 14
  }
});