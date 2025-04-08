import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useState } from "react";
import ButtonCustom from "./ButtonCustom";
import CheckBox from "expo-checkbox";
import { FlashList } from "@shopify/flash-list";
import { useDispatch } from "react-redux";
import { updateCart, removeFromCart } from "@/slices/cartSlice";

const ListCart = memo((props) => {
  const { data, onCheckboxChange } = props;
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const handleCheckboxChange = (id, value) => {
    // Cập nhật danh sách các item đã chọn
    setSelectedItems((prevSelectedItems) => {
      const updatedItems = [...prevSelectedItems];
      const existingIndex = updatedItems.findIndex((item) => item.id === id);

      if (existingIndex > -1) {
        // Nếu đã có id trong mảng thì toggle giá trị selected
        updatedItems[existingIndex].selected =
          !updatedItems[existingIndex].selected;
      } else {
        // Nếu chưa có id trong mảng thì thêm vào
        updatedItems.push({ id, selected: value });
      }

      // Lọc ra chỉ những item có selected là true và truyền ra ngoài
      const selectedIds = updatedItems
        .filter((item) => item.selected)
        .map((item) => item.id);

      // Truyền danh sách id đã chọn ra ngoài
      onCheckboxChange(selectedIds);
      return updatedItems;
    });
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      setPendingDeleteId(id);
      setVisibleModal(true);
    } else {
      dispatch(
        updateCart({
          id: id,
          quantity: quantity,
        })
      );
    }
  };

  const handleDelete = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const confirmDelete = () => {
    if (pendingDeleteId) {
      handleDelete(pendingDeleteId);
      setPendingDeleteId(null);
    }
    setVisibleModal(false);
  };

  const cancelDelete = () => {
    setPendingDeleteId(null);
    setVisibleModal(false);
  };

  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  return (
    <>
      <FlashList
        data={data}
        horizontal={false}
        estimatedItemSize={200}
        extraData={selectedItems}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isChecked =
            selectedItems.find((i) => i.id === item.id)?.selected || false;

          return (
            <View style={[styles.rowContainer, { marginVertical: 10 }]}>
              <CheckBox
                value={isChecked}
                onValueChange={(value) => handleCheckboxChange(item.id, value)}
                color={isChecked ? "#000000" : undefined}
                style={styles.check}
              />
              <View style={styles.rowContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View>
                  <Text style={styles.textL}>{item.name}</Text>
                  <Text style={[styles.textL, { color: "#007537" }]}>
                    {formatCurrency(item.price)}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 13,
                    }}
                  >
                    <ButtonCustom
                      minus={true}
                      size={20}
                      minusColor={"#000000"}
                      onPress={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                    />
                    <Text style={[styles.textM, { marginHorizontal: 24 }]}>
                      {item.quantity}
                    </Text>
                    <ButtonCustom
                      plus={true}
                      size={20}
                      onPress={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                    />
                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                      <Text
                        style={[
                          styles.textL,
                          { textDecorationLine: "underline", marginLeft: 40 },
                        ]}
                      >
                        Xóa
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />

      {/* Modal xác nhận xóa */}
      <Modal visible={visibleModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Xác nhận</Text>
            <Text style={styles.modalMessage}>
              Bạn có muốn xóa sản phẩm khỏi giỏ hàng không?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={cancelDelete}>
                <Text style={[styles.modalButtonText, { color: "#007537" }]}>
                  Hủy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmDelete}>
                <Text style={[styles.modalButtonText, { color: "red" }]}>
                  Xóa
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
});

export default ListCart;

const styles = StyleSheet.create({
  image: {
    width: 77,
    height: 77,
    borderRadius: 8,
    resizeMode: "contain",
    backgroundColor: "#F6F6F6",
    marginRight: 15,
  },
  check: {
    marginRight: 28,
  },
  rowContainer: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  textM: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  textL: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: "80%",
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 20,
  },
  modalButtonText: {
    fontSize: 16,
  },
});
