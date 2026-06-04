import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useState } from 'react'
import ImageReplace from "../../assets/ChangeImage.jpg"
import { Ionicons } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import * as ImagePicker from 'expo-image-picker';


const ProfileScreen = () => {
  const [create, setcreate] = useState(false)
  const [createProfile, setcreateProfile] = useState({name: "", bioDesc: ""})
  const [saveprofile, setsaveprofile] = useState(false)
  const [EditProfile, setEditProfile] = useState(false)
  const [uploadImage, setuploadImage] = useState(null)
  

  //profileHandleClick:-
  const profileHandleClick = async() => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });
    if(!result.canceled){
      setuploadImage(result.assets[0].uri);
    }
  };


  //handleChange:-
  const handleChange = (field, value) => {
    setcreateProfile({...createProfile, [field]:value})
  }

  //handleClick:-
  const handleCreatedProfile = () => {
    try {
      if(!createProfile.name || !createProfile.bioDesc){
        return Toast.show({
          type: "error",
          text1: "Please filled empty field"
        })
      }
      Toast.show({
        type: "success",
        text1: "Your Profile Created SuccessFully!"
      })
      setsaveprofile(true);
      setcreate(true);
      setEditProfile(false);
    } catch (error) {
      return Toast.show({
        type: "error",
        text1: "Fetching error your profile has been not created"
      })
    }
  }


  //handleEdit:-
  const handleEditprofile = () => {
    setEditProfile(true);
  }


  //handleUpdate:-
  const handleUpdateprofile = () => {
    try {
      if(!EditProfile){
      return Toast.show({
        type: 'error',
        text1: "No Update Here"
      })
    }
    Toast.show({
      type: "success",
      text1: "Update Profile Successfully!"
    })
    setEditProfile(false);
    } catch (error) {
      return Toast.show({
        type: "error",
        text1: "Failed to Update Profile"
      })
    }
  }

  return (
    <View style={styles.container}>
      {create?<Text style={styles.heading}>Edit Your Profile</Text>:<Text style={styles.heading}>Create Your Profile</Text>}
      
      <View style={styles.ImageContainer}>
        <Image source={uploadImage? {uri: uploadImage}: ImageReplace} style={styles.imagestyle}/>
        <Ionicons onPress={()=>profileHandleClick()} style={styles.cameraImage} name='camera' color={uploadImage?"blue":"black"} size={32}/>
      </View>

      <View style={styles.inputsection}>
        <Text>Name</Text>
        <View style={styles.inputsectiongap}>
        <TextInput editable={!saveprofile || EditProfile} value={createProfile.name} onChangeText={(name)=>handleChange("name", name)} placeholder='Enter your name'/>
          <Text style={styles.underline}>________________________________________________</Text>
          </View>
      </View>

      <View style={styles.inputsection}>
        <Text>Add your Bio Description</Text>
        <View style={styles.inputsectiongap}>
        <TextInput editable={!saveprofile || EditProfile} value={createProfile.bioDesc} onChangeText={(bioDesc)=>handleChange("bioDesc", bioDesc)} placeholder='Enter your Bio Description'/>
          <Text style={styles.underline}>________________________________________________</Text>
          </View>
      </View>

      <View style={styles.combobutton}>

        {!saveprofile && (
          <View style={styles.saveButton}>
        <Pressable onPress={()=>handleCreatedProfile()}>
          <Text style={styles.buttonText}>{saveprofile?"Your Profile":"Create a Profile"}</Text>
        </Pressable>
      </View>
        )}

      {saveprofile && (
        <>
        <View style={styles.saveButton}>
          <Pressable onPress={()=>handleEditprofile()}>
            <Text style={styles.buttonText}>Edit Your Profile</Text>
          </Pressable>
        </View>

        {EditProfile && (
          <View style={styles.saveButton}>
            <Pressable onPress={()=>{handleUpdateprofile()}}>
              <Text style={styles.buttonText}>Update Profile</Text>
            </Pressable>
          </View>
        )}
        </>
      )}

      </View>
      <View style={styles.bottomText}>
        <Text>Enjoy to Show your Blog and Stay Connected With Your Freind</Text>
        <Text style={styles.bottomTextcontent}>Make Feel Enjoy with this S.K Blog App</Text>
      </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '15%',
    gap: 15
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 28
  },
  imagestyle: {
    height: 180,
    width: 180,
    borderRadius: 90,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'black'
  },
  ImageContainer: {
    position: 'relative'
  },
  cameraImage: {
    position: 'absolute',
    bottom: 12,
    right: 26,
    outlineColor: 'black'
  },
  inputsection: {
    gap: 8,
    width: '88%'
  },
  inputsectiongap: {
    position: 'relative'
  },
  underline: {
    position: 'absolute',
    bottom: 0
  },
  combobutton: {
    flexDirection: 'row',
    gap: 20
  },
  saveButton: {
    backgroundColor: 'blue',
    width: '40%',
    padding: 15,
    borderRadius: 40
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  bottomText: {
    paddingHorizontal: 20,
    gap: 15
  },
  bottomTextcontent: {
    textAlign: 'center',
    fontWeight: '800'
  }
})