import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CreateBlogScreen from "../screens/CreateBlogScreen";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";
import AllBlogScreen from "../screens/AllBlogScreen";
import { useState } from "react";


const Tab = createBottomTabNavigator();

const TabNavigation = () => {

    const [blogs, setblogs] = useState([])
    return (
        <NavigationContainer>
            <Tab.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#fff'
                },
                headerTitleStyle: {
                    fontSize: 26,
                    fontWeight: 'bold'
                }
            }}>

                <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({color, size}) => {
                        return (
                            <Ionicons name="home" size={size} color={color}/>
                        )
                    }
                }}
                />

                <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon:({color, size}) => {
                        return (
                            <Ionicons name="person" size={size} color={color}/>
                        )
                    }
                }}/>


                <Tab.Screen
                name="Activity"
                children={()=>(
                    <AllBlogScreen blogs={blogs} setblogs={setblogs}/>
                )}
                options={{
                    tabBarIcon: ({color, size}) => {
                        return (
                            <Ionicons name="time" size={size} color={color}/>
                        )
                    }
                }} />

                <Tab.Screen
                name="CreateBlog"
                children={()=>(
                    <CreateBlogScreen blogs={blogs} setblogs={setblogs}/>
                )}
                options={{
                    tabBarIcon:({color, size}) => {
                        return (
                            <Ionicons name="add-circle" size={size} color={color}/>
                        )
                    }
                }}/>

                <Tab.Screen
                name="Signup"
                component={SignupScreen}
                options={{
                    tabBarIcon:({color, size}) => {
                        return (
                            <Ionicons name="person-add" size={size} color={color}/>
                        )
                    }
                }}/>

                <Tab.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    tabBarIcon:({color, size}) => {
                        return (
                            <Ionicons name="log-in" size={size} color={color}/>
                        )
                    }
                }}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default TabNavigation