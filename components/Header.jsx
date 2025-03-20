import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const Header = (props) => {
    const router = useRouter();
    const {
        title,
        leftComponent, iconLeft, onPressLeft, leftIconSize = 24, iconLeftColor,
        centerComponent,
        rightComponent, iconRight, onPressRight, RightIconSize = 24
    } = props;

    const renderLeft = () => {
        return (
            leftComponent || (
                <View>
                    {iconLeft ? (
                        <TouchableOpacity hitSlop={15} onPress={onPressLeft || router.back}>
                            <Image 
                                source={iconLeft}
                                style={{ 
                                    width: leftIconSize, 
                                    height: leftIconSize, 
                                    tintColor: iconLeftColor 
                                }}
                            />
                        </TouchableOpacity>
                    ) : (
                        <View style={{ width: leftIconSize, height: leftIconSize }} />
                    )}
                </View>
            )
        );
    };

    const renderCenter = () => {
        return (
            centerComponent || (
                <View style={styles.containerCenter}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            )
        );
    };

    const renderRight = () => {
        return (
            rightComponent || (
                <View>
                    {iconRight ? (
                        <TouchableOpacity hitSlop={15} onPress={onPressRight}>
                            <Image 
                                source={iconRight}
                                style={{ 
                                    width: RightIconSize, 
                                    height: RightIconSize 
                                }}
                            />
                        </TouchableOpacity>
                    ) : (
                        <View style={{ width: RightIconSize, height: RightIconSize }} />
                    )}
                </View>
            )
        );
    };

    return (
        <View style={[styles.container]}>
            {renderLeft()}
            {renderCenter()}
            {renderRight()}
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        height: 60,
        backgroundColor: '#FFFFFF'
    },
    containerCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'medium',
    },
});
