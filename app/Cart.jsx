import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ListCart from '../components/ListCart';
import Muc from '@/components/Muc';
import ButtonCustom from '@/components/ButtonCustom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '@/slices/cartSlice';
import { useNavigation } from '@react-navigation/native';


const Cart = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  const handleCheckboxChange = (updatedItems) => {
    setSelectedItems(updatedItems);
  };

  const getSelectedProd = () => {
    return cart.filter(item => {
      return selectedItems.some(selectedItem => selectedItem === item.id);
    });
  };
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const selectedProduct = getSelectedProd();
    const total = selectedProduct.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotalPrice(total);
  }, [selectedItems, cart]);

  const handleDeleteSelected = () => {
    selectedItems.forEach(item => {
      dispatch(removeFromCart({
        id: item,
      }))
    });
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        iconLeft={require('../assets/icons/chevron-left.png')}
        iconLeftColor="#000000"
        title={"GIỎ HÀNG"}
        iconRight={require('../assets/icons/trash.png')}
        onPressRight={handleDeleteSelected}
      />
      <ScrollView style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <ListCart data={cart} onCheckboxChange={handleCheckboxChange}/>
      </ScrollView>
      <View style={{paddingHorizontal: 28, paddingVertical: 10}}>
      <Muc
        title={"Tạm tính"}
        content={formatCurrency(totalPrice)}
        borderWidth={0}
        size={16}
        color={"#000000"}
        textColor={"#666666"}
        marB={10}
        />
        <ButtonCustom btn={"Tiến hành thanh toán"} btnColor={"#007537"} btnRight={true} onPress={() => {
          if(totalPrice != formatCurrency(0)){
            navigation.navigate('Payment', {selectedItems, totalPrice})
          }
        }}/>
      </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
  }
})