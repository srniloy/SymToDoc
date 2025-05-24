import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../constants/colors';
import { UserContext } from '../contexts/UserContext';
import { StatusBar } from 'expo-status-bar';

interface UserProfileProps {
    name: string;
    email: string;
    onLogout: () => void;
}

const ProfileScreen: React.FC<UserProfileProps> = ({ name, email, onLogout }) => {
    // Get initials from name
    const context = useContext(UserContext)

    const getInitials = (fullName: string) => {
        const names = fullName.split(' ');
        return names
            .map((n) => n[0])
            .join('')
            .toUpperCase();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileContainer}>
                {/* Profile Picture with Initials */}
                <View style={styles.profilePic}>
                    <Text style={styles.initials}>{getInitials(context.user.name).substring(0, 2)}</Text>
                </View>

                {/* User Info */}
                <Text style={styles.name}>{context.user.name}</Text>
                <Text style={styles.email}>{context.user.email}</Text>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
                    <Text style={styles.logoutButtonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
            <StatusBar  backgroundColor="#161622" style="light"/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    profileContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    profilePic: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#3f51b5',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    initials: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white',
    },
    name: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    logoutButton: {
        backgroundColor: '#c14c1c',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        width: '50%',
        marginTop: 100,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonStyle: {
        backgroundColor: colors.secondary,
        marginTop: 20,
        width: 150,
    },
});

export default ProfileScreen;