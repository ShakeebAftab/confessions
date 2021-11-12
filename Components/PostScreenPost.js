import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";

//  Custom Components
import Card from "./Card";

const PostScreenPost = ({ post: { userName, body, hidden, id } }) => {
  return (
    <Card>
      <View style={style.parent}>
        <View style={style.viewUserName}>
          <Text style={style.textUserName}>
            {hidden ? "ANONYMOUS" : userName}
          </Text>
        </View>
        <View style={style.viewBody}>
          <Text style={style.textBody}>{body}</Text>
        </View>
      </View>
      <View style={style.parent}>
        <View style={style.viewButton}></View>
      </View>
    </Card>
  );
};

const style = StyleSheet.create({
  viewUserName: {
    paddingTop: "3%",
  },
  textUserName: {
    fontSize: 16,
    fontFamily: "userNameFont",
  },
  textBody: {
    fontSize: 14,
  },
  viewBody: {
    paddingVertical: "3%",
    paddingBottom: "8%",
  },
  textLike: {
    marginTop: "4%",
    marginLeft: "10%",
    fontSize: 15,
  },
  viewButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "2%",
    paddingHorizontal: "5%",
    borderTopWidth: 1,
  },
  parent: {
    paddingHorizontal: 15,
  },
  viewLikeButton: {
    flexDirection: "row",
    width: "30%",
  },
});

export default PostScreenPost;
