import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const API_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:3000'
    : 'http://169.254.31.163:3000';

const ShoeListScreen = ({navigation, favorites = [], setFavorites}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/shoes`)
      .then(response => response.json())
      .then(data => setShoes(data))
      .catch(error => console.error('Error fetching shoes:', error));
  }, []);

  const toggleFavorite = shoe => {
    if (favorites.some(fav => fav.id === shoe.id)) {
      setFavorites(favorites.filter(fav => fav.id !== shoe.id));
    } else {
      setFavorites([...favorites, shoe]);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔍 Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="🔍 Search Shoes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#888"
        />
      </View>

      {/* 🏀 Shoe List */}
      <FlatList
        data={shoes.filter(shoe =>
          shoe.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{paddingBottom: 20}}
        renderItem={({item}) => {
          const isFavorite = favorites.some(fav => fav.id === item.id);

          return (
            <View style={styles.shoeItem}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ShoeDetails', {shoe: item})
                }>
                <Image source={{uri: item.image}} style={styles.shoeImage} />
              </TouchableOpacity>

              <View style={styles.shoeInfo}>
                <Text style={styles.shoeName}>{item.name}</Text>
                <Text style={styles.shoeBrand}>{item.brand}</Text>
                <Text style={styles.shoePrice}>${item.price}</Text>
              </View>

              {/* ⭐️ Favorite Button (Golden Star) */}
              <TouchableOpacity
                onPress={() => toggleFavorite(item)}
                style={[
                  styles.favoriteButton,
                  isFavorite && styles.favoriteButtonActive,
                ]}>
                <Ionicons
                  name={isFavorite ? 'star' : 'star-outline'}
                  size={22}
                  color={isFavorite ? '#FFD700' : '#888'}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f5f5f5', padding: 10},

  searchContainer: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  searchBar: {height: 40, fontSize: 16, color: '#333'},

  shoeItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  shoeImage: {width: 80, height: 80, borderRadius: 10, marginRight: 15},

  shoeInfo: {flex: 1},
  shoeName: {fontSize: 18, fontWeight: 'bold', color: '#333'},
  shoeBrand: {fontSize: 14, color: 'gray'},
  shoePrice: {fontSize: 16, color: '#007AFF', fontWeight: 'bold'},

  favoriteButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
  },

  favoriteButtonActive: {backgroundColor: '#fff'},
});

export default ShoeListScreen;
