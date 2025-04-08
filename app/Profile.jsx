import { Image, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react';
import Header from '../components/Header';
import Muc from '../components/Muc';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { logout } from '@/slices/AuthSlice';


const Profile = () => {
    const user = useSelector((state) => state.auth.user);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [success, setSuccess] = useState(false);

    if (!user) {
        return <Text>Đang tải...</Text>;
      }

  return (
    <View style={styles.container}>
        <Header title="PROFILE"/>
        <View style={styles.userContainer}>
        <Image
  source={
    user?.img
      ? { uri: user.img }
      : require('../assets/images/tree.png') // Đặt ảnh mặc định ở đây
  }
  style={styles.imgUser}
/>
            <View>
                <Text style={[styles.textL, {marginBottom: 0}]}>{user.name}</Text>
                <Text style={styles.textM}>{user.email}</Text>
            </View>
        </View>
        <Muc title="Chung" textColor="#7F7F7F" size={16}/>
        <TouchableOpacity>
            <Text style={styles.textL}>Chỉnh sửa thông tin</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style={styles.textL}>Cẩm nang trồng cây</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style={styles.textL}>Lịch sử giao dịch</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style={styles.textL}>Q & A</Text>
        </TouchableOpacity>
        <Muc title="Bảo mật và Điều khoản" textColor="#7F7F7F" size={16}/>
        <TouchableOpacity>
            <Text style={styles.textL}>Điều khoản và điều kiện</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style={styles.textL}>Chính sách và quyền riêng tư</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
              dispatch(logout());
              navigation.reset({index: 0, routes: [{name: 'Login'}]});
            }, 1500);
        }}>
            <Text style={[styles.textL, {color: '#FF0000'}]}>Đăng xuất</Text>
        </TouchableOpacity>
        <Modal visible={success} transparent animationType="fade">
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                >
                  <View
                    style={{
                      width: "80%",
                      padding: 20,
                      backgroundColor: "white",
                      borderRadius: 10,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
                    >
                      Thông báo
                    </Text>
                    <Text style={{ marginBottom: 15 }}>Đăng xuất thành công!</Text>
                  </View>
                </View>
              </Modal>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 48,
        flex: 1
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 26,
        marginBottom: 44,
        marginTop: 34
    },
    imgUser: {
        width: 39, height: 39,
        borderRadius: 50,
        backgroundColor: '#9A9A9A'
    },
    textL: {
        fontSize: 16,
        color: '#000000',
        lineHeight: 22,
        marginBottom: 20
    },
    textM: {
        fontSize: 14,
        fontWeight: 'regular',
        color: '#7F7F7F',
        lineHeight: 20,
    }
})