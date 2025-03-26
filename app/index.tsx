import React from "react";
import { Text, View } from "react-native";
import Login from './Login';
import Logout from './Logout';
import Home from './Home';
import BottomNavigation from './BottomNavigation';
import Detail from './Detail';
import Search from './Search';
import AppNavigation from './Navigation';

export default function Index() {
  return (
    <AppNavigation/>
  );
}
