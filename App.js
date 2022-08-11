import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import useWebsoket from 'react-use-websocket';
import { useState } from 'react';
import { Input, Text } from 'react-native-elements';
import { Feather as Icon } from '@expo/vector-icons'


export default function App() {

  const [data, setData] = useState({});
  const [text, setText] = useState('BTCUSDT');
  const [symbol, setSymbol] = useState('btcusdt');


  const { lastJsonMessage } = useWebsoket(`wss://stream.binance.com:9443/ws/${symbol}@ticker`, {
    onMessage: () => {
      if (lastJsonMessage) {
        setData(lastJsonMessage);
      }
    },
    onError: (event) => alert(event),
    shouldReconnect: () => true,
    reconnectInterval: 3000,
  })


  const searchButton = <Icon.Button
    name='search'
    size={24}
    color='black'
    backgroundColor="transparent"
    onPress={evt => setSymbol(text.toLowerCase()
    )} />

  return (
    <View style={styles.container}>
      <Text h1>BoTrade</Text>
      <Input
        autoCapitalize='characters'
        leftIcon={<Icon name='dollar-sign' size={24} color='black' />}
        value={text}
        rightIcon={searchButton}
        onChangeText={setText} />
      <View style={styles.bloco}>
        <Text style={styles.rotulo} >Preço atual: </Text>
        <Text style={styles.conteudo}>{data.c}</Text>
      </View>
      <View style={styles.bloco}>
        <Text style={styles.rotulo} >Variação: </Text>
        <Text style={styles.conteudo}>{data.P} %</Text>
      </View>
      <View style={styles.bloco}>
        <Text style={styles.rotulo} >Volume: </Text>
        <Text style={styles.conteudo}>{data.v}</Text>
      </View>
      <View style={styles.bloco}>
        <Text style={styles.rotulo} >Qtd Trades: </Text>
        <Text style={styles.conteudo}>{data.n}</Text>
      </View>
      <Text>{JSON.stringify(data)}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 40,
    margin: 20,
    alignContent: 'center'
  },
  rotulo: {
    fontWeight: 'bold',
    fontSize: 25
  },
  conteudo: {
    fontSize: 24
  },
  bloco: {
    flexDirection: 'row',
    width: '100%'
  }
});
