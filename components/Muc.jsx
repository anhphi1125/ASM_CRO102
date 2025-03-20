import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Muc = (props) => {
    const {
        title,
        content,
        color,
        main
    } = props
  return (
    <View style={[styles.mucContainer,
        main && {borderBottomColor: '#00000'}
    ]}>
        {
            title && (
                <Text style={[styles.textCon, 
                    main && {fontSize: 16, fontWeight: 'medium'}
                ]}>{title}</Text>
            )
        }
        {
            content && (
                <Text style={[styles.textCon, 
                    main && {fontSize: 16, fontWeight: 'bold'},
                    {color: color}
                ]}>{content}</Text>
            )
        }
    </View>
  )
}

export default Muc

const styles = StyleSheet.create({
    textCon: {
        fontSize: 14,
        fontWeight: 'regular',
        lineHeight: 20,
        color: '#3A3A3A'
    },
    mucContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomColor: '#ABABAB',
        borderBottomWidth: 0.5,
        paddingBottom: 5,
        marginBottom: 15
    }
})