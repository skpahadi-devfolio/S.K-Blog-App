import { Image, Pressable, StyleSheet, Text, View, Animated, ScrollView } from 'react-native'
import { useRef } from 'react'
import SKImage from "../../assets/SKHomeLogo.png"
import { pressInAnimation, pressOutAnimation } from '../animations/buttonAnimation.js'
import { LinearGradient } from 'expo-linear-gradient'


const HomeScreen = ({navigation}) => {

  const scaleValue = useRef(new Animated.Value(1)).current

  return (
    <LinearGradient colors={['#1f1c2c' ,'#928dab']}
    style={{flex: 1}}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Jai Golu Devta</Text>
      <Image source={SKImage} style={styles.SKImagestyle}/>
      <Text style={styles.headingContent}>Hey Welcome to This Blog App ! Here You can Create your Blog, edit, delete with your Blog and you can also connect with your friend!</Text>
      <Text style={styles.headingContent}>So,The Best way to intreact with your Friend to make your blog in App and Share your thoughts and feeling through this SK Blog App</Text>


      <View style={styles.buttoncard}>
        <Pressable style={styles.buttonContent} onPress={()=>navigation.navigate("Signup")} onPressIn={()=>pressInAnimation(scaleValue)} onPressOut={()=>pressOutAnimation(scaleValue)}>
         <Animated.View style={{transform: [{scale: scaleValue}]}}>
          <Text style={styles.buttonstyle}>Signup</Text>
         </Animated.View>
        </Pressable>

      <Pressable style={styles.buttonContent} onPress={()=>navigation.navigate("Login")} onPressIn={()=>pressInAnimation(scaleValue)} onPressOut={()=>pressOutAnimation(scaleValue)}>
        <Animated.View style={{transform: [{scale: scaleValue}]}}>
          <Text style={styles.buttonstyle}>Login</Text>
        </Animated.View>
      </Pressable>
      </View>


    </ScrollView>
    </LinearGradient>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    paddingBottom: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white'
  },
  SKImagestyle: {
   width:180,
  height:180,
  borderRadius:90,
  marginVertical:20
  },
  headingContent:{
    padding: 7,
    fontSize: 16,
    color: 'white'
  },
  textcolumn: {
    backgroundColor: 'gray',
    paddingHorizontal: 15,
    paddingVertical: 8,
    color: 'white'
  },
  buttoncard:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10%',
    width: '95%'
  },
  buttonText: {
    color: 'white'
  },
  buttonstyle: {
    backgroundColor: '#4f46e5',
    padding: 15,
    paddingHorizontal: 30,
    color: 'white',
    borderRadius: 15
  }
})