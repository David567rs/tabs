import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const categorias = [
  { id: 'electronics', name: 'Electrónica📺' },
  { id: 'jewelery', name: 'Joyería 💎' },
  { id: "men's clothing", name: 'Ropa Hombre👔' },
  { id: "women's clothing", name: 'Ropa Mujer👗' }
];

const Categorias = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Categorías</Text>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.categoria} 
            onPress={() => router.push(`/productos?categoria=${item.id}`)}
          >
            <Text style={styles.categoriaTexto}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Categorias;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e', 
    padding: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E94560', 
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  lista: {
    width: '100%',
    alignItems: 'center',
  },
  categoria: {
    backgroundColor: '#0f3460',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    margin: 8,
    width: '42%', 
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  categoriaTexto: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
