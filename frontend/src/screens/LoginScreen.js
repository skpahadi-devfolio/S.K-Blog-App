import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import { useState } from 'react'
import Toast from 'react-native-toast-message';
import { loginUser } from '../services/authservices';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({navigation}) => {

  const [form, setform] = useState({email: "", password: ""});

  //handleChange:-
  const handleChange = (field, value) => {
    setform({...form, [field]:value});
  } 


  //handleClick:-
  const handleClick = async() => {
    try {
      const result = await loginUser(form);
      if(!result.success){
         return Toast.show({
          type: 'error',
          text1: result.message
        })
        return;
      }
      Toast.show({
        type: 'success',
        text1: result.message
      })
      navigation.navigate("Profile");
      setform({email: "", password: ""});
    } catch (error) {
      return Toast.show({
        type: 'error',
        text1: error.message
      })
    }
  }
  return (
    <LinearGradient colors={['#667eea' , '#764ba2']}
    style={{flex: 1}}>
    <View style={styles.bodyContainer}>
      <View style={styles.container}>
      <Text style={styles.loginHeading}>Login to App</Text>
       <TextInput style={styles.inputFields} placeholder='Enter Your Email' value={form.email} onChangeText={(email)=>handleChange("email", email)}/>
       <TextInput style={styles.inputFields} secureTextEntry={true} placeholder='Enter Password' value={form.password} onChangeText={(password)=>handleChange("password", password)}/>
        <Pressable style={styles.button} onPress={()=>handleClick()}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </View>
    </LinearGradient>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  bodyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#390a5281',
    width: '90%',
    gap: 15,
    padding: 5,
    borderRadius: 10,
    paddingVertical: '8%'
  },
  loginHeading: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold'
  },
  inputFields: {
    width: '80%',
    backgroundColor: 'white',
    padding: 15,
    paddingVertical: '4%',
    borderRadius: 5
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 15,
    paddingVertical: '4%',
    width: '80%',
    borderRadius: 10
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  }
})