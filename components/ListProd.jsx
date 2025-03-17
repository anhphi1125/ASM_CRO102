import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlashList } from '@shopify/flash-list'
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';

const ListProd = (props) => {
    const {
        title,
        data,
        more,
    } = props;

    const formatCurrency = (amount) => {
        return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
    };

    const renderTrees = ({ item, index }) => {
        if (index <= 5) {
            return (
                <TouchableOpacity style={[styles.prodContainer,
                index % 2 != 0 && { position: 'absolute', right: 0 }
                ]}>

                    <View style={styles.imgProd}>
                        <Image source={item.img} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
                    </View>
                    <Text style={styles.textM} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
                    {
                        item.preference && (
                            <Text style={styles.textS} numberOfLines={1} ellipsizeMode='tail'>{item.preference}</Text>
                        )
                    }
                    <Text style={[styles.textM, { color: '#007537' }]}>{formatCurrency(item.price)}</Text>

                </TouchableOpacity>
            );
        }
    };
    return (
        <View>
            {title && (
                <Text style={[styles.textL, {marginTop: 15}]}>{title}</Text>
            )}
            {data && (
                <View style={{ marginTop: 15 }}>
                    <FlashList
                        data={data}
                        renderItem={renderTrees}
                        numColumns={2}
                    />
                </View>
            )}
            {more && (
                <TouchableOpacity>
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