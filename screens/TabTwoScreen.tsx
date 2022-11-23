import { StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useState, useEffect } from 'react';
import { Image } from 'react-native';
import axios from 'axios';


export default function TabTwoScreen() {

  const [weatherData, setWeatherData] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [text, setText] = useState('');

  const getData = () => {
    axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        appid: 'a84fa02c10f107905f4968c8ec0bea59',
        q: text,
        units: 'metric'
      }
    }).then(res => setWeatherData(res.data))
  }

  useEffect(() => {
    axios.get('https://api.open-meteo.com/v1/forecast?daily=apparent_temperature_max,apparent_temperature_min&current_weather=true&timezone=America%2FSao_Paulo', {
      params: {
        latitude: weatherData?.coord.lat,
        longitude: weatherData?.coord.lon
      }
    }).then(res => setForecast(res.data))
  }, [weatherData])


  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40, color: 'white' }}
        placeholder="Type here to translate!"
        onChangeText={newText => setText(newText)}
        onSubmitEditing={getData}
        returnKeyType='search'
      />
      <View>
        {forecast?.daily.time.map((x) => <Text>{x.slice(8, 10)}</Text>)}
      </View>
      <Text style={styles.title}>{weatherData?.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
