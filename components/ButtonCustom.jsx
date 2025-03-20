import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ButtonCustom = (props) => {
    const {
        left, right,
        minus, plus, minusColor,
        btn, btnColor,
        onPress
    } = props
    return (
        <TouchableOpacity>
            {
                left && (
                    <TouchableOpacity onPress={onPress} style={[styles.btnLeftOrRight,
                        left ? { left: 24 } : { right: 24 }
                        ]}>
                        <Image source={left} />
                    </TouchableOpacity>
                )
            }
            {
                right && (
                    <TouchableOpacity onPress={onPress} style={[styles.btnLeftOrRight,
                        left ? { left: 24 } : { right: 24 }
                        ]}>
                        <Image source={right}  />
                    </TouchableOpacity>
                )
            }
            {
                minus && (
                    <TouchableOpacity onPress={onPress}>
                        <Image source={require('../assets/icons/minus-square.png')} style={[{ width: 30, height: 30, tintColor: minusColor }]} />
                    </TouchableOpacity>
                )
            }
            {
                plus && (
                    <TouchableOpacity onPress={onPress}>
                        <Image source={require('../assets/icons/plus-square.png')} style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                )
            }
            {
                btn && (
                    <TouchableOpacity onPress={onPress} style={[styles.btnContainer, {backgroundColor: btnColor}]}>
                        <Text style={styles.textBtn}>{btn}</Text>
                    </TouchableOpacity>
                )
            }

        </TouchableOpacity>
    )
}

export default ButtonCustom

const styles = StyleSheet.create({
    textBtn: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'medium',
        textAlign: 'center'
    },
    btnContainer: {
        padding: 15,
        backgroundColor: '#ABABAB',
        width: '100%',
        borderRadius: 8
    },
    btnLeftOrRight: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 2,
        position: 'absolute',
    }
})