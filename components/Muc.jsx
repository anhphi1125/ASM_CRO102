import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Muc = (props) => {
    const {
        title,
        content,
        color,
        textColor,
        size,
        borderWidth,
        bold,
        marB,
        main
    } = props
  return (
    <View style={[styles.mucContainer, {borderBottomWidth: borderWidth !== undefined ? borderWidth : 0.5,
        marginBottom: marB !== undefined ? marB : 15,
    },
        main && {borderBottomColor: '#00000'}
    ]}>
        {
            title && (
                <Text style={[styles.textCon, {color: textColor ? textColor : '#3A3A3A', fontSize: size ? size : 14},
                    main && {fontSize: 16, fontWeight: bold ? bold : 'medium'}
                ]}>{title}</Text>
            )
        }
        {
            content && (
                <Text style={[styles.textCon, {fontSize: size ? size : 14, color: color ? color : '#000000'},
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
        fontWeight: 'regular',
        lineHeight: 20,
    },
    mucContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomColor: '#ABABAB',
        paddingBottom: 5,
    }
})