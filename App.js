import React from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { useTimer } from './useTimer';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const {run, pause, minutes, seconds} = useTimer();

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text>Timer</Text>
        <Text>{minutes}:{seconds}</Text>
        <View style={{ width: 50, flexDirection: "row", justifyContent: 'space-between'}}>
          <Button title=">" onPress={run} />
          <Button title="||" onPress={pause}/>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
