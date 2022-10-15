import { StyleSheet, Text, View, StatusBar } from 'react-native';
import LandingPage from './components/LandingPage/LandingPage';

export default function App() {
  return (
    <View style={styles.root}>
      <LandingPage />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingTop: StatusBar.currentHeight,
    height: "100%",
    padding: 12
  },
});
