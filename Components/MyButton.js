import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

const MyButton = ({ styles, children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ ...style.viewButton, ...styles }}>{children}</View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  viewButton: {},
});

export default MyButton;
