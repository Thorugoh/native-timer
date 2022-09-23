import React from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
  Text
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { MyView } from './MyView';
import { useTimer } from './useTimer';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const { play, pause, stop, minutes, seconds} = useTimer();

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
{/* 
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <MyView />
        <View style={{ flexDirection: "row" }}>
          <Button title='>' onPress={play} />
          <Button title='||' onPress={pause}/>
          <Button title='[]' onPress={stop}/>
        </View>

      </View> */}
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
          <Button title=">" onPress={play} />
          <Button title="||" onPress={pause}/>
        </View>
      </View>
    </SafeAreaView>
  );
};


export default App;
