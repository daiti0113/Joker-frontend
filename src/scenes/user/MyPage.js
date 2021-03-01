import React, {useContext, useEffect} from "react"
import {View, Text, StyleSheet, ScrollView} from "react-native"
import {Avatar, Button, Divider, IconButton} from "react-native-paper"
import {ImageList} from "../../components/ImageList"
import {appStore} from "../../stores/appStore"
import {authStore, fetchMyPosts, fetchPostCount} from "../../stores/authStore"
import {fetchPostDetail, postDetailStore} from "../../stores/postDetailStore"

const styles = StyleSheet.create({
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
    alignItems: "center"
  },
  divider: {
    marginVertical: 5
  },
  button: {
    alignSelf: "center",
    width: 200
  }
})

const FollowInfo = () => {
  const {state: {user: {post_count}}} = useContext(authStore)

  return (
    <View style={styles.followInfoContainer}>
      <View style={styles.followInfoItem}>
        <Text style={styles.bold}>{post_count ? post_count : 0}</Text>
        <Text>投稿</Text>
      </View>
      {/* <View style={styles.followInfoItem}>
        <Text style={styles.bold}>0</Text>
        <Text>フォロワー</Text>
      </View> */}
      {/* <View style={styles.followInfoItem}>
        <Text style={styles.bold}>0</Text>
        <Text>フォロー中</Text>
      </View> */}
    </View>
  )
}

// eslint-disable-next-line complexity
const SelfIntroduction = ({user, M}) => {
  return (
    <View>
      <Text style={styles.displayname}>{user.nickname}</Text>
      <Text style={styles.grayText}>@{user.name}</Text>
      {user.self_introduction !== null && user.self_introduction !== "" && <Text style={styles.sentence} ellipsizeMode="tail" numberOfLines={6}>{user.self_introduction}</Text>}
      <View style={styles.userData}>
        {user.face_type !== null && user.face_type !== "" && <View style={styles.userDataItem}><IconButton icon="face" size={15} style={{margin: 0}} color="#666" /><Text style={styles.grayText}>{M.face_type[user.face_type]}</Text></View>}
        {user.base_color !== null && user.base_color !== "" && <View style={styles.userDataItem}><IconButton icon="palette" size={15} style={{margin: 0}} color="#666" /><Text style={styles.grayText}>{M.base_color[user.base_color]}{M.season[user.season]}</Text></View>}
        {user.skin_type !== null && user.skin_type !== "" && <View style={styles.userDataItem}><Text style={styles.grayText}>{M.skin_type[user.skin_type]}</Text></View>}
      </View>
    </View>
  )
}

const createData = (posts, navigation, searchDispatch) => posts.map(post => ({
  ...post,
  id: post.id,
  onPress: async () => {
    await fetchPostDetail(searchDispatch, post.id, post.DateTime)
    navigation.navigate("PostDetail")
  }
}))

// スクロールエンドの判定を行う
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
}

// eslint-disable-next-line max-lines-per-function
export const MyPage = ({navigation}) => {
  const {dispatch, state: {user, nextToken}} = useContext(authStore)
  const {state: {masterData}} = useContext(appStore)
  const {dispatch: postDetailDispatch} = useContext(postDetailStore)
  const data = createData(user.posts, navigation, postDetailDispatch)
  
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchMyPosts(dispatch, user.user_id)
      fetchPostCount(dispatch, user.user_id)
    })
    return unsubscribe
  }, [navigation])

  return (
    <ScrollView
      onScroll={({nativeEvent}) => {
        isCloseToBottom(nativeEvent) && nextToken && fetchMyPosts(dispatch, user.user_id, nextToken)
      }}
      scrollEventThrottle={400}
    >
      <View style={styles.userInfo}>
        <View style={styles.row}>
          {/* eslint-disable-next-line no-undef */}
          <Avatar.Image size={80} source={user.thumbnail_img_src ? {uri: user.thumbnail_img_src} : require("../../../assets/no_image.png")} />
          <FollowInfo />
        </View>
        <SelfIntroduction user={user} M={masterData} />
      </View>
      <Button
        mode="contained"
        icon="plus"
        onPress={() => navigation.navigate("PostScreen", {screen: "SelectImages"})}
        style={styles.button}
      >
        投稿する
      </Button>
      <Divider style={styles.divider} />
      <ImageList data={data} scrollEnabled={false} />
    </ScrollView>
  )
}
