import React from "react";
import { Text, View } from "react-native";
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

export default function Index() {
  return (
    <AppNavigation/>
  );
}
