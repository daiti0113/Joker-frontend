import React, {useState} from "react"
import {View, Text, StyleSheet, ScrollView, KeyboardAvoidingView} from "react-native"
import {Avatar, Divider} from "react-native-paper"
import {IconTextInput} from "../components/IconTextInput"

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  row: {
    flexDirection: "row"
  },
  divider: {
    marginVertical: 5
  },
  nickname: {
    fontWeight: "bold",
    color: "#333",
    marginTop: 3,
    marginLeft: 5
  },
  comment: {
    marginLeft: 35
  },
  input: {
    height: 40,
    width: "85%",
    position: "absolute",
    bottom: 10,
    marginLeft: 10
  }
})


const CommentItem = ({thumbnail_img_src, nickname, comment}) => {
  return (
    <>
      <View style={styles.itemContainer}>
        <View style={styles.row}>
          {/* eslint-disable-next-line no-undef */}
          <Avatar.Image size={30} source={thumbnail_img_src !== "" ? {uri: thumbnail_img_src} : require("../../assets/no_image.png")} onPress={() => {}} />
          <Text style={styles.nickname}>{nickname}</Text>
        </View>
        <Text style={styles.comment}>{comment}</Text>
      </View>
      <Divider style={styles.divider} />
    </>
  )
}

/* APIができるまでのモックデータ ここから*/
const sunagawa_thumbnail = "https://mabell-app-img-storage.s3-ap-northeast-1.amazonaws.com/ap-northeast-1:1f56c1d9-8f0f-4f51-90ef-5d5f75af0b34/9fc77ca9-01a5-4d33-84ea-be273f5d84fb.jpg"
const mabell_thumbnail = "https://mabell-app-img-storage.s3-ap-northeast-1.amazonaws.com/ap-northeast-1:b90cae25-45c8-4361-91b7-47a5fa2474ab/a0a6e6e1-e195-4ae4-a817-1e01a2019857.png"

const testCommentsData = [
  {user_id: "28105991-d557-4a15-ba0d-6a6675168b28", thumbnail_img_src: sunagawa_thumbnail, nickname: "test_sunagawa", comment: "コメント1", updated_at: "", to: ""},
  {user_id: "671419a5-983e-4b0f-a888-cd69fb02fe4f", thumbnail_img_src: mabell_thumbnail, nickname: "mabell_official", comment: "これはとっても長いコメントのサンプルです。ほら長いでしょ？", updated_at: "", to: ""},
  {user_id: "28105991-d557-4a15-ba0d-6a6675168b28", thumbnail_img_src: sunagawa_thumbnail, nickname: "test_sunagawa", comment: "フォローさせていただきました♪コスメかわいい💖欲しいです☺️💓よかったら仲良くしてください🥰", updated_at: "", to: ""},
  {user_id: "671419a5-983e-4b0f-a888-cd69fb02fe4f", thumbnail_img_src: mabell_thumbnail, nickname: "mabell_official", comment: "@test_sunagawa さま🌸コメント、フォローありがとうございます🙇🏻‍♀️嬉しいです！！ぜひよろしくお願いします🐒💖", updated_at: "", to: ""},
  {user_id: "28105991-d557-4a15-ba0d-6a6675168b28", thumbnail_img_src: sunagawa_thumbnail, nickname: "test_sunagawa", comment: "コメント5", updated_at: "", to: ""},
  {user_id: "671419a5-983e-4b0f-a888-cd69fb02fe4f", thumbnail_img_src: mabell_thumbnail, nickname: "mabell_official", comment: "コメント6", updated_at: "", to: ""}
]
/* APIができるまでのモックデータ ここまで*/

export const Comments = () => {
  // const {post} = useSelector(({postDetail: {post}}) => ({post}))
  const [comments, setComments] = useState(testCommentsData)
  const [isFocused, setIsFocused] = useState(false)

  return (
    <>
      <ScrollView>
        {comments.map((comment, idx) => <CommentItem key={`comment_${idx}`} {...comment} />)}
      </ScrollView>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={180}
        enabled={isFocused}
      >
        <IconTextInput containerStyle={styles.input} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} />
      </KeyboardAvoidingView>
    </>
  )
}
