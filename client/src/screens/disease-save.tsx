import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Button, List, MD2Colors } from 'react-native-paper';
import { colors } from '../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { FindDisease, GetSymptoms } from '../services/disease-find-service';



const DiseaseSave = () => {
  const context = {
    user: {
      name: 'Shahriar Rahman',
      email: 'srn@srn.com',
      picture: '',
      _id: "sfjq30949fei93r4j"
    }
  }

  if(context.user._id != ''){
    return (
      <SafeAreaView style={styles.safeViewContainer}>
        <ScrollView style={{height: '100%'}}>

          <View style={styles.mainBox}>
            <Text style={styles.title}>Saved Diseases</Text>
            
            
            
    
          </View>
        </ScrollView>
        <StatusBar  backgroundColor="#161622" style="light"/>
      </SafeAreaView>
    );
  }else{
    return(
      <View style={{height: '100%',display: 'flex', justifyContent: 'center', alignItems:'center'}}>
        <Text style={{fontSize: 26}}>Invalid Request</Text>
      </View>
    )
  }
};

export default DiseaseSave;

const styles = StyleSheet.create({
  safeViewContainer: {
    backgroundColor: colors.bg,
    height: "100%", 
    
  },

  mainBox: {
    width: '100%',
    height: '100%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    // backgroundColor: '#ccc'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    borderRadius: 40,
    backgroundColor: 'white'
  },
  dropdown: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 19,
    height: 'auto',
    maxHeight: 200,
    paddingHorizontal: 15
  },
  dropdownRow: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#f5f5f5',
    borderBottomWidth: 1,
    marginHorizontal: 5
  },
  dropdownText: {
    fontSize: 16,
  },
  // Styles for the selected disease tags
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,

  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    fontSize: 14,
    marginRight: 8,
  },
  removeButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 50,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    marginTop: -2
  },

  searchButtonBorder: {
    backgroundColor: colors.primary,
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 40,
    alignItems: 'center'
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17
  },
  buttonStyle:{
    backgroundColor: colors.secondary,
    marginTop: 20,
    width: 150,
},
accordion: {
  marginTop: 30,
},
accordionItem: {
  marginBottom: 10,
  backgroundColor: 'white',
  borderRadius: 10
},
accordionTitle: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 8,
  borderColor: '#ccc',
  marginLeft: 13,
  marginRight: 13,
  marginTop: 8,
  marginBottom: 8,
},
accordionText: {
  fontSize: 16,
  fontWeight: 'bold'
},
accordionContent: {
  marginLeft: 13,
  marginRight: 13,
  marginBottom: 13
},
accordionTextLine: {
  color: 'grey',
  lineHeight: 20
},
incorrectText: {
  color:"#e33", 
  textAlign:'left', 
  width: '100%', 
  marginLeft:10,
  marginBottom: 5,
  display: 'flex'
}
});