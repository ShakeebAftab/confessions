import React from "react";
import { StyleSheet, Text } from "react-native";

//  Custom Imports
import Card from "./Card";

const Comment = ({ comment: { userName, body } }) => {
  return (
    <Card styles={style.card}>
      <Text style={style.textUserName}>{userName}</Text>
      <Text style={style.textBody}>{body}</Text>
    </Card>
  );
};

const style = StyleSheet.create({
  card: {
    paddingLeft: "6%",
  },
  textUserName: {
    fontFamily: "userNameFont",
  },
  textBody: {
    paddingVertical: "1%",
    fontSize: 15,
  },
});

export default Comment;
