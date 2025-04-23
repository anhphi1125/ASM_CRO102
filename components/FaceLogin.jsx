import React, { useEffect, useState } from 'react';
import { Button, View, Text, Image } from 'react-native';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function FaceLogin() {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: '683775737682213', // App ID của bạn
  });

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      console.log('✅ Token nhận được:', access_token);
      fetchFacebookUserInfo(access_token);
    }
  }, [response]);

  const fetchFacebookUserInfo = async (token) => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${token}`
      );
      const data = await response.json();
      setUserInfo(data);
      console.log('📘 Thông tin người dùng:', data);
    } catch (error) {
      console.error('❌ Lỗi khi lấy thông tin người dùng:', error);
    }
  };

  return (
    <View style={{ padding: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Đăng nhập bằng Facebook</Text>
      <Button title="Login with Facebook" onPress={() => promptAsync()} />

      {userInfo && (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Image
            source={{ uri: userInfo.picture?.data?.url }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text style={{ fontSize: 16, marginTop: 10 }}>{userInfo.name}</Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>{userInfo.email}</Text>
        </View>
      )}
    </View>
  );
}