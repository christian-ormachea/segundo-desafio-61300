import React from 'react';
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Constants from 'expo-constants'
import { StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  Modal, } from 'react-native';




const kitchenLogo = { uri: 'https://cdn.pixabay.com/photo/2017/06/13/22/31/logo-2400338_960_720.png' }

const RECETAS = [
  {
    name: "Ensalada Caesar",
    id: 1,
  },
  {
    name: "Bolognesa",
    id: 2,
  },
  {
    name: "Langosta",
    id: 3,
  },
]


export default function App() {

  //ESTADO INPUT
  const  [inputValue, setInputValue] = useState('');
  const handleInputChange = (value) => setInputValue(value); 

  //ESTADO lISTA
  const [recipeItems, setRecipeItems] = useState([]);

  //AGREGAR ELEMENTOS A LISTA
  const addRecipe = () => {
    const newItem = {
      name: inputValue,
      id: new Date().getTime(),
    }
    setRecipeItems([...recipeItems, newItem])
  }

  //ELIMINAR ELEMENTOS DE LA LISTA
  const removeRecipe = () => {
    const filteredArray = (recipeItems).filter((recipe) => recipe.id !== itemSelected)
    setRecipeItems(filteredArray)
    setModalVisible(false)
  }

  const RemoveModal = () => {
    return(  
            <Modal animationType="slide" transparent visible={modalVisible} >
              <View style={styles.modalContainer}>
                <Text style={{fontSize: 20}}> Quiere eliminar la receta? </Text>

                <View style={styles.contenedorBotones}>
                  <Pressable onPress={() => removeRecipe(itemSelected)}>
                    <Text style={styles.botonDeSi}> Si 🫡</Text>
                  </Pressable>

                  <Pressable onPress={() => setModalVisible(false)}>
                    <Text style={styles.botonDeNo}> No 🙅‍♂️</Text>      
                  </Pressable>
                </View>
                
                
              </View>
            </Modal>
          )
}

  

  //ESTADO MODAL
  const [modalVisible, setModalVisible] = useState(false);
  //Estado del Elemento seleccionado del Modal
  const [itemSelected, setItemSelected] = useState(null);

  //HandleModal
  const handleModal = (id) => {
    setModalVisible(true);
    setItemSelected(id);
    console.log(id);
  } 

  return (
    <View style={styles.container}>
      <RemoveModal/>
      <View style={{ flex: 1 }}>
        <View style={styles.contenedorHeader}>
          <Text> Mi Cocina </Text>
          <Image source={kitchenLogo} style={styles.logo} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

          <TextInput style={styles.textInput} placeholder="Ingrese su receta" value={inputValue} onChangeText={handleInputChange}/>

          <Pressable onPress={addRecipe}>
            <Text style={styles.boton}> + </Text>
          </Pressable>

        </View>
        <View style={styles.listaDeRecetas}>
          <FlatList 
          data={recipeItems}

          renderItem={({ item }) => (
            <View style={{flexDirection: 'row', width: 400}}>
              <Text style={styles.receta}> {item.name} </Text>
              <Pressable onPress={() => handleModal(item.id)}>
                <Text style={{fontSize: 30}}> 🗑️ </Text>
              </Pressable>
            </View>
          )}

          keyExtractor={(receta) => receta.id}
          />
        </View>

        <Text> Valor del input: {inputValue}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  contenedorHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  textInput: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  listaDeRecetas:{
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
    paddingTop: 10,
  },
  receta:{
    fontSize: 15,
    fontWeight: 'bold',
  }, 
  boton:{
    fontSize: 35,
    borderColor: 'black',
    borderWidth: 0.5,
    backgroundColor: 'green',
    borderRadius: 3,
  },
  modalContainer:{
    height: 200,
    padding: 35,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contenedorBotones:{
    flexDirection: 'row',
    gap: 50,
    justifyContent: 'center',
  },
  botonDeNo:{
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  botonDeSi:{
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  }

});
