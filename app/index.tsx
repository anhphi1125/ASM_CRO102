import React, { useEffect, useRef, useState } from "react";
import { Text, View, Platform, Image } from "react-native";
import Login from './Login';
import Logout from './Logout';
import Home from './Home';
import BottomNavigation from './BottomNavigation';
import Detail from './Detail';
import Search from './Search';
import AppNavigation from './Navigation';
import Component from '../components/Component';
import Profile from '../app/Profile';
import Regular from '../app/Regular';
import Payment from '../app/Payment';
import Cart from './Cart';
import FaceLogin from '../components/FaceLogin';
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { EventSubscription } from 'expo-modules-core';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Index() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const notificationListener = useRef<EventSubscription | null>(null);
const responseListener = useRef<EventSubscription | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setExpoPushToken(token);
        console.log("📱 Expo Token:", token);
      } else {
        console.log("❌ Không lấy được token");
      }
    });

    // Foreground handler
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification: any) => {
        console.log("🔔 Notification received:", notification);
        const image = notification?.request?.content?.data?.image;
        const body = notification?.request?.content?.body;
        if (image) setImageUrl(image);
      if (body) setMessage(body);

      // Ẩn sau 2 giây
      setTimeout(() => {
        setImageUrl("");
        setMessage("");
      }, 2000);
      });

    // User tapped notification
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response: any) => {
        console.log("👉 Notification tapped:", response);
      });

      return () => {
        // Trước khi remove, kiểm tra có null không
        if (notificationListener.current) {
          Notifications.removeNotificationSubscription(notificationListener.current);
        }
        if (responseListener.current) {
          Notifications.removeNotificationSubscription(responseListener.current);
        }
      };
  }, []);
  return (
    <View style={{ flex: 1 }}>
    <AppNavigation />
    {imageUrl ? (
      <View style={{ padding: 16, alignItems: 'center' }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Ảnh từ Notification</Text>
        <Image
          source={{ uri: imageUrl }}
          style={{ width: 300, height: 200, borderRadius: 8 }}
          resizeMode="cover"
        />
        <Text style={{ marginTop: 10 }}>{message}</Text>
      </View>
    ) : null}
  </View>
  );
}

async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    alert("Must use physical device for Push Notifications");
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Không có quyền gửi notification");
    return;
  }

  const token = (
    await Notifications.getExpoPushTokenAsync({
      projectId: "d7551d61-88dc-4a6c-990a-32479fef21a6",
    })
  ).data;

  return token;
}
//d7551d61-88dc-4a6c-990a-32479fef21a6
// npm install -g eas-cli expo-notifications expo-constants expo-device
// eas --version
// eas login
// eas init

// npx expo start

// linking