import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const inforInput = (props) => {
    const {
        placehoder,
        color,
        value,
        valueChange,
        borderColor,
        borderWidth,
    } = props
  return (
    <View>
      <TextInput
      placeholder={placehoder}
      placeholderTextColor={color ? color : '#7B7B7B'}
      value={value}
      onChangeText={valueChange}
      style={{
        fontSize: 14,
        borderBottomColor: borderColor ? borderColor : '#7B7B7B',
        borderBottomWidth: borderWidth ? borderWidth : 0.5,
        paddingVertical: 3,
        marginBottom: 15
      }}/>
    </View>
  )
}

export default inforInput

const styles = StyleSheet.create({})