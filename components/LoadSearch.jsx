import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';

const LoadSearch = (props) => {
    const formatCurrency = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
    };
    const {
        img,
        name,
        price,
        quantity
    } = props
    return (
        <TouchableOpacity style={styles.container}>
            {
                img && (
                    <Image source={img} style={styles.img} />
                )
            }
            <View style={styles.content}>
                {
                    name && (
                        <Text style={styles.textM}>{name}</Text>
                    )
                }
                {
                    price && (
                        <Text style={styles.textM}>{formatCurrency(price)}</Text>
                    )
                }
                {
                    quantity && (
                        <Text>Còn {quantity} sp</Text>
                    )
                }
            </View>
        </TouchableOpacity>
    )
}

export default LoadSearch

const styles = StyleSheet.create({
    textS: {
        fontSize: 14,
        fontWeight: 'ultralight',
        lineHeight: 20
    },
    textM: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 22
    },
    content: {
        justifyContent: 'center',
        width: '65%',
        height: 77
    },
    container: {
        paddingVertical: 15,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    img: {
        height: 77,
        width: '30%',
        resizeMode: 'contain',
        backgroundColor: '#F6F6F6',
        borderRadius: 8
    },
})