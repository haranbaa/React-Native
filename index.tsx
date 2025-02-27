/**
 * @format
 */
import 'react-native-gesture-handler'; // Ensure this is the first import
import { AppRegistry } from 'react-native';
import App from './src/App'; // Corrected import path
import { name as appName } from './app.json';

// Register the main application component
AppRegistry.registerComponent(appName, () => App);
