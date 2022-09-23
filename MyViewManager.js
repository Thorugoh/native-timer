import { requireNativeComponent } from 'react-native';
import { NativeModules } from 'react-native';

const MyTimer = requireNativeComponent('MyTimer');

const Timer = NativeModules.Timer;
export  { Timer, MyTimer }