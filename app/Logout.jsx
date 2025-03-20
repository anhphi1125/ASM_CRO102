import { StyleSheet, Text, View, TouchableOpacity, Image, Modal } from 'react-native'
import React, { useState } from 'react';
import EditText from '../components/EditText';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import userLogin from "@/helpers/user";

const Logout = () => {
    const navigation = useNavigation();

    const { register, loading, error, setError } = userLogin();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [success, setSuccess] = useState(false);

    const handleRegister = () => {
        register(name, email, password, phone, (noToken) => {
            console.log("Đăng ký thành công và kh có token");
            setSuccess(true);

            setTimeout(() => {
                setSuccess(false);
                navigation.goBack();
            }, 1000);
        });
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/images/Ellipse.png')}
                    style={styles.image}
                />
                <TouchableOpacity style={styles.back} onPress={() => {
                    if (navigation.canGoBack()) {
                        navigation.goBack();
                    } else {
                        navigation.navigate('Login');
                    }
                }}>
                    <Image source={require('../assets/icons/arrow-right.png')}
                        style={{ width: 18, height: 18 }} />
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 20, flex: 1 }}>
                <Text style={styles.textL}>Đăng ký</Text>
                <Text style={styles.textM}>Tạo tài khoản</Text>
                <EditText
                    placeholder="Họ tên"
                    value={name}
                    valueChange={setName} />
                <EditText
                    placeholder="E-mail"
                    value={email}
                    valueChange={setEmail} />
                <EditText
                    placeholder="Số điện thoại"
                    value={phone}
                    valueChange={setPhone} />
                <EditText
                    placeholder="Mật khẩu"
                    password={true}
                    value={password}
                    valueChange={setPassword} />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, justifyContent: 'center', paddingHorizontal: 12, marginTop: 10 }}>
                    <Text style={styles.textS}>Để đăng ký tài khoản, bạn phải đồng ý</Text>
                    <Text style={[styles.textS, { color: '#009245', textDecorationLine: 'underline' }]}>Terms & Conditions</Text>
                    <Text style={styles.textS}>and</Text>
                    <Text style={[styles.textS, { color: '#009245', textDecorationLine: 'underline' }]}>Privacy Policy</Text>
                </View>
                <TouchableOpacity style={styles.btn} onPress={handleRegister}>
                    <LinearGradient
                        colors={['#007537', '#4CAF50']} // Chuyển từ trắng sang đen
                        start={{ x: 0, y: 0 }} // Điểm bắt đầu (trắng)
                        end={{ x: 1, y: 0 }} // Điểm kết thúc (đen)
                        style={styles.gradientBtn}
                    >
                        <Text style={styles.textXM}>Đăng Ký</Text>
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
                <View style={[styles.rowContainer, { gap: 5, marginVertical: 0 }]}>
                    <Text style={styles.textS}>Bạn đã có tài khoản</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={[styles.textS, { color: '#009245' }]}>đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Modal hiển thị lỗi */}
            <Modal visible={!!error} transparent animationType="fade">
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <View style={{ width: "80%", padding: 20, backgroundColor: "white", borderRadius: 10, alignItems: "center" }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Lỗi</Text>
                        <Text style={{ marginBottom: 15 }}>{error}</Text>
                        <TouchableOpacity onPress={() => setError("")} style={{ padding: 10, backgroundColor: "red", borderRadius: 5 }}>
                            <Text style={{ color: "white" }}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal visible={success} transparent animationType="fade">
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <View style={{ width: "80%", padding: 20, backgroundColor: "white", borderRadius: 10, alignItems: "center" }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Thông báo</Text>
                        <Text style={{ marginBottom: 15 }}>Đăng ký thành công!</Text>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Logout

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
        height: 230,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '165%',
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