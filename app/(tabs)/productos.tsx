import {  ActivityIndicator,  FlatList, Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';

const Productos = () => {
  const router = useRouter();
  const { categoria } = useLocalSearchParams();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { width } = useWindowDimensions(); // Hook responsivo

  useEffect(() => {
    const consultarProductos = async () => {
      setCargando(true);
      try {
        let url = 'https://fakestoreapi.com/products';
        if (categoria) {
          url = `https://fakestoreapi.com/products/category/${categoria}`;
        }
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
          throw new Error(`Error al realizar la petición: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        setProductos(datos);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
      setCargando(false);
    };
    consultarProductos();
  }, [categoria]);

  // Componente de Producto (Tarjeta)
  const ProductoItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { width: width * 0.9 }]}  // Ancho dinámico para una sola columna
      activeOpacity={0.8}
      onPress={() =>
        router.push({
          pathname: `/productos/${item.id}`,
          params: { producto: JSON.stringify(item) },
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.imagen} />
      <View style={styles.infoContainer}>
        <Text style={styles.nombre} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.precio}>💲{item.price?.toFixed(2)}</Text>
        <Text numberOfLines={2} style={styles.descripcion}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (cargando) {
    return (
      <View style={styles.cargando}>
        <Text style={styles.titulo}>Cargando Productos...</Text>
        <ActivityIndicator size="large" color="#E94560" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {categoria ? `Productos de ${categoria}` : 'Todos los Productos'}
      </Text>
      <FlatList
        data={productos}
        renderItem={({ item }) => <ProductoItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatlistContainer}
      />
    </View>
  );
};

export default Productos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 15,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E94560',
    textAlign: 'center',
    marginBottom: 15,
    textTransform: 'uppercase',
  },
  flatlistContainer: {
    paddingBottom: 20,
  },
  cargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#0f3460',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  imagen: {
    width: '100%', // Se adapta al ancho de la tarjeta
    height: 150,
    resizeMode: 'contain',
    borderRadius: 5,
  },
  infoContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  precio: {
    fontSize: 16,
    color: '#28a745',
    fontWeight: 'bold',
  },
  descripcion: {
    fontSize: 12,
    color: '#ddd',
    textAlign: 'center',
  },
});
