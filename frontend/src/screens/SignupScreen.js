import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useState } from 'react'
import Toast from 'react-native-toast-message'
import { SignupUser } from '../services/authservices';
import { LinearGradient } from 'expo-linear-gradient';

const SignupScreen = ({navigation}) => {

  const [form, setform] = useState({name:"", email:"", password:"", confirmpassword:""});

  //handleChange:-
  const handleChange = (field, value) => {
    setform({...form, [field]:value});
  }

  //handleClick:-
  const handleClick = async() => {
    try {
     const result = await SignupUser(form)
     if(!result.success){
     return Toast.show({
      type: 'error',
      text1: result.message
     })
     }

     Toast.show({
      type: 'success',
      text1: result.message
     });
     navigation.navigate("Login")
    setform({name: "", email: "", password: "", confirmpassword: ""});
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
        <Text style={styles.signupHeading}>Signup-Form</Text>

      <TextInput style={styles.inputFields}  placeholder='Enter Your Name' value={form.name} onChangeText={(name)=>handleChange("name",name)}/>
      <TextInput style={styles.inputFields} placeholder='Enter Your Email' value={form.email} onChangeText={(email)=>handleChange("email", email)}/>
      <TextInput style={styles.inputFields} secureTextEntry={true} placeholder='Enter Your Password' value={form.password} onChangeText={(password)=>handleChange("password", password)}/>
      <TextInput style={styles.inputFields} secureTextEntry={true} placeholder='Re-Enter Your Password' value={form.confirmpassword} onChangeText={(confirmpassword)=>handleChange("confirmpassword" ,confirmpassword)}/>

      <Pressable style={styles.button} onPress={()=>handleClick()}>
        <Text style={styles.buttonText}>Signup</Text>
      </Pressable>
      </View>
    </View>
    </LinearGradient>
  )
}

export default SignupScreen

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
  signupHeading:{
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