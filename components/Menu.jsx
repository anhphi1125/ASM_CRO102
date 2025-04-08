import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { FlashList } from '@shopify/flash-list';

const Menu = (props) => {
    const {data, onChangeSelect} = props;
    const [curent, setCurrent] = useState(0);
  return (
    <FlashList
    data={data}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
    extraData={curent}
    renderItem={({index, item}) => {
        return (
            <TouchableOpacity style={[styles.container
            ]}
            onPress={() => {
                setCurrent(index);
                onChangeSelect && onChangeSelect(item.name);
            }}>
                <Text style={[styles.textS, 
                    index == curent && {color: '#FFFFFF', backgroundColor: '#009245'}
                ]}>{item.name}</Text>
            </TouchableOpacity>
        );
    }}
    />
  )
}

export default Menu

const styles = StyleSheet.create({
    textS: {
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
        color: '#7D7B7B',
        paddingVertical: 4, 
        paddingHorizontal: 8,
        borderRadius: 4
    },
    container: {
        marginRight: 8
    }
})