import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useState, useEffect } from 'react';
import { Image } from 'react-native';
import axios from 'axios';

export type WeatherType = {
  name: string,
  main: any,
  temp: boolean,
  weather: any,
  description: string

}

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [weatherData, setWeatherData] = useState<WeatherType>()
  useEffect(() => {
    axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        appid: 'a84fa02c10f107905f4968c8ec0bea59',
        q: 'Brasília',
        units: 'metric'
      }
    }).then(res => setWeatherData(res.data))
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{weatherData?.name}</Text>
      <Text style={styles.title}>C° {weatherData?.main.temp}</Text>
      <Text style={styles.title}>{weatherData?.weather[0].description}</Text>
      <Image
        style={{
          width: 100,
          height: 100,
        }}
        source={{
          uri: `http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@4x.png`
        }}
      />
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
