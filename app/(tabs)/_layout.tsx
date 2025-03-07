import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1a1a2e', 
          borderTopColor: '#16213e',  
        },
        tabBarActiveTintColor: '#E94560',    
        tabBarInactiveTintColor: '#bbb',      
        tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
      }}
    >
      <Tabs.Screen  name="productos" options={{
          title: 'Productos', tabBarIcon: ({ color }) => (<AntDesign name="tags" size={24} color={color} /> ),
        }} 
      />
      <Tabs.Screen  name="categorias" 
        options={{
          title: 'Categorías',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="list" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
