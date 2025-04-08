import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import ListProd from "@/components/ListProd";
import Menu from "../components/Menu";
import { useNavigation, useRoute } from "@react-navigation/native";

const menu = [
  {
    id: 1,
    name: "Tất cả",
  },
  {
    id: 2,
    name: "Hàng mới về",
  },
  {
    id: 3,
    name: "Ưa nắng",
  },
  {
    id: 4,
    name: "Ưa bóng",
  },
];

const Regular = () => {
  const navigation = useNavigation();
  const [selectedName, setSelectedName] = useState("Tất cả");

  const route = useRoute();
  const { more } = route.params;
  console.log("More nè: ", more);

  const handleSelect = (name) => {
    setSelectedName(name);
  };

  // Xác định prop nào sẽ được truyền vào ListProd
  const getPropsForListProd = () => {
    if (more === "Cây trồng") {
      if (selectedName === "Tất cả") {
        return { type: "Cây trồng" };
      } else {
        return { attribute: selectedName };
      }
    } else {
      return { type: more };
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        iconLeft={require("../assets/icons/chevron-left.png")}
        iconLeftColor="#000000"
        title={more || "Đang tải..."}
        iconRight={require("../assets/icons/shopping-cart.png")}
      />
      <View style={[styles.container]}>
        {more == "Cây trồng" && (
          <Menu data={menu} onChangeSelect={handleSelect} />
        )}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 10, flex: 1 }}
        >
          <ListProd
            isLarge={true}
            {...getPropsForListProd()}
            onPress={(_id) => navigation.navigate("Detail", { _id })}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Regular;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 18,
  },
});
