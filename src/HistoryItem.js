import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export const HistoryItem = ({ address, item, coords, openedItem, onItemPressed }) => {
  const date = new Date(item.time * 1000);
  const improveNum = num => (num < 10) ? `0${num}` : num;
  
  const textDate = `${date.getFullYear()}-${improveNum(date.getMonth() + 1)}-${improveNum(date.getDate())}`;
  const textTime = `${improveNum(date.getHours())}:${improveNum(date.getMinutes())}:${improveNum(date.getSeconds())}`;
  
  const historyItemStyles = (openedItem === item.time) ? {...styles.historyItem, ...styles.openedHistoryItem} : styles.historyItem;
  const textItemStyles = (openedItem === item.time) ? {...styles.textItem, ...styles.openedTextItem} : styles.textItem;
  
  const OpenedContent = () => (
    <View>
      <Text style={textItemStyles}>Temperature - {Math.round((item.temperature - 32) * 0.55)} &#8451;</Text>
      <Text style={textItemStyles}>Wind speed - {item.windSpeed} m/s</Text>
      <Text style={textItemStyles}>Wind gust - {item.windGust} m/s</Text>
      <Text style={textItemStyles}>Humidity - {item.humidity}%</Text>
    </View>
  )

  return (
    <TouchableOpacity 
      style={historyItemStyles} 
      activeOpacity={.5}
      onPress={() => onItemPressed(item.time)}
    >
      <Text style={textItemStyles}>{address.split(',')[1]}</Text>
      <Text style={textItemStyles}>{`${coords.lat.toFixed(2)}, ${coords.lng.toFixed(2)}`}</Text>
      <Text style={textItemStyles}>{textDate} {textTime}</Text>
      {(openedItem === item.time) ? <OpenedContent /> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  historyItem: {
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#FFFF'
  },
  openedHistoryItem: {
    paddingVertical: 10,
    paddingLeft: 20,
    height: 160,
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  textItem: {
    color: '#FFF',
    fontSize: 13
  },
  openedTextItem: {
    fontSize: 17
  }
});