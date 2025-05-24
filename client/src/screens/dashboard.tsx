import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import ProfileScreen from './profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../contexts/UserContext';
import SymptomInputScreen from './disease-find';



const DashboardScreen = () => {

  const context = React.useContext(UserContext)


  const handleLogout = () => {
      console.log("logout")
      AsyncStorage.removeItem('user_info')
      context.setUser({
        name: "",
        email: "",
        picture: "",
        _id: "",
      })
    };

  const Disease_Find = () => <SymptomInputScreen/>

  const NotificationsRoute = () => <ProfileScreen name="John Doe" 
        email="john.doe@example.com" 
        onLogout={handleLogout} />;
  const [index, setIndex] = React.useState(0);
  //   const [routes] = React.useState([
  //   { key: 'disease_find', title: 'Find Disease', focusedIcon: 'text-box-search', unfocusedIcon: 'text-box-search-outline'},
  //   { key: 'doctor_find', title: 'Find Doctor', focusedIcon: 'account-clock', unfocusedIcon: 'account-clock-outline' },
  //   { key: 'saved', title: 'Saved', focusedIcon: 'content-save-check', unfocusedIcon: 'content-save-check-outline' },
  //   { key: 'profile', title: 'Profile', focusedIcon: 'account-circle', unfocusedIcon: 'account-circle-outline' },
  // ]);
  const [routes] = React.useState([
    { key: 'disease_find', title: 'Find Disease', focusedIcon: 'text-box-search', unfocusedIcon: 'text-box-search-outline'},
    { key: 'profile', title: 'Profile', focusedIcon: 'account-circle', unfocusedIcon: 'account-circle-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    disease_find: Disease_Find,
    profile: NotificationsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default DashboardScreen;