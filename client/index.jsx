import { registerRootComponent } from 'expo';
import App from './src/App';
import { AppRegistry, Platform } from 'react-native';

registerRootComponent(App);

if (Platform.OS === 'web') {
    const rootTag = document.getElementById('root') || document.getElementById('X');
    AppRegistry.runApplication('X', { rootTag });
}

