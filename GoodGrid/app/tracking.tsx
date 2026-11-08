import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, Dimensions, Platform } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

function MapSection() {
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.map, styles.mapPlaceholder]}>
        <View style={styles.mapPlaceholderContent}>
          <IconSymbol name="map.fill" size={48} color={Colors.light.primary} />
          <Text style={styles.mapPlaceholderText}>Live Map Tracking</Text>
          <Text style={styles.mapPlaceholderSubtext}>Your order is on the way!</Text>
        </View>
      </View>
    );
  }

  const MapView = require('react-native-maps').default;
  const { Marker, Polyline } = require('react-native-maps');

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: -7.9666,
        longitude: 112.6326,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker 
        coordinate={{ latitude: -7.9666, longitude: 112.6326 }} 
        title="Courier"
        description="Your order is here"
      >
        <View style={styles.courierMarker}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2960&auto=format&fit=crop' }} 
            style={styles.markerImage} 
          />
        </View>
      </Marker>
      
      <Marker coordinate={{ latitude: -7.9646, longitude: 112.6306 }} title="Destination" />

      <Polyline
        coordinates={[
          { latitude: -7.9666, longitude: 112.6326 },
          { latitude: -7.9660, longitude: 112.6320 },
          { latitude: -7.9650, longitude: 112.6310 },
          { latitude: -7.9646, longitude: 112.6306 },
        ]}
        strokeColor={Colors.light.primary}
        strokeWidth={4}
      />
    </MapView>
  );
}

export default function TrackingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <MapSection />

      {/* Header (Floating) */}
      <SafeAreaView style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <IconSymbol name="arrow.left" size={24} color="#fff" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* Bottom Sheet Card */}
      <View style={styles.bottomSheet}>
        <View style={styles.dragHandle} />
        
        {/* Coupon Section */}
        <View style={styles.couponContainer}>
          <View style={styles.couponLeft}>
             <Text style={styles.couponTitle}>Promo</Text>
          </View>
          <View style={styles.couponRight}>
             <Text style={styles.couponCode}>GOODGRID30</Text>
          </View>
        </View>

        {/* Delivery Time */}
        <View style={styles.deliveryInfo}>
            <Text style={styles.deliveryLabel}>Delivery time</Text>
            <View style={styles.deliveryTimeContainer}>
                <IconSymbol name="clock" size={16} color={Colors.light.primary} />
                <Text style={styles.deliveryTimeText}>30 minutes</Text>
            </View>
        </View>

        {/* Food Items */}
        <View style={styles.orderList}>
            <View style={styles.orderHeader}>
                <Text style={styles.orderTitle}>Items</Text>
                <TouchableOpacity>
                     <Text style={styles.addItemText}>+ Add item</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.orderItem}>
                <Text style={styles.itemName}>Local produce bundle</Text>
                <View style={styles.itemPriceContainer}>
                    <Text style={styles.itemQty}>1 x</Text>
                    <Text style={styles.itemPrice}>$12</Text>
                </View>
            </View>
             <View style={styles.orderItem}>
                <Text style={styles.itemName}>Fresh staples</Text>
                <View style={styles.itemPriceContainer}>
                    <Text style={styles.itemQty}>1 x</Text>
                    <Text style={styles.itemPrice}>$10</Text>
                </View>
            </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: width,
    height: height,
  },
  mapPlaceholder: {
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderContent: {
    alignItems: 'center',
  },
  mapPlaceholderText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.primary,
    marginTop: 12,
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  headerContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  backText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
  },
  courierMarker: {
    padding: 4,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 5,
  },
  markerImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  couponContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.light.primary,
    borderRadius: 12,
    height: 60,
    marginBottom: 24,
    overflow: 'hidden',
  },
  couponLeft: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  couponTitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  couponRight: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  couponCode: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  deliveryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  deliveryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  deliveryTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryTimeText: {
    marginLeft: 8,
    color: '#888',
  },
  orderList: {
    marginBottom: 20,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  addItemText: {
    fontSize: 14,
    color: '#888',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  itemName: {
    fontSize: 14,
    color: '#888',
  },
  itemPriceContainer: {
    flexDirection: 'row',
  },
  itemQty: {
    fontSize: 14,
    color: '#888',
    marginRight: 8,
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
});
