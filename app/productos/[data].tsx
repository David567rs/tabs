import { Image, StyleSheet, Text, ScrollView } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const DetalleProducto = () => {
  const { producto } = useLocalSearchParams();
  const productoJson = JSON.parse(producto || '{}');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>{productoJson.title}</Text>
      <Image source={{ uri: productoJson.image }} style={styles.imagen} />
      <Text style={styles.precio}>Precio: ${productoJson.price?.toFixed(2)}</Text>
      <Text style={styles.categoria}>Categoría: {productoJson.category}</Text>
      <Text style={styles.descripcion}>{productoJson.description}</Text>
      <Text style={styles.rating}>
        Valoración: {productoJson.rating?.rate} ({productoJson.rating?.count} reseñas)
      </Text>
    </ScrollView>
  );
};

export default DetalleProducto;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1a1a2e', // Fondo oscuro para coherencia
    padding: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#E94560', // Color de acento similar a otros títulos
    textAlign: 'center',
    marginBottom: 20,
  },
  imagen: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 20,
  },
  precio: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#28a745', // Verde para resaltar el precio
    marginBottom: 15,
  },
  categoria: {
    fontSize: 18,
    color: '#bbb',
    marginBottom: 15,
  },
  descripcion: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'justify',
    marginBottom: 15,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f39c12',
    marginTop: 15,
  },
});
