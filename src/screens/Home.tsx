import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
//react native elements

import { FAB, Image } from '@rneui/themed'


// snack bar
import Snackbar from 'react-native-snackbar'
// context api
import {AppwriteContext} from '../appwrite/AppwriteContext'
import { SafeAreaView } from 'react-native-safe-area-context'

type UserObj ={
  name:String;
  email:String
}



export default function Home() {
  const [userData, setUser]=useState<UserObj>({
    name:'',
    email:''
  })

  const {appwrite, setIsLoggedIn} =useContext(AppwriteContext)
  
const handleLogout=()=>{
  appwrite.logout().then(()=>{
    setIsLoggedIn(false)
    Snackbar.show({
      text:'Logged out successfully',
      duration:Snackbar.LENGTH_SHORT,
      textColor:'white',
      backgroundColor:'green'
    })
  }).catch((error)=>{
    Snackbar.show({
      text:error,
      textColor:'white',
      backgroundColor:'red'
    })
  })
}

useEffect(()=>{
    appwrite.getCurrentUser().then(response => {
        if(response){
            setUser({
              name:response.name,
              email:response.email
            })
        }
    }).catch(_ =>{
        setIsLoggedIn(false)
    })
},[appwrite])
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Image
            source={{
              uri: 'https://appwrite.io/images-ee/blog/og-private-beta.png',
              width: 400,
              height: 300,
              cache: 'default',
            }}
            resizeMode="contain"
          />
          <Text style={styles.message}>
            Build Fast. Scale Big. All in One Place.
          </Text>
          {userData && (
            <View style={styles.userContainer}>
              <Text style={styles.userDetails}>Name: {userData.name}</Text>
              <Text style={styles.userDetails}>Email: {userData.email}</Text>
            </View>
          )}
        </View>
        <FAB
          placement="right"
          color="#f02e65"
          size="large"
          title="Logout"
          icon={{name: 'logout', color: '#FFFFFF'}}
          onPress={handleLogout}
        />
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D32',
  },
  welcomeContainer: {
    padding: 12,

    flex: 1,
    alignItems: 'center',
  },
  message: {
    fontSize: 26,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  userContainer: {
    marginTop: 24,
  },
  userDetails: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});