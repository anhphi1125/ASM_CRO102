import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import EditText from "../components/EditText";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { Login as loginAction } from "../slices/AuthSlice";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AxiosInstance from "@/helpers/AxiosInstance";
import * as Facebook from 'expo-auth-session/providers/facebook';


const Login = () => {
  const navigation = useNavigation();

  const { user, isLoading, isSuccess, isError, errorMessage } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  // Gọi Redux login
  const handleLogin = () => {
    dispatch(loginAction({ email, password }));
  };

  // Hiệu ứng theo dõi login thành công
  useEffect(() => {
    if (isSuccess) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigation.replace("Bottom");
      }, 1000);
    }
  }, [isSuccess]);

  // Hiện modal nếu có lỗi
  useEffect(() => {
    if (isError && errorMessage) {
      setShowErrorModal(true);
    }
  }, [isError, errorMessage]);

  //login bằng google
  WebBrowser.maybeCompleteAuthSession();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "1090583178379-9h6aadoom5sl03145rflh9vus1ujh2a4.apps.googleusercontent.com",
    webClientId:
      "1090583178379-bsv7d88q5vcak7mraf85e5t9e24p94m8.apps.googleusercontent.com",
    iosClientId:
      "1090583178379-dpa49drko7r7t1a2gai0pdrtr0mgoj80.apps.googleusercontent.com",
  });

  //xử lý phản hồi từ Google
  useEffect(() => {
    if (response?.type === "success") {
      fetchUserInfo(response.authentication.accessToken);
    }
  }, [response]);

  //lấy thông tin người dùng từ Google API
  async function fetchUserInfo(token) {
    const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = await res.json();
    setUserInfo(user);

    try {
        const check = await AxiosInstance().post('/users/check-email', {email: user.email});
        if(!check.exists){
            const newUser = {
                name: user.name,
                email: user.email,
                password: "GoogleA",
                phone: user.phone || "0123456789",
            };
            const res = await AxiosInstance().post('/users/register', newUser);
        }

        dispatch(loginAction({email: user.email, password: 'GoogleA'}));
    } catch (error) {
        console.error("Google Login Error:", error);
    }
  }

  //login bằng facebook
  const [req, res, promptAsyncFace] = Facebook.useAuthRequest({
      clientId: '683775737682213', // App ID của bạn
    });
  
    const [userInfoFace, setUserInfoFaceFace] = useState(null);
  
    useEffect(() => {
      if (res?.type === 'success') {
        const { access_token } = res.params;
        console.log('✅ Token nhận được:', access_token);
        fetchFacebookUserInfo(access_token);
      }
    }, [res]);
  
    const fetchFacebookUserInfo = async (token) => {
      try {
        const response = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${token}`
        );
        const data = await response.json();
        setUserInfoFaceFace(data);
        console.log('📘 Thông tin người dùng:', data);
      } catch (error) {
        console.error('❌ Lỗi khi lấy thông tin người dùng:', error);
      }
    };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/Ellipse.png")}
          style={styles.image}
        />
        <TouchableOpacity style={styles.back}>
          <Image
            source={require("../assets/icons/arrow-right.png")}
            style={{ width: 18, height: 18 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <Text style={styles.textL}>Chào mừng bạn</Text>
        <Text style={styles.textM}>Đăng nhập tài khoản</Text>
        <EditText
          placeholder="Nhập email hoặc số điện thoại"
          value={email}
          valueChange={setEmail}
        />
        <EditText
          placeholder="Mật khẩu"
          password={true}
          value={password}
          valueChange={setPassword}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => setRemember(!remember)}
          >
            <Image
              source={require("@/assets/icons/checkbox-circle-line.png")}
              style={[
                { width: 22, height: 22 },
                remember && { tintColor: "#009245" },
              ]}
            />
            <Text style={{ fontSize: 11 }}>Nhớ tài khoản</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{ color: "#007537", fontSize: 11, fontWeight: "bold" }}
            >
              Quên mật khẩu ?
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <LinearGradient
            colors={["#007537", "#4CAF50"]} // Chuyển từ trắng sang đen
            start={{ x: 0, y: 0 }} // Điểm bắt đầu (trắng)
            end={{ x: 1, y: 0 }} // Điểm kết thúc (đen)
            style={styles.gradientBtn}
          >
            <Text style={styles.textXM}>Đăng nhập</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={{ justifyContent: "center", marginVertical: 20 }}>
          <View style={styles.or}>
            <Text style={{ fontSize: 12 }}>Hoặc</Text>
          </View>
          <View style={styles.line}></View>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={() => promptAsync()}>
            <Image
              source={require("@/assets/icons/google.png")}
              style={{ width: 32, height: 32 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => promptAsyncFace()}>
            <Image
              source={require("@/assets/icons/facebook.png")}
              style={{ width: 32, height: 32 }}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.rowContainer, { gap: 10, marginVertical: 0 }]}>
          <Text style={styles.textS}>Bạn không có tài khoản</Text>
          <TouchableOpacity>
            <Text
              style={[styles.textS, { color: "#009245" }]}
              onPress={() => navigation.navigate("Logout")}
            >
              Tạo tài khoản
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Modal hiển thị lỗi */}
      <Modal visible={showErrorModal} transparent animationType="fade">
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
              Lỗi
            </Text>
            <Text style={{ marginBottom: 15 }}>{errorMessage}</Text>
            <TouchableOpacity
              onPress={() => setError("")}
              style={{ padding: 10, backgroundColor: "red", borderRadius: 5 }}
            >
              <Text style={{ color: "white" }}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
            <Text style={{ marginBottom: 15 }}>Đăng nhập thành công!</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
    marginVertical: 35,
  },
  or: {
    backgroundColor: "#FFFFFF",
    position: "absolute",
    padding: 5,
    zIndex: 1,
    left: "45%",
  },
  line: {
    borderWidth: 0.5,
    borderColor: "#4CAF50",
  },
  gradientBtn: {
    padding: 12,
    width: "100%",
    borderRadius: 15,
  },
  btn: {
    width: "100%",
    marginVertical: 20,
  },
  textS: {
    fontSize: 12,
    fontWeight: "regular",
  },
  textXM: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  textM: {
    fontSize: 18,
    fontWeight: "regular",
    textAlign: "center",
    marginBottom: 20,
  },
  textL: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  imageContainer: {
    width: "100%",
    height: 320,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "120%",
    resizeMode: "contain",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  back: {
    position: "absolute",
    padding: 7,
    backgroundColor: "#F8EEC0",
    borderRadius: 20,
    marginLeft: 20,
    marginTop: 36,
  },
});
