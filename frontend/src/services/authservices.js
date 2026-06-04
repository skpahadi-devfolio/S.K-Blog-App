//Auth Services API Calling:-
import AsyncStorage from "@react-native-async-storage/async-storage";

//Signup API Calling:-
export const SignupUser = async(data)=>{
    try {
        const response = await fetch('http://10.168.187.203:3000/api/auth/signup', {method: "POST", headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
       })
      const result = await response.json();
      if(!response.ok){
        return {success: false, message: result.message}
      }
      return {success: true, message: result.message}
    } catch (error) {
        return {success: false, message: error.message}
    }
}







//Login Service Logic:-
export const loginUser = async(data) => {
    try {
        const response = await fetch('http://10.168.187.203:3000/api/auth/login', {method: "POST", headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const result = await response.json();
    if(!response.ok){
        return {success: false, message: result.message}
    }
    const token = await AsyncStorage.setItem("token", result.token);
   return {success: true, message: result.message, token: result.token}
    } catch (error) {
     return {success: false, message: error.message}   
    }
}