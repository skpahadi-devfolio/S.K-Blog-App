//Blog Services for create, get, update and delete:-

import AsyncStorage from "@react-native-async-storage/async-storage";

//create api call:-
export const createblogAPI = async(data) => {
    try {
        const token = await AsyncStorage.getItem("token")
        const response = await fetch(`http://10.168.187.203:3000/api/createBlog`,  {method: "POST", headers: {"Content-Type": "application/json",
           "Authorization": `Bearer ${token}`
        },
    body: JSON.stringify(data)
})
     const result = await response.json();
     if(!response.ok){
        return {success: false, message: result.message};
     }
     return {success: true, message: result.message, blog: result.blog
};
    } catch (error) {
     return {success: false, message: error.message};
    }
}






//getBlog api call:-
export const getBlogAPI = async(user_id) => {
    try {
        const token = await AsyncStorage.getItem("token")
        const response = await fetch(`http://10.168.187.203:3000/api/yourblogs`, {method: "GET", headers:{"Authorization": `Bearer ${token}`}})
        const result = await response.json();
        if(!response.ok){
            return {success: false, message: result.message};
        }
        return {success: true, message: result.message, blogs: result.getBlog};
    } catch (error) {
        return {success: false, message: error.message};
    }
}






//updateBlog api call:-
export const updateBlogAPI = async(id, data) => {
    try {
        const token = await AsyncStorage.getItem("token")
        const response = await fetch(`http://10.168.187.203:3000/api/updateblog/${id}`, {method: "PUT", headers: {"Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    body: JSON.stringify(data)
})
       const result = await response.json();
       if(!response.ok){
        return {success: false, message: result.message};
       }
       return {success: true, message: result.message};
    } catch (error) {
        return {success: false, message: error.message};
    }
}








//DeleteBlog api call:-
export const DeleteBlogAPI = async(id) => {
    try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`http://10.168.187.203:3000/api/deleteblog/${id}`, {method: "DELETE", headers:{"Authorization": `Bearer ${token}`}
        })
        const result = await response.json();
        if(!response.ok){
            return {success: false, message: result.message};
        }
        return {success: true, message: result.message};
    } catch (error) {
        return {success: false, message: error.message};
    }
}