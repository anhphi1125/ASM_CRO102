import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import React, { useState } from 'react'

const EditText = (props) => {
    const {
        placeholder,
        password,
        value, valueChange
    } = props;

    const [isPassVisible, setIsPassVisible] = useState(!password);

    return (
        <View>
            <TextInput
                style={styles.nhap}
                placeholder={placeholder}
                placeholderTextColor={'#8B8B8B'}
                secureTextEntry={!isPassVisible}
                value={value}
                onChangeText={valueChange} />
            {
                password && (
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => { setIsPassVisible(!isPassVisible) }}
                    >
                        <Image source={
                            isPassVisible ? require('../assets/icons/eye-filled.png') : require('../assets/icons/eye-invisible-filled.png')
                        }
                        style={{width: 29, height: 24}}/>
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

export default EditText

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        alignItems: 'center',
        right: 15,
        top: 11
    },
    nhap: {
        fontSize: 12,
        width: '100%',
        padding: 14,
        borderColor: '#8B8B8B',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10
    }
})