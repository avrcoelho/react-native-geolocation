import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import GeoLocation from '@react-native-community/geolocation';

import api from './services/api';

type ICoordenates = {
  latitude: number;
  longitude: number;
};

type IData = {
  latitude: number;
  longitude: number;
  id: number;
  name: string;
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
  const [points, setPoints] = useState<Array<any>>([]);

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

  useEffect(() => {
    async function getData() {
      try {
        const { data }: { data: IData[] } = await api.get('/points', {
          params: coordinates,
        });

        setPoints(data);
      } catch (error) {
        console.log(error);
      }
    }

    if (coordinates) {
      getData();
    }
  }, [coordinates]);

  function renderPoints() {
    return points.map((point: IData) => (
      <Marker
        key={point.id}
        coordinate={{
          latitude: point.latitude,
          longitude: point.longitude,
        }}
        title={point.name}
      />
    ));
  }

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
          style={styles.map}>
          {renderPoints()}
        </MapView>
      )}
    </View>
  );
};

export default App;
