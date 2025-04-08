import { Slot, Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from './AppStore';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{headerShown: false}}/>
    </Provider>
  );
}
