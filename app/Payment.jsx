import {
  ScrollView,
  StyleSheet,
  Text,
  Modal,
  View,
} from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import Muc from "../components/Muc";
import InforInput from "../components/inforInput";
import SelectItem from "../components/SelectItem";
import ButtonCustom from "@/components/ButtonCustom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "@/slices/cartSlice";
import { useNavigation, useRoute } from "@react-navigation/native";

const Payment = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const route = useRoute();
  const { selectedItems, totalPrice } = route.params;

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState("");
  const [numPhone, setNumPhone] = useState(user.phone);
  const [selectVC, setSelectVC] = useState(null);
  const [selectCre, setSelectCre] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };
  const [vc, setVC] = useState(0);

  const handleContinue = () => {
    if (
      name == "" ||
      email == "" ||
      address == "" ||
      numPhone == "" ||
      selectCre == null ||
      selectVC == null
    ) {
      setMessage("Vui lòng nhập và điền đủ thông tin !!!");
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } else {
      setMessage("Thanh toán thành công!");

      selectedItems.forEach((item) => {
        dispatch(
          removeFromCart({
            id: item,
          })
        );
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigation.goBack();
      }, 2000);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="THANH TOÁN"
        iconLeft={require("../assets/icons/chevron-left.png")}
        iconLeftColor="#000000"
      />
      <ScrollView style={styles.inforContainer}>
        <View style={{ marginBottom: 25 }}>
          <Muc title="Thông tin khách hàng" main={true} bold={"600"} />
          <InforInput
            placehoder={"Đào Thị Ánh Phi"}
            value={name}
            valueChange={setName}
          />
          <InforInput
            placehoder={"anhphi@gmail.com"}
            value={email}
            valueChange={setEmail}
          />
          <InforInput
            placehoder={"Địa chỉ"}
            value={address}
            valueChange={setAddress}
          />
          <InforInput
            placehoder={"Số điện thoại"}
            value={numPhone}
            valueChange={setNumPhone}
          />
        </View>
        <View style={{ marginBottom: 25 }}>
          <Muc title="Phương thức vận chuyển" main={true} bold={"600"} />
          <SelectItem
            titleL="Giao hàng Nhanh - 15.000đ"
            titleM="Dự kiến giao hàng 5-7/9"
            isSelect={selectVC === 0}
            onPress={() => {setSelectVC(0);
              setVC(15000);
            }}
          />
          <SelectItem
            titleL="Giao hàng COD - 20.000đ"
            titleM="Dự kiến giao hàng 4-8/9"
            isSelect={selectVC === 1}
            onPress={() => {setSelectVC(1);
              setVC(20000);
            }}
          />
        </View>
        <View>
          <Muc title="Hình thức thanh toán" main={true} bold={"600"} />
          <SelectItem
            titleL="Thẻ VISA/MASTERCARD"
            isSelect={selectCre === 0}
            onPress={() => setSelectCre(0)}
          />
          <SelectItem
            titleL="Thẻ ATM"
            isSelect={selectCre === 1}
            onPress={() => setSelectCre(1)}
          />
        </View>
      </ScrollView>
      <View style={styles.pricePay}>
        <Muc
          title={"Tạm tính"}
          content={totalPrice}
          borderWidth={0}
          textColor={"#666666"}
          marB={0}
        />
        <Muc
          title={"Phí vận chuyển"}
          content={formatCurrency(vc)}
          borderWidth={0}
          textColor={"#666666"}
          marB={0}
        />
        <Muc
          title={"Tổng cộng"}
          content={formatCurrency(totalPrice + vc)}
          borderWidth={0}
          size={16}
          color={"#007537"}
          textColor={"#666666"}
          marB={0}
        />
        <ButtonCustom btn={"TIẾP TỤC"} btnColor={"#007537"} onPress={handleContinue}/>
      </View>
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
            <Text style={{ marginBottom: 15 }}>{message}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  pricePay: {
    paddingVertical: 15,
    paddingHorizontal: 24,
    backgroundColor: "#FFFFFF",
  },
  inforContainer: {
    flex: 1,
    paddingHorizontal: 48,
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
  },
});
