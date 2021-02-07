import React from "react"
import {View, Text, StyleSheet} from "react-native"
import {ScrollView} from "react-native-gesture-handler"
import {Avatar, Button, IconButton} from "react-native-paper"
import {useContext} from "react/cjs/react.development"
import {authStore} from "../../stores/authStore"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  userInfo: {
    padding: 12
  },
  followInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20
  },
  followInfoItem: {
    alignItems: "center",
    marginLeft: 20
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  bold: {
    fontWeight: "bold"
  },
  justifyCenter: {
    alignItems: "center"
  },
  displayname: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10
  },
  grayText: {
    color: "#666"
  },
  sentence: {
    marginTop: 15,
    fontSize: 16
  },
  userData: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center"
  },
  userDataItem: {
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  }
})

const FollowInfo = () => {
  return (
    <View style={styles.followInfoContainer}>
      <View style={styles.followInfoItem}>
        <Text style={styles.bold}>52</Text>
        <Text>投稿</Text>
      </View>
      <View style={styles.followInfoItem}>
        <Text style={styles.bold}>156</Text>
        <Text>フォロワー</Text>
      </View>
      <View style={styles.followInfoItem}>
        <Text style={styles.bold}>175</Text>
        <Text>フォロー中</Text>
      </View>
    </View>
  )
}

const sampleSelfIntroduction = `@sample413 eyelist
📍Shimokitazawa
ㅤㅤ
ご予約 / お問い合わせは
Coolpepper↓
https://beauty.coolpepper.jp/kr/hogehoge/staff/W0001`

const SelfIntroduction = () => {
  return (
    <View>
      <Text style={styles.displayname}>だいち</Text>
      <Text style={styles.grayText}>@0113Ds</Text>
      <Text style={styles.sentence} ellipsizeMode="tail" numberOfLines={6}>{sampleSelfIntroduction}</Text>
      <View style={styles.userData}>
        <View style={styles.userDataItem}><IconButton icon="face" size={15} style={{margin: 0}} color="#666" /><Text style={styles.grayText}>卵型</Text></View>
        <View style={styles.userDataItem}><IconButton icon="palette" size={15} style={{margin: 0}} color="#666" /><Text style={styles.grayText}>イエベ秋</Text></View>
        <View style={styles.userDataItem}><Text style={styles.grayText}>普通肌</Text></View>
      </View>
    </View>
  )
}


export const MyPage = ({navigation}) => {
  const {state: {user: {thumbnail}}} = useContext(authStore)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.row}>
          <Avatar.Image size={80} source={{uri: thumbnail}} />
          <FollowInfo />
        </View>
        <SelfIntroduction />
      </View>
      <Button
        icon="pencil-plus-outline"
        size={25}
        mode="outlined"
        onPress={() => navigation.navigate("PostScreen", {screen: "SelectImages"})}
      >
        投稿する
      </Button>
    </ScrollView>
  )
}
