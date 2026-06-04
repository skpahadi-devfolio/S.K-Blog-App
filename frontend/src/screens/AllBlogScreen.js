import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { DeleteBlogAPI } from '../services/blogservices.js'
import { LinearGradient } from 'expo-linear-gradient'

const AllBlogScreen = ({blogs, setblogs}) => {

  const navigation = useNavigation()
  
  const [like, setlike] = useState(false)         //This is for changing like color
  const [dislike, setdislike] = useState(false)   //This is for changing dislike color
  const [comment, setcomment] = useState(false)   //This is for open comment section


  //handleEdit:-
  const handleEdit = (blogitem) => {
    navigation.navigate("CreateBlog", {
      editBlog: blogitem
    })
  }


  //handleDelete:-
  const handleDelete = async (blogitem) => {
    const result = await DeleteBlogAPI(blogitem.id);

    if(!result.success){
      return Toast.show({
        type: 'error',
        text1: result.message
      })
    }
    Toast.show({
      type: 'success',
      message: result.message
    })

    const updatedBlogs = blogs.filter((item) => {
      return item.id !== blogitem.id
    }) 
    setblogs(updatedBlogs)
  }

  return (
    <LinearGradient colors={['#00c6ff', '#0072ff']}
    style={{flex: 1}}>
    <View style={styles.container}>
      <Text style={styles.heading}>Memories</Text>

      {blogs?.length>0?<Text style={styles.BlogRender}>Your All Activities</Text>:<Text style={styles.BlogRender}>No Activity</Text>}

      <FlatList 
         data={blogs}
         renderItem={({item}) => (
          <View style={styles.BlogCards}>
            
            <View style={styles.controlBlog}>
              <Pressable onPress={()=>handleEdit(item)}>
              <Ionicons name='create-outline' size={24} color={'black'}/>
            </Pressable>

            <Pressable onPress={()=>handleDelete(item)}>
              <Ionicons name='trash' size={24} color={'black'}/>
            </Pressable>
            </View>
            <Text>{item.id}</Text>
            <Text>{item.BlogTitle}</Text>
            <Text>{item.BlogContent}</Text>
             <View style={styles.activitywithblogContent}>
          <Pressable onPress={()=>setlike(!like)}>
            <Ionicons style={styles.activityicons} name='heart' size={24} color={like?'blue':'black'}/>
            <Text>Like</Text>
          </Pressable>

          <Pressable onPress={()=>setdislike(!dislike)}>
            <Ionicons style={styles.activityicons} name='thumbs-down' size={24} color={dislike?'blue': 'black'}/>
            <Text>Dislike</Text>
          </Pressable>
         
          <Pressable onPress={()=>setcomment(!comment)}>
            <Ionicons style={styles.activityicons} name='chatbox' size={24} color={comment?'blue':'black'}/>
             <Text>Comment</Text>
          </Pressable>
         </View>
          </View>
         )}
         keyExtractor={(item) => item.id.toString()}
         />
    </View>
    </LinearGradient>
  )
}

export default AllBlogScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    gap: 20
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  BlogRender: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: '600'
  },
  BlogCards: {
    position: 'relative',
    height: 360,
    width: 340,
    borderColor: 'black',
    borderWidth: 0.7,
    margin: 'auto',
    borderRadius: 6,
    paddingLeft: 8,
    paddingTop: 25,
    marginBottom: '30%'
  },
  controlBlog: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    position: 'absolute',
    right: 9
  },
  activitywithblogContent: {
    position: 'absolute',
    bottom: -50,
    right: -10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
    gap: 15
  },
  activityicons: {
    textAlign: 'center'
  }
})