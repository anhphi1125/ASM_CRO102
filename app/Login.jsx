import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import EditText from '../components/EditText';
import { LinearGradient } from 'expo-linear-gradient';

const Login = () => {
    const [remember, setRemember] = useState(false);
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/images/Ellipse.png')}
                    style={styles.image}
                />
                <TouchableOpacity style={styles.back}>
                    <Image source={require('../assets/icons/arrow-right.png')}
                        style={{ width: 18, height: 18 }} />
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 20, flex: 1 }}>
                <Text style={styles.textL}>Chào mừng bạn</Text>
                <Text style={styles.textM}>Đăng nhập tài khoản</Text>
                <EditText
                    placeholder="Nhập email hoặc số điện thoại" />
                <EditText
                    placeholder="Mật khẩu"
                    password={true} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => setRemember(!remember)}>
                        <Image source={require('@/assets/icons/checkbox-circle-line.png')}
                            style={[{ width: 22, height: 22 },
                            remember && { tintColor: '#009245' }
                            ]} />
                        <Text style={{ fontSize: 11 }}>Nhớ tài khoản</Text>
                    </TouchableOpacity>
                    <Text style={{ color: '#007537', fontSize: 11, fontWeight: 'bold' }}>Quên mật khẩu ?</Text>
                </View>
                <TouchableOpacity style={styles.btn}>
                    <LinearGradient
                        colors={['#007537', '#4CAF50']} // Chuyển từ trắng sang đen
                        start={{ x: 0, y: 0 }} // Điểm bắt đầu (trắng)
                        end={{ x: 1, y: 0 }} // Điểm kết thúc (đen)
                        style={styles.gradientBtn}
                    >
                        <Text style={styles.textXM}>Đăng nhập</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={{ justifyContent: 'center', marginVertical: 20 }}>
                    <View style={styles.or}>
                        <Text style={{ fontSize: 12 }}>Hoặc</Text>
                    </View>
                    <View style={styles.line}></View>
                </View>
                <View style={styles.rowContainer}>
                    <TouchableOpacity>
                        <Image source={require('@/assets/icons/google.png')}
                            style={{ width: 32, height: 32 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('@/assets/icons/facebook.png')}
                            style={{ width: 32, height: 32 }} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.rowContainer, {gap: 10, marginVertical: 0}]}>
                    <Text style={styles.textS}>Bạn không có tài khoản</Text>
                    <TouchableOpacity>
                        <Text style={[styles.textS, {color: '#009245'}]}>Tạo tài khoản</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 40,
        marginVertical: 35
    },
    or: {
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        padding: 5,
        zIndex: 1,
        left: '45%'
    },
    line: {
        borderWidth: 0.5,
        borderColor: '#4CAF50'
    },
    gradientBtn: {
        padding: 12,
        width: '100%',
        borderRadius: 15,
    },
    btn: {
        width: '100%',
        marginVertical: 20
    },
    textS: {
        fontSize: 12,
        fontWeight: 'regular'
    },
    textXM: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textM: {
        fontSize: 18,
        fontWeight: 'regular',
        textAlign: 'center',
        marginBottom: 20
    },
    textL: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    imageContainer: {
        width: '100%',
        height: 320,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '120%',
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    back: {
        position: 'absolute',
        padding: 7,
        backgroundColor: '#F8EEC0',
        borderRadius: 20,
        marginLeft: 20,
        marginTop: 36
    }
})