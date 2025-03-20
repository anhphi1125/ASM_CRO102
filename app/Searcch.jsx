import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { FlashList } from '@shopify/flash-list';
import LoadSearch from '@/components/LoadSearch';
import debounce from 'lodash.debounce';
import AxiosInstance from '@/helpers/AxiosInstance';

const prod = [
    {
    name: "Spider Plan",
    type: "Cây trồng",
    price: "270000",
    quantity: 20,
    reference: "Ưa bóng",
    img: require('@/assets/images/tree.png'),
    origin: 'Việt Nam',
    size: 'Nhỏ'
  },
  {
    name: "Spider Plan",
    type: "Cây trồng",
    price: "270000",
    quantity: 20,
    reference: "Ưa bóng",
    img: require('@/assets/images/tree.png'),
    origin: 'Việt Nam',
    size: 'Nhỏ'
  },
  {
    name: "Spider Plan",
    type: "Cây trồng",
    price: "270000",
    quantity: 20,
    reference: "Ưa bóng",
    img: require('@/assets/images/tree.png'),
    origin: 'Việt Nam',
    size: 'Nhỏ'
  },
];

const Searcch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    const search = debounce( async (query) => {
        if(!query.trim()){
            setResults([]);
            return;
        }

        try {
            const res = await AxiosInstance().get(`/prod/search?query=${query}`);
            setResults(res.products);
        } catch (error) {
            console.log("Lỗi khi tìm kiếm:", error);
        }
    }, 300);

    useEffect(() => {
        search(searchTerm);
    }, [searchTerm]);

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <Header
                iconLeft={require('../assets/icons/chevron-left.png')}
                title="TÌM KIẾM"
            />
            <View style={styles.inputContainer}>
                <TextInput placeholder='Tìm kiếm'
                placeholderTextColor={'#7D7B7B'}
                value={searchTerm}
                onChangeText={setSearchTerm}
                style={styles.input}
                />
                <Image
                source={require('@/assets/icons/search.png')}
                style={styles.icon}/>
            </View>
            <View style={{marginHorizontal: 48}}>
                <FlashList
                data={results}
                renderItem={({item, index}) => {
                    return (
                        <LoadSearch
                            name = {item.name}
                            img = {item.image}
                            quantity = {item.quantity}
                            price = {item.price}
                        />
                    );
                }}/>
            </View>
        </View>
    )
}

export default Searcch

const styles = StyleSheet.create({
    input: {
        height: 33,
        borderBottomWidth: 1.5,
        fontSize: 18,
    },
    inputContainer: {
        marginHorizontal: 48,
        marginBottom: 40,
        justifyContent: 'center'
    },
    icon: {
        width: 24, height: 24,
        position: 'absolute',
        right: 0
    }
})