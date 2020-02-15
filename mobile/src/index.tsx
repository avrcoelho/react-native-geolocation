import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import GeoLocation from '@react-native-community/geolocation';

type ICoordenates = {
  latitude: number;
  longitude: number;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7159c1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [coordinates, setCoordinates] = useState<ICoordenates>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    // obtem a posição do usuario
    // recebe 3 parametros:
    // Parametro 1: função de sucesso
    GeoLocation.getCurrentPosition(
      ({ coords }) => {
        setCoordinates(coords);
        setLoading(false);
      },
      error => {
        console.log(error);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 },
    );
  }, [coordinates]);

  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <MapView
          initialRegion={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.0068,
            longitudeDelta: 0.0068,
          }}
          style={styles.map}
        />
      )}
    </View>
  );
};

export default App;
