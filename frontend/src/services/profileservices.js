//Profile Services API Calling:-

import AsyncStorage from "@react-native-async-storage/async-storage";

//create profile api call:-
export const createprofileUser = async(data) => {
    try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch('https://s-k-blog-app.onrender.com/api/createprofile', {method: "POST", headers:{"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
        body: JSON.stringify(data)
    })
        const result = await response.json();
        if(!response.ok){
            return {success: false, message: result.message};
        }
        return {success: true, message: result.message, result, token: result.token, profile: result.newUserProfile};
    } catch (error) {
        return {success: false, message: error.message};
    }
}






//Get profile api call:-
export const getprofileUser = async() => {
    try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`https://s-k-blog-app.onrender.com/api/getprofile`, {method: "GET", headers: {"Authorization": `Bearer ${token}`}})
        const result = await response.json();
        if(!response.ok){
            return {success: false, message: result.message}
        }
        return {success: true, message: result.message, result, token: result.token, profile: result.profile}
    } catch (error) {
        return {success: false, message: error.message}
    }
}









//Update profile api call:-
export const updateprofileUser = async(data) => {
    try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`https://s-k-blog-app.onrender.com/api/updateprofile`, {method: "PUT", headers:{"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
            body: JSON.stringify(data)
        })
        const result = await response.json();
        if(!response.ok){
            return {success: false, message: result.message}
        }
        return {success: true, message: result.message, result, token: result.token, profile: result.updateprofile}
    } catch (error) {
        return {success: false, message: error.message}
    }
}