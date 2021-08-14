import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, SafeAreaView } from 'react-native';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getCrypto = async () => {
    try {
      const response = await fetch('https://api.coinlore.net/api/tickers/');
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCrypto();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, padding: 24 }}>
      <Text style={{textAlign: 'center', fontWeight: '700', paddingBottom: '50', fontSize: '20'}}>Cryptocurrency Listing App</Text>
      <View style={styles.cryptoTable}>
      <Text style={{flex: '1', fontWeight: '700', textAlign: 'center', paddingBottom: '30'}}>Name</Text>
      <Text style={{flex: '1', fontWeight: '700', paddingBottom: '30'}}>Symbol</Text>
      <Text style={{flex: '1', fontWeight: '700', paddingBottom: '30'}}>Price (USD)</Text>
      </View>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View style={styles.cryptoTable}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.symbol}>{item.symbol}</Text>
            <Text style={styles.price}>${item.price_usd}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8
  },
  cryptoTable: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    color: 'white',
    marginVertical: 2,
    borderRadius: '3px',
    paddingTop: '10px',
    paddingBottom: '10px',
    marginHorizontal: 16,
    border: '2px solid #333'
  },
  name: {
    textAlign: 'left',
    flex: '1',
    fontWeight: '700'
  },
  symbol: {
    textAlign: 'center',
    flex: '1'
  },
  price: {
    textAlign: 'right',
    flex: '1',
    fontWeight: '700'
  }
});
