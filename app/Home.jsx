import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react';
import ListProd from '@/components/ListProd';
import { useNavigation } from '@react-navigation/native';


const Home = () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <View style={styles.bannerContainer}>
                <View style={styles.textBanner}>
                    <Text style={styles.textL}>Planta - tỏa sáng không gian nhà bạn</Text>
                    <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={[styles.textM, { color: '#007537' }]}>Xem hàng mới về </Text>
                        <Image source={require('../assets/icons/fi_arrow-right.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.rounded}>
                    <Image source={require('../assets/icons/shopping-cart.png')} style={styles.icon} />
                </TouchableOpacity>
                <Image source={require('../assets/images/banner-tree.png')} style={styles.banner} />
            </View>
            <View style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 15 }}>
                <ListProd
                    title="Cây trồng"
                    type="Cây trồng"
                    more="Cây trồng"
                    onPress={(_id) => navigation.navigate('Detail', { _id })} />
                <ListProd
                    title="Chậu cây trồng"
                    type="Chậu cây"
                    more="Chậu cây" 
                    onPress={(_id) => navigation.navigate('Detail', { _id })} />
                <ListProd
                    title="Phụ kiện chăm sóc"
                    type="Chậu cây"
                    more="Phụ kiện" 
                    onPress={(_id) => navigation.navigate('Detail', { _id })} />
                <Text style={[styles.textL, {marginTop: 20}]}>Combo chăm sóc (mới)</Text>
                <TouchableOpacity style={styles.kitContainer}>
                    <View style={styles.textKit}>
                        <Text style={styles.textM}>Lemon Balm Grow Kit</Text>
                        <Text style={styles.textS} numberOfLines={3} ellipsizeMode='tail'>Gồm: hạt giống, Lemon Balm, gói đất hữu cơm chậu Planta, marker đánh dấu đó nha kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk</Text>
                    </View>
                    <Image source={require('@/assets/images/kit.png')} style={{width: 108, height: 134, borderTopRightRadius: 8, borderBottomRightRadius: 8}}/>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({
    textKit: {
        width: '68%',
        paddingVertical: 24,
        paddingLeft: 24
    },
    kitContainer: {
        backgroundColor: '#F6F6F6',
        flexDirection: 'row',
        height: 134,
        width: '100%',
        borderRadius: 8,
        marginVertical: 15,
        justifyContent: 'space-between'
    },
    textBanner: {
        width: '60%',
        zIndex: 1,
        marginLeft: 25,
        marginTop: 30,
    },
    bannerContainer: {
        backgroundColor: '#F6F6F6',
        height: '33vh'
    },
    banner: {
        position: 'absolute',
        width: '100%',
        height: '76%',
        bottom: 0, right: 0
    },
    rounded: {
        backgroundColor: '#FFFFFF',
        width: 48, height: 45,
        borderRadius: 99999,
        padding: 11,
        position: 'absolute',
        right: 25, top: 24,
        zIndex: 1
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
    icon: {
        width: 24,
        height: 24
    }
})