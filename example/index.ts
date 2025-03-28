// polyfills
import { install } from 'react-native-quick-crypto';
install();

// event-target-shim
import 'event-target-polyfill';

// readable-stream
// @ts-expect-error - although process.version is readonly, we're setting it for readable-stream
global.process.version = 'v22.0.0';

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
