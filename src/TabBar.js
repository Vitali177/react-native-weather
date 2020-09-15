import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const TabBar = ({ tab, onTabPressed }) => {
  return (
    <View style={styles.tabBar}>      
      <TouchableOpacity 
        style={tab === 'weather' ? {...styles.button, ...styles.buttonActive} : styles.button}
        title='Weather'   
        onPress={() => onTabPressed('weather')}   
      >
        <Text style={{...styles.buttonText, ...styles.buttonTextFirst}}>Weather</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={tab === 'history' ? {...styles.button, ...styles.buttonActive} : styles.button}
        title='History'
        onPress={() => onTabPressed('history')}
      >
        <Text style={styles.buttonText}>History</Text>
      </TouchableOpacity>      
    </View>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    width: '100%',
    flexDirection: 'row'
  },
  button: { 
    color: '#FFF',
    width: '50%',
    height: 50 
  },
  buttonActive: {    
    borderBottomColor: '#1E90FF', 
    borderBottomWidth: 3
  },
  buttonText: {
    paddingBottom: 10,
    textAlign: 'center',
    color: '#FFF',
    fontSize: 24
  },
  buttonTextFirst: {
    height: '80%',
    borderRightWidth: 1, 
    borderRightColor: '#333', 
  }
});