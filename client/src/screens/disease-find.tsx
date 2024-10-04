import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import { colors } from '../constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const data = [
    {
        "ID": 1,
        "Disease": "Acute Flaccid Myelitis (AFM)",
        "Discription": "As of January 1, 2020, IDPH is reporting the following number of patients under investigation during the given year and the number of cases that are confirmed, probable, and not cases according to the Centers for Disease Control and Prevention (CDC) after review of the case..."

    },
    {
        "ID": 2,
        "Disease": "Asthma",
        "Discription": "What is asthma? Asthma is a condition that affects the airways. It makes it hard to breathe because the airways become swollen, produce too much mucus and the muscles around the airways tighten. Asthma can range from mild to severe and can be life threatening. It is recognized that in some families, inherited factors play a role in an individual's risk for asth"

    },
    {
      "ID": 3,
      "Disease": "Asthma",
      "Discription": "What is asthma? Asthma is a condition that affects the airways. It makes it hard to breathe because the airways become swollen, produce too much mucus and the muscles around the airways tighten. Asthma can range from mild to severe and can be life threatening. It is recognized that in some families, inherited factors play a role in an individual's risk for asth"

    },
    {
      "ID": 4,
      "Disease": "Asthma",
      "Discription": "What is asthma? Asthma is a condition that affects the airways. It makes it hard to breathe because the airways become swollen, produce too much mucus and the muscles around the airways tighten. Asthma can range from mild to severe and can be life threatening. It is recognized that in some families, inherited factors play a role in an individual's risk for asth"

    },
    {
      "ID": 5,
      "Disease": "Asthma",
      "Discription": "What is asthma? Asthma is a condition that affects the airways. It makes it hard to breathe because the airways become swollen, produce too much mucus and the muscles around the airways tighten. Asthma can range from mild to severe and can be life threatening. It is recognized that in some families, inherited factors play a role in an individual's risk for asth"

    },
    {
      "ID": 6,
      "Disease": "Asthma",
      "Discription": "What is asthma? Asthma is a condition that affects the airways. It makes it hard to breathe because the airways become swollen, produce too much mucus and the muscles around the airways tighten. Asthma can range from mild to severe and can be life threatening. It is recognized that in some families, inherited factors play a role in an individual's risk for asth"

    },
    {
      "ID": 7,
      "Disease": "Asthma",
      "Discription": "What is asthma? Asthma is a condition that affects the airways. It makes it hard to breathe because the airways become swollen, produce too much mucus and the muscles around the airways tighten. Asthma can range from mild to severe and can be life threatening. It is recognized that in some families, inherited factors play a role in an individual's risk for asth"

    },
    {
      "ID": 8,
      "Disease": "Asthma",
      "Discription": "What is asthma? Asthma is a condition that affects the airways. It makes it hard to breathe because the airways become swollen, produce too much mucus and the muscles around the airways tighten. Asthma can range from mild to severe and can be life threatening. It is recognized that in some families, inherited factors play a role in an individual's risk for asth"

    },
]

type User = {
  name: string,
  email: string,
  picture:string,
  _id:string
}

const DiseaseFind = () => {
  // const context = useContext(UserContext)
  const context = {
    user: {
      name: 'Shahriar Rahman',
      email: 'srn@srn.com',
      picture: '',
      _id: "sfjq30949fei93r4j"
    }
  }
  const [value, setValue] = useState('');
  const [selectedDiseases, setSelectedDiseases] = useState<any[]>([]);


  const handleLogout = async()=>{
    console.log("logout")
    // AsyncStorage.removeItem('user_info')
    // context.setUser({
    //   name: "",
    //   email: "",
    //   picture: "",
    //   _id: "",
    // })
  }

  const changeHandle = (text: string) => {
    setValue(text);
  };

  const onSearch = (searchTerm: string) => {
    if (!selectedDiseases.some(disease => disease.Disease === searchTerm)) {
      const disease = data.find(item => item.Disease === searchTerm);
      if (disease) {
        setSelectedDiseases(prev => [...prev, disease]);
      }
    }
    setValue('');
  };

  const removeDisease = (diseaseToRemove: string) => {
    setSelectedDiseases(prev => prev.filter(disease => disease.Disease !== diseaseToRemove));
  };

  const findDisease = async () => {
    // const possibleDisese = await getDisease(selectedDiseases)
    console.log("first")
  }
  if(context.user._id != ''){
    return (
      <SafeAreaView style={styles.safeViewContainer}>
        <ScrollView style={{height: '100%'}}>
          <View style={styles.mainBox}>
            <Text style={styles.title}>DiseaseFinder</Text>
            <View style={styles.searchContainer}>
              <View style={styles.searchInner}>
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={changeHandle}
                  placeholder='Search Symptoms....'
                  placeholderTextColor="#888"
                />
              </View>
    
              <View style={styles.dropdown}>
                <ScrollView>
                  {
                    data
                      .filter(item => {
                        const searchTerm = value.toLocaleLowerCase();
                        const diseaseName = item.Disease.toLocaleLowerCase();
                        return searchTerm && diseaseName.startsWith(searchTerm) && diseaseName !== searchTerm;
                      })
                      .map(item => (
                        <TouchableOpacity
                          key={item.ID}
                          onPress={() => onSearch(item.Disease)}
                          style={styles.dropdownRow}
                        >
                          <Text style={styles.dropdownText}>{item.Disease}</Text>
                        </TouchableOpacity>
                      ))
                  }
                </ScrollView>

              </View>
            </View>
    
            <View style={{paddingHorizontal: 10}}>
              {selectedDiseases.length>0 ? (<Text style={{marginBottom:10}}>Selected Symptoms:</Text>): (<></>)}
              <View style={styles.tagsContainer}>
                {
                  selectedDiseases.map(disease => (
                    <View key={disease.ID} style={styles.tag}>
                      <Text style={styles.tagText}>{disease.Disease}</Text>
                      <TouchableOpacity onPress={() => removeDisease(disease.Disease)} style={styles.removeButton}>
                        <Text style={styles.removeButtonText}>✕</Text>
                      </TouchableOpacity>
                    </View>
                  ))
                }
              </View>
              <TouchableOpacity onPress={findDisease} style={styles.searchButtonBorder}>
                  <Text style={styles.searchButtonText}>Search Disease</Text>
              </TouchableOpacity>

              <Button icon="login" style={styles.buttonStyle} mode="contained" onPress={handleLogout}>
                        Logout
              </Button>
            </View>
    
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

export default DiseaseFind;

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
}
});