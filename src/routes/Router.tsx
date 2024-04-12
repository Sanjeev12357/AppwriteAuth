import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {AppwriteContext} from '../appwrite/AppwriteContext'
import Loading from '../components/Loading'


//routes
import AppStack from './AppStack'
import AuthStack from './AuthStack'
export default function Router() {
    const [isLoadin, setIsLoading]=useState<boolean>(true)
    const {appwrite,isLoggedIn, setIsLoggedIn} =useContext(AppwriteContext)

    useEffect(()=>{
        appwrite.getCurrentUser().then(response => {
            setIsLoading(false)
            if(response){
                setIsLoggedIn(true)
            }
        }).catch(_ =>{
            setIsLoading(false)
            setIsLoggedIn(false)
        })
    },[appwrite,setIsLoggedIn])

    if(isLoadin){
        return <Loading/>
    }
  return (
    <NavigationContainer>
        {isLoggedIn ? <AppStack/> : <AuthStack/>}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})