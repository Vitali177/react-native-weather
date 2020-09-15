import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { HistoryItem } from './HistoryItem';

export const HistoryPage = ({ history, address, coords }) => {
  const [openedItem, setOpenedItem] = useState(null);
  const onItemPressed = (itemTime) => (openedItem !== itemTime) ? setOpenedItem(itemTime) : setOpenedItem(null); 

  return (
    <View style={styles.container}>
      {history 
        ? <FlatList 
            keyExtractor={(_, idx) => idx.toString()}
            data={history}
            renderItem={({ item }) => <HistoryItem coords={coords} address={address} item={item} openedItem={openedItem} onItemPressed={onItemPressed} />}
          />
        : null}   
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    width: '100%'
  }
});