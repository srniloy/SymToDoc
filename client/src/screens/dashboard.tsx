import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import DiseaseFind from './disease-find';
import DiseaseSave from './disease-save';

const Disease_Find = () => <DiseaseFind/>

const Disease_Save = () => <DiseaseSave/>

const RecentsRoute = () => <Text>Doctor search</Text>;

const NotificationsRoute = () => <Text>Profile</Text>;

const DashboardScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'disease_find', title: 'Find Disease', focusedIcon: 'text-box-search', unfocusedIcon: 'text-box-search-outline'},
    { key: 'doctor_find', title: 'Find Doctor', focusedIcon: 'account-clock', unfocusedIcon: 'account-clock-outline' },
    { key: 'saved', title: 'Saved', focusedIcon: 'content-save-check', unfocusedIcon: 'content-save-check-outline' },
    { key: 'profile', title: 'Profile', focusedIcon: 'account-circle', unfocusedIcon: 'account-circle-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    disease_find: Disease_Find,
    doctor_find: RecentsRoute,
    saved: Disease_Save,
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