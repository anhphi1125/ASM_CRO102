import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const SelectItem = (props) => {
    const {
        titleL,
        titleM,
        borderColor,
        boderWidth,
        colorSelect,
        onPress,
        isSelect
    } = props
  return (
    <TouchableOpacity style={{
        marginVertical: 15,
        borderBottomColor: borderColor ? borderColor : '#7D7B7B',
        borderBottomWidth: boderWidth ? boderWidth : 0.5,
        justifyContent: 'center',
        paddingBottom: 5
    }}
    onPress={onPress}>
        {
            titleL && (
                <Text style={[styles.textLon, 
                    isSelect && {color: '#007537'}
                ]}>{titleL}</Text>
            )
        }
        {
            titleM && (
                <Text style={styles.textNho}>{titleM}</Text>
            )
        }
        {
            isSelect && (
                <Image source={require('../assets/icons/check.png')}
                style={styles.check}/>
            )
        }
    </TouchableOpacity>
  )
}

export default SelectItem

const styles = StyleSheet.create({
    check: {
        width: 24, height: 24,
        position: 'absolute',
        right: 0
    },
    textLon: {
        fontSize: 14,
        color: '#221F1F',
        lineHeight: 20,
        fontWeight: 'regular'
    },
    textNho: {
        fontSize: 14,
        color: '#7D7B7B',
        lineHeight: 20
    }
})