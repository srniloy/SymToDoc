import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import { colors } from '../constants/colors';

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
        "Disease": "Breast Cancer",
        "Discription": "According to the Centers for Disease Control and Prevention each year in the United States, about 237,000 cases of breast cancer are diagnosed in women and about 2,100 in men. About 41,000 women and 450 men in the U.S. die each year from breast cancer. In 2015, Illinois"

    },
    {
        "ID": 4,
        "Disease": "Carbon Monoxide",
        "Discription": "What Is Carbon Monoxide? Carbon monoxide (CO) is a non-irritating, odorless, colorless gas that is somewhat lighter than air. A by-product of incomplete burning of coal, wood, charcoal, natural gas, fuel oil, kerosene, gasoline, fabrics and plastics, it is the leading cause of poisoning deaths"

    }
]

type User = {
  name: string,
  email: string,
  picture:string,
  _id:string
}

const DashboardScreen = () => {
  const context = useContext(UserContext)
  const [value, setValue] = useState('');
  const [selectedDiseases, setSelectedDiseases] = useState<any[]>([]);


  const handleLogout = async()=>{
    console.log("logout")
    AsyncStorage.removeItem('user_info')
    context.setUser({
      name: "",
      email: "",
      picture: "",
      _id: "",
    })
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
      <View style={styles.mainBox}>
        <View style={styles.app}>
          <Text style={styles.title}>DiseaseSearch</Text>
          <Text style={styles.title}>{context.user?.name}</Text>
          <View style={styles.searchContainer}>
            <View style={styles.searchInner}>
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={changeHandle}
                placeholder='Search Diseases....'
                placeholderTextColor="#888"
              />
            </View>
  
            <ScrollView style={styles.dropdown}>
              {
                data
                  .filter(item => {
                    const searchTerm = value.toLocaleLowerCase();
                    const diseaseName = item.Disease.toLocaleLowerCase();
                    return searchTerm && diseaseName.startsWith(searchTerm) && diseaseName !== searchTerm;
                  })
                  .slice(0, 5)
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
  
          {/* Render the selected diseases as tags */}
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
    );
  }else{
    return(
      <View style={{height: '100%',display: 'flex', justifyContent: 'center', alignItems:'center'}}>
        <Text style={{fontSize: 26}}>Invalid Request</Text>
      </View>
    )
  }
};

export default DashboardScreen;

const styles = StyleSheet.create({
  mainBox: {
    width: '85%'
  },
  app: {
    // backgroundColor: 'grey'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center'
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
  },
  dropdownRow: {
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 17,
    marginRight: 17,
  },
  dropdownText: {
    fontSize: 16,
  },
  // Styles for the selected disease tags
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
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
    paddingVertical: 2,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
  },

  searchButtonBorder: {
    backgroundColor: 'blue',
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