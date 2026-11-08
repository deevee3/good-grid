import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { Href } from 'expo-router';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';

export default function OnboardingScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/signup' as Href);
  };

  const handleLogin = () => {
    router.push('/login' as Href);
  };

  const handleSkip = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Placeholder for the food image - using a dark overlay for text readability */}
      <View style={styles.heroContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1543168256-418811576931?q=80&w=2400&auto=format&fit=crop' }}
          style={styles.heroImage}
        />
      </View>

      <SafeAreaView style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <View style={styles.paginationContainer}>
            <View style={[styles.paginationDot, styles.paginationDotActive]} />
            <View style={styles.paginationDot} />
            <View style={styles.paginationDot} />
          </View>

          <Text style={styles.title}>Bring good food home with Good Grid</Text>

          <Text style={styles.subtitle}>
            A smarter grid for good food, fair work, and healthier lives.
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipButtonText}>Skip tour</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
              <Text style={styles.getStartedButtonText}>Get started</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.loginText}>
            Already have account?{' '}
            <Text style={styles.loginLink} onPress={handleLogin}>
              Login
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heroContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 48,
    borderBottomRightRadius: 48,
  },
  contentContainer: {
    backgroundColor: '#fff',
  },
  textContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 28,
  },
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  paginationDot: {
    width: 24,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D1D5DB',
    marginRight: 8,
  },
  paginationDotActive: {
    backgroundColor: Colors.light.primary,
    width: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 16,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 40,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  skipButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    backgroundColor: '#111827',
  },
  skipButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  getStartedButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    backgroundColor: Colors.light.primary,
  },
  getStartedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '600',
  },
  loginLink: {
    color: Colors.light.primary,
    fontWeight: '800',
  },
});
