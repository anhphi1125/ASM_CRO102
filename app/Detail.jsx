import { Image, ScrollView, StyleSheet, Text, View, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ButtonCustom from "../components/ButtonCustom";
import Muc from "../components/Muc";
import AxiosInstance from "@/helpers/AxiosInstance";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addToCart } from "@/slices/cartSlice";

const Detail = () => {
  const route = useRoute();
  const { _id } = route.params;
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState(null);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [visibleModal, setVisibleModal] = useState(false);

  useEffect(() => {
    const getProd = async () => {
      try {
        const res = await AxiosInstance().get(`/prod/getProd?_id=${_id}`);

        if (res && res.product) {
          setProduct(res.product);
        } else {
          console.log("Không tìm thấy");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProd();
  }, [_id]);

  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  const handleAddToCart = () => {
    if (quantity <= 0) return;

    dispatch(
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
      })
    );

    setVisibleModal(true);

    setTimeout(() => {
      setVisibleModal(false);
    }, 2000);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        iconLeft={require("../assets/icons/chevron-left.png")}
        iconLeftColor="#000000"
        title={product?.name || "Đang tải..."}
        iconRight={require("../assets/icons/shopping-cart.png")}
        onPressRight={() => navigation.navigate("Cart")}
      />
      <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <View style={styles.imgContainer}>
          {product && (
            <Image
              source={{ uri: product.image }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
          )}
          <View style={{ position: "absolute", width: "100%", top: "45%" }}>
            <ButtonCustom left={require("@/assets/icons/chevron-left.png")} />
            <ButtonCustom right={require("@/assets/icons/chevron-right.png")} />
          </View>
        </View>
        <View style={{ paddingHorizontal: 48, paddingVertical: 14 }}>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {product && <Text style={styles.textBox}>{product.type}</Text>}
            {product && <Text style={styles.textBox}>{product.attribute}</Text>}
          </View>
          <Text
            style={[styles.textL, { color: "#007537", marginVertical: 17 }]}
          >
            {product ? formatCurrency(product.price) : "Đang tải..."}
          </Text>
          <Muc title="Chi tiết sản phẩm" main={true} />
          <Muc title="Kích cỡ" content={product?.size || "Đang tải..."} />
          <Muc title="Xuất xứ" content={product?.origin || "Đang tải..."} />
          <Muc
            title="Tình trạng"
            content={product ? `Còn ${product.quantity} sp` : "Đang tải..."}
            color="#007537"
          />
        </View>
      </ScrollView>
      <View
        style={{
          justifyContent: "space-between",
          paddingHorizontal: 24,
          flexDirection: "row",
          backgroundColor: "#FFFFFF",
        }}
      >
        <View>
          <Text style={styles.textS}>Đã chọn {quantity} sản phẩm</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <ButtonCustom
              minus={true}
              minusColor={quantity > 0 && "#00000"}
              onPress={() => quantity != 0 && setQuantity(quantity - 1)}
            />
            <Text style={styles.textM}>{quantity}</Text>
            <ButtonCustom
              plus={true}
              onPress={() => setQuantity(quantity + 1)}
            />
          </View>
        </View>
        <View>
          <Text style={[styles.textS, { textAlign: "right" }]}>Tạm tính</Text>
          <Text style={[styles.textL, { textAlign: "right" }]}>
            {product ? formatCurrency(product.price * quantity) : "Đang tải..."}
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: 24,
          paddingVertical: 20,
          backgroundColor: "#FFFFFF",
        }}
      >
        <ButtonCustom
          btn="THÊM VÀO GIỎ HÀNG"
          btnColor={quantity > 0 ? "#007537" : "#ABABAB"}
          onPress={handleAddToCart}
        />
      </View>
      <Modal visible={visibleModal} transparent animationType="fade">
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
            <Text style={{ marginBottom: 15 }}>
              Thêm vào giỏ hàng thành công!
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  textS: {
    fontSize: 14,
    fontWeight: "regular",
    lineHeight: 20,
    color: "#3A3A3A",
  },
  textM: {
    fontSize: 16,
    fontWeight: "regular",
    lineHeight: 20,
  },
  textL: {
    fontSize: 24,
    fontWeight: "medium",
    lineHeight: 34,
  },
  textBox: {
    color: "#FFFFFF",
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: "#009245",
    borderRadius: 4,
  },
  imgContainer: {
    height: "30vh",
    backgroundColor: "#F6F6F6",
  },
});
