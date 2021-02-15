import React, {useContext, useEffect} from "react"
import {ScrollView} from "react-native"
import {Button} from "react-native-paper"
import {ChipList} from "../../components/ChipList"
import {createTag, fetchTags, fetchTrendTags, postStore, updateTmpTags} from "../../stores/postStore"
import {TAG_SEARCH_PLACE_HOLDER} from "../../styles/constants"
import {IconTextInput} from "../../components/IconTextInput"
import {useState} from "react/cjs/react.development"

const styles = {
  container: {
    marginTop: 5
  },
  button: {
    height: 50,
    marginHorizontal: 5,
    marginTop: 30,
    justifyContent: "center"
  },
  buttonContentStyle: {
    height: "100%"
  }
}

const createRows = (dispatch, tags, navigation) =>
  tags.map(tag => ({
    label: `#${tag.tag_name}`,
    selected: false,
    onPress: () => {
      updateTmpTags(dispatch, tag.tag_name)
      navigation.goBack()
    }
  }))

const onPress = (dispatch, text, navigation, suggestionTags) => () => {
  suggestionTags.map(tag => tag.tag_name).includes(text) ? updateTmpTags(dispatch, text) : createTag(dispatch, text)
  navigation.goBack()
}

const onChangeText = (dispatch, setText) => text => {
  setText(text)
  fetchTags(dispatch, text)
}

export const SeletcTags = ({navigation}) => {
  const {dispatch, state: {suggestionTags, tmpPost: {tags}}} = useContext(postStore)
  const rows = createRows(dispatch, suggestionTags, navigation)
  const [text, setText] = useState("")

  useEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back",
      // eslint-disable-next-line react/display-name
      headerTitle: () => <IconTextInput placeholder={TAG_SEARCH_PLACE_HOLDER} defaultValue={tags} onChangeText={onChangeText(dispatch, setText)} />
    })
    fetchTrendTags(dispatch)
  }, [dispatch])

  return (
    <ScrollView style={styles.container}>
      <ChipList items={rows} />
      <Button mode="contained" style={styles.button} contentStyle={styles.buttonContentStyle} onPress={onPress(dispatch, text, navigation, suggestionTags)}>タグを追加</Button>
    </ScrollView>
  )
}