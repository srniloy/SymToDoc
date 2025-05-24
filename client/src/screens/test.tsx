import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { FindDisease, GetSymptoms } from '../services/disease-find-service';

const { width, height } = Dimensions.get('window');
const isSmallScreen = height <= 667;

// Type definitions
type Disease = {
  id: number;
  disease: string;
  description: string;
  weight: number;
  specialization: string;
};

type DiseaseResultCardProps = {
  disease: string;
  description: string;
  weight: number;
  specialization: string
};

// const ALL_SYMPTOMS: string[] = [
//   "Fever", "Headache", "Fatigue", "Nausea", "Vomiting",
//   "Abdominal pain", "Yellow skin", "Dark urine", "Loss of appetite",
//   "Muscle pain", "Rash", "Itching", "Constipation", "Diarrhea",
//   "Chills", "Cough", "Sore throat", "Runny nose"
// ];

const DiseaseResultCard: React.FC<DiseaseResultCardProps> = ({ disease, description, weight, specialization }) => {
  return (
    <View style={styles.resultCard}>
      <View style={styles.resultCardHeader}>
        <Text style={styles.diseaseName}>{disease}</Text>
        <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(weight) }]}>
          <Text style={styles.severityText}>{weight}/5 Probability</Text>
        </View>
      </View>
      <Text style={styles.diseaseDescription}>{description}</Text>
      <Text style={styles.diseaseSpecialization}>{"Visit to a "} <Text style={{fontWeight:'bold'}}>{specialization}</Text> {" to get treatment for this."}</Text>
    </View>
  );
};

const getSeverityColor = (weight: number): string => {
  if (weight >= 4) return '#fee2e2'; // red-100
  if (weight >= 3) return '#ffedd5'; // orange-100
  return '#ecfccb'; // lime-100
};

const SymptomInputScreen: React.FC = () => {

  const [symptoms, setSymptoms] = useState<any[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredSymptoms, setFilteredSymptoms] = useState<string[]>([]);
  const [results, setResults] = useState<Disease[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  

  useEffect(() => {
      const getSymptoms = async ()=>{
        const res:any = await GetSymptoms();
        const ALL_SYMPTOMS = res.data.symptoms
        const processedSymptoms = ALL_SYMPTOMS.map((item:any) => {return item.symptom});
        const uniqueSymptoms = Array.from(new Set(processedSymptoms)) as string[];
        // setSymptoms(s)
        setFilteredSymptoms(uniqueSymptoms)
      }
      getSymptoms()
    }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredSymptoms(symptoms);
    } else {
      setFilteredSymptoms(
        symptoms.filter(symptom =>
          symptom.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery]);

  const toggleSymptom = (symptom: string): void => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const removeSymptom = (symptom: string): void => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
  };

  const submitSymptoms = (): void => {
    if (selectedSymptoms.length === 0) return;
    console.log(selectedSymptoms);
    setIsLoading(true);
    setTimeout( async () => {
      const res:any = await FindDisease(selectedSymptoms)
      // const mockResults: Disease[] = [
      //   {"id": 0, "disease": "Jaundice", "description": "Yellow staining of the skin and sclerae (the whites of the eyes) by abnormally high blood levels of the bile pigment bilirubin.", "weight": 5},
      //   {"id": 1, "disease": "Hepatitis B", "description": "Hepatitis B is an infection of your liver. It can cause scarring of the organ, liver failure, and cancer.", "weight": 4},
      // ];
      setResults(res.data.diseases)
      // setResults(mockResults);
      setIsLoading(false);
      setShowResults(true);
    }, 1500);
  };

  const resetForm = (): void => {
    setSelectedSymptoms([]);
    setResults(null);
    setShowResults(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.container}>
        {!showResults ? (
          <>
            <Text style={styles.title}>What symptoms are you experiencing?</Text>
            
            <Text style={styles.subtitle}>Select all that apply</Text>
            
            {/* Search input */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search symptoms..."
                placeholderTextColor="#94a3b8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            
            {/* Selected symptoms chips */}
            {selectedSymptoms.length > 0 && (
              <View style={styles.selectedContainer}>
                <Text style={styles.selectedTitle}>Selected:</Text>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.chipsContainer}
                >
                  {selectedSymptoms.map(symptom => (
                    <TouchableOpacity 
                      key={symptom} 
                      style={styles.symptomChip}
                      onPress={() => removeSymptom(symptom)}
                    >
                      <Text style={styles.symptomChipText}>{symptom.split('_')
                        .map((word:String) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}</Text>
                      <Text style={styles.symptomChipRemove}>×</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
            
            {/* Symptoms list */}
            <View style={styles.symptomsListContainer}>
              <FlatList
                data={filteredSymptoms}
                keyExtractor={(item) => item}
                scrollEnabled={true}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => toggleSymptom(item)}
                    key={item}
                    style={[
                      styles.symptomItem,
                      selectedSymptoms.includes(item) && styles.selectedSymptomItem
                    ]}
                  >
                    <Text style={styles.symptonText}>{item.split('_')
                      .map((word:String) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}</Text>
                    {selectedSymptoms.includes(item) && (
                      <View style={styles.selectedIndicator}>
                        <Text style={styles.selectedIndicatorText}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <View style={styles.emptyListContainer}>
                    <Text style={styles.emptyListText}>No symptoms found matching "{searchQuery}"</Text>
                  </View>
                }
                contentContainerStyle={styles.symptomsListContent}
              />
            </View>
            
            {/* Submit button */}
            <TouchableOpacity
              onPress={submitSymptoms}
              disabled={selectedSymptoms.length === 0 || isLoading}
              style={[
                styles.submitButton,
                selectedSymptoms.length === 0 && styles.disabledButton
              ]}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.submitButtonText}>
                  Analyze Symptoms {selectedSymptoms.length > 0 && `(${selectedSymptoms.length})`}
                </Text>
              )}
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle}>Possible Conditions</Text>
              <TouchableOpacity onPress={resetForm} style={styles.startOverButton}>
                <Text style={styles.startOverButtonText}>Start Over</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.resultsSubtitle}>
              Based on: {selectedSymptoms.map((item:any) => {return item.split('_')
                        .map((word:String) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}).join(', ')}
            </Text>
            
            <View style={styles.resultsContainer}>
  <FlatList
    data={results}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <DiseaseResultCard
        disease={item.disease}
        description={item.description}
        weight={5-item.id}
        specialization={item.specialization}
      />
    )}
    ListEmptyComponent={
      <View style={styles.emptyResultsContainer}>
        <Text style={styles.emptyResultsText}>No matching conditions found</Text>
      </View>
    }
    contentContainerStyle={styles.resultsContentContainer}
  />
</View>
            
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  resultsContainer: {
    marginBottom: 16,
    paddingBottom: 16
  },
  resultsContentContainer: {
    paddingBottom: 20,
    flexGrow: 1, // Important for proper scrolling
  },
  emptyResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 400, // Match container height
  },
  emptyResultsText: {
    color: '#94a3b8',
    textAlign: 'center',
  },
  
  symptomsListContent: {
    paddingVertical: 8,
  },
  symptomItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  symptomsListContainer: {
    height: 300,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  emptyListContainer: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 40,
  },
  title: {
    fontSize: isSmallScreen ? 22 : 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
    lineHeight: 28,
  },
  subtitle: {
    fontSize: isSmallScreen ? 14 : 16,
    color: '#64748b',
    marginBottom: 24,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: isSmallScreen ? 12 : 14,
    fontSize: isSmallScreen ? 15 : 16,
    color: '#334155',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  selectedContainer: {
    marginBottom: 12,
  },
  selectedTitle: {
    fontSize: isSmallScreen ? 14 : 15,
    color: '#64748b',
    marginBottom: 8,
  },
  symptomChip: {
    backgroundColor: '#e0f2fe',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  symptomChipText: {
    color: '#0369a1',
    fontSize: isSmallScreen ? 13 : 14,
  },
  symptomChipRemove: {
    marginLeft: 4,
    color: '#0284c7',
    fontWeight: 'bold',
    fontSize: isSmallScreen ? 14 : 16,
  },
  selectedSymptomItem: {
    backgroundColor: '#f0f9ff',
    borderColor: '#bae6fd',
  },
  symptonText: {
    color: '#1e293b',
    fontSize: isSmallScreen ? 15 : 16,
    flex: 1,
  },
  
  selectedIndicator: {
    backgroundColor: '#38bdf8',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  selectedIndicatorText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyListText: {
    color: '#94a3b8',
    textAlign: 'center',
    paddingVertical: 20,
    fontSize: isSmallScreen ? 14 : 15,
  },
  submitButton: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    paddingVertical: isSmallScreen ? 14 : 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: '#cbd5e1',
    shadowColor: 'transparent',
  },
  submitButtonText: {
    color: 'white',
    fontSize: isSmallScreen ? 16 : 17,
    fontWeight: '600',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: isSmallScreen ? 22 : 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  startOverButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  startOverButtonText: {
    color: '#2563eb',
    fontSize: isSmallScreen ? 15 : 16,
    fontWeight: '500',
  },
  resultsSubtitle: {
    fontSize: isSmallScreen ? 14 : 15,
    color: '#64748b',
    marginBottom: 20,
    lineHeight: 20,
  },
  resultCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  resultCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  diseaseName: {
    fontSize: isSmallScreen ? 17 : 18,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
    marginRight: 12,
  },
  severityBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  severityText: {
    fontSize: isSmallScreen ? 12 : 13,
    fontWeight: '500',
    color: '#1e293b',
  },
  diseaseDescription: {
    color: '#475569',
    fontSize: isSmallScreen ? 14 : 15,
    lineHeight: 20,
  },
  diseaseSpecialization:{
    color: '#475569',
    fontSize: isSmallScreen ? 14 : 15,
    lineHeight: 20,
    marginTop: 10
  },
});

export default SymptomInputScreen;