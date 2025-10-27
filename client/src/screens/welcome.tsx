import { Image, ScrollView, StyleSheet, Text, View, ActivityIndicator, Linking } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import { colors } from '../constants/colors';
import { UserContext } from '../contexts/UserContext';
import { WakeUpServer } from '../services/auth-service';

const WelcomeScreen = ({ navigation }: any) => {
    const context = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [serverStatus, setServerStatus] = useState<'awake' | 'waking' | 'error'>('waking');
    const [htmlSnippet, setHtmlSnippet] = useState<string | null>(null);

    useEffect(() => {
        const checkServer = async () => {
            setLoading(true);

            // After 5s, show “waking up” message
            const wakeTimeout = setTimeout(() => {
                setServerStatus("waking");
            }, 5000);

            try {
                const res = await WakeUpServer();
                if (res.status === "awake") {
                    clearTimeout(wakeTimeout);
                    setServerStatus("awake");
                } else {
                    setServerStatus("error");
                }
            } catch (e) {
                clearTimeout(wakeTimeout);
                setServerStatus("error");
            } finally {
                setLoading(false);
            }
        };

        checkServer();
    }, []);


    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={{ color: '#000', marginTop: 10 }}>Checking server status...</Text>
                <StatusBar backgroundColor="#161622" style="light" />
            </SafeAreaView>
        );
    }

    // 💤 Server waking (Render returning HTML)
    if (serverStatus === 'waking') {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={{ color: '#000', textAlign: 'center', marginTop: 10 }}>
                    Server is waking up, please wait a few seconds...
                </Text>

            </SafeAreaView>
        );
    }

    // ❌ Error
    if (serverStatus === 'error') {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <Text style={{ color: 'red', textAlign: 'center' }}>
                    Could not reach server. Please try again later.
                </Text>
                <Button mode="contained" onPress={() => navigation.navigate('WelcomeScreen')}>
                    Retry
                </Button>
            </SafeAreaView>
        );
    }

    // ✅ Normal UI when server awake
    return (
        <SafeAreaView style={{ backgroundColor: colors.bg, height: '100%', flex: 1 }}>
            <ScrollView
                contentContainerStyle={{ width: '100%', display: 'flex', justifyContent: 'center', flex: 1 }}
            >
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                        <Image style={styles.logo} source={require('../../assets/logo.png')} />
                        <Image style={styles.imageStye} source={require('../../assets/telemedicine.png')} />
                        <Text style={styles.heading2}>
                            Identify Diseases with{'\n'}
                            <Text style={styles.headingKeyword}>SymToDoc</Text>
                        </Text>
                        <Text style={styles.subText}>
                            A place where everyone can find possible diseases{'\n'}from symptoms and a path to cure.
                        </Text>
                    </View>
                    <View style={styles.continueBar}>
                        <View style={{ height: 1, width: 100, backgroundColor: '#999' }}></View>
                        <Text style={{ color: '#777', fontSize: 12 }}>Continue With</Text>
                        <View style={{ height: 1, width: 100, backgroundColor: '#999' }}></View>
                    </View>
                    <Button
                        icon="login"
                        style={styles.buttonStyle}
                        mode="contained"
                        onPress={() => navigation.navigate('SignIn')}
                    >
                        Sign In
                    </Button>
                </View>
            </ScrollView>
            <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        height: 100,
        width: 200,
        marginVertical: 20,
        resizeMode: 'center',
    },
    imageStye: {
        height: 200,
        width: 300,
        resizeMode: 'center',
    },
    heading2: {
        marginTop: 15,
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
    },
    headingKeyword: {
        fontSize: 28,
        color: colors.primary,
    },
    subText: {
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center',
    },
    continueBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
        width: '100%',
        marginTop: 30,
    },
    buttonStyle: {
        backgroundColor: colors.secondary,
        marginTop: 20,
        width: 250,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: colors.bg,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
