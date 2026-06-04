import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import Toast from 'react-native-toast-message'
import { createblogAPI, updateBlogAPI } from '../services/blogservices.js'
import { useRoute, useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'

const CreateBlogScreen = ({ blogs, setblogs }) => {

  const [createBlog, setcreateBlog] = useState({ title: "", blog: "" })
  const route = useRoute();
  const navigation = useNavigation();
  const { editBlog } = route.params || {};

  //for exist data filled the edit coloumn
  useEffect(() => {
  if (editBlog) {
    setcreateBlog({
      title: editBlog.BlogTitle,
      blog: editBlog.BlogContent
    });
  }
}, [editBlog]);

  //HandleUpdate for Blog:-
  const handleUpdate = async () => {
    try {
      const data = {
        title: createBlog.title,
        Blogcontent: createBlog.blog
      };
      const result = await updateBlogAPI(editBlog.id, data);
      if (!result.success) {
        return Toast.show({
          type: 'error',
          text1: result.message
        })
      }
      const updatedBlogs = blogs.map((item) => {

        if (item.id === editBlog.id) {
          return {
            ...item,
            BlogTitle: createBlog.title,
            BlogContent: createBlog.blog
          };
        }
        return item
      });

      setblogs(updatedBlogs);
      setcreateBlog({
        title: "", blog: ""
      })
      navigation.navigate("Activity")
      Toast.show({
        type: 'success',
        text1: result.message
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.message
      })
    }
  }

  //HandleChange for Blog:-
  const handleChange = (field, value) => {
    setcreateBlog({ ...createBlog, [field]: value })
  }

  //HandleClick for Blog:-
  const handleProfileCreate = async () => {
    try {
      const data = {
        title: createBlog.title,
        Blogcontent: createBlog.blog
      };
      const result = await createblogAPI(data);
      if (!result.success) {
        return Toast.show({
          type: 'error',
          text1: result.message
        })
      }
      Toast.show({
        type: 'success',
        text1: result.message
      })

      //Adding new Blog in ACtivity all Blog Scetion:-
      const newBlog = {
        id: result.blog.id,
        BlogTitle: createBlog.title,
        BlogContent: createBlog.blog
      }
      setblogs([...blogs, newBlog])

      //reset blog section:-
      setcreateBlog({ title: "", blog: "" })
    } catch (error) {
      return Toast.show({
        type: 'error',
        text1: error.message
      })
    }
  }
  return (
    <LinearGradient colors={['#ff9966' , '#ff5e62']}
    style={{flex: 1}}>
    <View style={styles.container}>
      <Text style={styles.heading}>Add Blog</Text>

      <View style={styles.BlogCard}>
        <TextInput onChangeText={(title) => handleChange("title", title)} value={createBlog.title} style={styles.title} placeholder='Blog Title:' />
        <TextInput style={styles.title} onChangeText={(blog) => handleChange("blog", blog)} value={createBlog.blog} placeholder='Write your Blog Here...' multiline={true} maxLength={1000} scrollEnabled={true} />
        <Text style={styles.Bloglimit}>{createBlog.blog.length}/1000</Text>

        <Pressable style={styles.PostButton} onPress={() => {editBlog ?handleUpdate() :handleProfileCreate()}}>
          <Text style={styles.PostButtonText}>{editBlog? "Update Blog": "Post Blog"}</Text>
        </Pressable>
      </View>
    </View>
    </LinearGradient>
  )
}

export default CreateBlogScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 20
  },
  BlogCard: {
    position: 'relative',
    height: 360,
    width: 340,
    borderColor: 'black',
    borderWidth: 1.2,
    margin: 'auto',
    paddingLeft: 6,
    borderRadius: 6
  },
  title: {
    paddingLeft: 5,
    paddingVertical: 9,
    fontWeight: '500'
  },
  Bloglimit: {
    position: 'absolute',
    bottom: -20,
    right: 0,
    fontWeight: '500'
  },
  PostButton: {
    position: 'absolute',
    bottom: -65,
    right: 0,
    backgroundColor: 'blue',
    borderRadius: 40
  },
  PostButtonText: {
    color: 'white',
    paddingHorizontal: 30,
    paddingVertical: 10,
    fontWeight: 'bold'
  }
})