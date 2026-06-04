import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import SK from "./assets/SKHomeLogo.png";
import TabNavigation from "./src/navigation/TabNavigation"
import Toast from 'react-native-toast-message';


export default function App() {
  return (
   <>
    <TabNavigation/>
    <Toast/>
   </>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: 'gray',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   gap: 15
  // },
  // homeText: {
  //   fontSize: 26,
  //   fontWeight: 'bold'
  // },
  // buttonText: {
  //   backgroundColor: 'black',
  //   color: 'white',
  //   paddingHorizontal: '7%',
  //   paddingVertical: '4%', borderRadius: 20
  // }
});
