import React, {useContext, useState, useEffect} from "react"
import {View, Image, Platform, TextInput, Text, SafeAreaView} from "react-native"
import {updatePostData, postStore} from "../../stores/postStore"
import * as ImagePicker from "expo-image-picker"
import {FakeInput} from "../../components/FakeInput"
import {ScrollView} from "react-native-gesture-handler"
import {TrendKeywordsInput} from "../../components/TrendKeywordsInput"
import {List} from "../../components/List"

const styles = {
  container: {
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    height: "100%"
  },
  captionContainer: {
    flexDirection: "row"
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: "#999"
  },
  FakeInput: {
    height: 35
  },
  listItem: {
    height: 40,
    borderBottomWidth: 0.5
  },
  inputContainer: {
    marginTop: 20
  },
  label: {
    fontWeight: "bold",
    marginBottom: 10
  }
}

const onChipPress = (navigation, dispatch, preTags) => keyword => () => {
  updatePostData(dispatch, {tags: preTags === "" ? `#${keyword}`: `${preTags} #${keyword}`})
  // navigation.navigate("SelectKeywords")
}

const userInfoSample = [
  {label: "顔型", data: "卵型"},
  {label: "パーソナルカラー", data: "ブルベ夏"},
  {label: "肌タイプ", data: "普通肌"},
  {label: "年齢", data: "21歳"},
  {label: "性別", data: "WOMEN"}
]

// eslint-disable-next-line max-lines-per-function
export const SelectImages = ({navigation}) => {
  const {dispatch, state: {tags}} = useContext(postStore)
  const [image, setImage] = useState(null)

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!")
        }
      }
    })()
    // pickImage()
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    })

    console.log(result)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.captionContainer}>
        <Image source={{uri: image}} style={styles.image} />
        <TextInput placeholder="キャプションを書く"/>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>タグ付け</Text>
        <FakeInput navigation={navigation} icon="pound" linkTo="SelectKeywords" placeholder="タグ付け" style={styles.FakeInput} />
        {tags !== "" && <List rows={tags.split(" ").map(tag => ({title: tag, style: styles.listItem}))} />}
        <TrendKeywordsInput onChipPress={onChipPress(navigation, dispatch, tags)} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>使用アイテム</Text>
        <FakeInput navigation={navigation} icon="pound" linkTo="SelectKeywords" placeholder="使用アイテム" style={styles.FakeInput} />
        {tags !== "" && <List rows={tags.split(" ").map(tag => ({title: tag, style: styles.listItem}))} />}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>ユーザー情報</Text>
        <List rows={userInfoSample.map(({label, data}) => ({title: label, right: () => <View style={{justifyContent: "center"}}><Text style={{color: "#666"}}>{data}</Text></View>, style: styles.listItem}))} />
      </View>
    </ScrollView>
  )
}
