import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlashList } from '@shopify/flash-list'
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import AxiosInstance from '@/helpers/AxiosInstance';

const ListProd = (props) => {
    const {
        title,
        onPress,
        more,
        isLarge,
        type,
        onPressMore,
        attribute,
    } = props;

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getProduct = async () => {
            try {
                setLoading(true);
                let res = null;

                if (type){
                    res = await AxiosInstance().get(`prod/prodByType?type=${type}`);
                    console.log("typetype nè: ", res);
                }else if (attribute){
                    res = await AxiosInstance().get(`prod/prodByAttribute?attribute=${attribute}`);
                    console.log("attribute nè: ", res);
                }
                
                if(res && res.products){
                    setProducts(res.products);
                }else{
                    console.log("không tìm thấy sản phẩm")
                }
            } catch (error) {
                console.log(error);
            } finally{
                setLoading(false);
            }
        };
        getProduct();
    }, [type, attribute]);

    const formatCurrency = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
    };

    const renderTrees = ({ item, index }) => {
     
            return (
                <TouchableOpacity style={[styles.prodContainer,
                index % 2 != 0 && { position: 'absolute', right: 0 }
                ]}
                onPress={() => onPress(item._id)}>

                    <View style={styles.imgProd}>
                        <Image source={{uri: item.image}} style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }} resizeMode='contain' />
                    </View>
                    <Text style={styles.textM} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
                    {
                        item.preference && (
                            <Text style={styles.textS} numberOfLines={1} ellipsizeMode='tail'>{item.attribute}</Text>
                        )
                    }
                    <Text style={[styles.textM, { color: '#007537' }]}>{formatCurrency(item.price)}</Text>

                </TouchableOpacity>
            );
    };
    return (
        <View style={isLarge && {flex: 1}}>
            {title && (
                <Text style={[styles.textL, {marginTop: 15}]}>{title}</Text>
            )}
            {type && (
                <View style={{ marginTop: 15, flex: 1 }}>
                    <FlashList
                        data={isLarge ? products : products.slice(0, 6)}
                        renderItem={renderTrees}
                        numColumns={2}
                    />
                </View>
            )}
            {attribute && (
                <View style={{ marginTop: 15, flex: 1 }}>
                    <FlashList
                        data={isLarge ? products : products.slice(0, 6)}
                        renderItem={renderTrees}
                        numColumns={2}
                    />
                </View>
            )}
            {products.length === 0 && <Text>Không có sản phẩm nào</Text>}
            {more && (
                <TouchableOpacity onPress={() => onPressMore(more)}>
                    <Text style={[styles.textM, {textAlign:'right', textDecorationLine: 'underline'}]}>Xem thêm {more}</Text>
                </TouchableOpacity>
            )}

        </View>
    )
}

export default ListProd

const styles = StyleSheet.create({
    prodContainer: {
        width: '95%',
        marginBottom: 15
    },
    imgProd: {
        height: 140,
        width: '100%',
        backgroundColor: '#F6F6F6',
        borderRadius: 8
    },
    textS: {
        fontSize: 14,
        fontWeight: 'regular',
        color: '#7D7B7B'
    },
    textM: {
        fontSize: 16,
        fontWeight: 'semibold'
    },
    textL: {
        fontSize: 24,
        fontWeight: '500'
    },
})