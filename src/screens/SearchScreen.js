/* eslint-disable react/display-name */
import React, {useContext} from "react"
import {createStackNavigator} from "@react-navigation/stack"
import {Search} from "../scenes/search/Search"
import {NewsFeed} from "../scenes/search/NewsFeed"
import {SearchInput} from "../components/SearchInput"
import {Text} from "react-native-paper"
import {SearchProvider, searchStore, updateSuggestionItems} from "../stores/searchStore"
import {SelectKeywords} from "../scenes/search/SelectKeywords"
import {apiRequest} from "../helper/requestHelper"
import {Post} from "../scenes/search/Post"
import {FakeSearchInput} from "../components/FakeSearchInput"

const Stack = createStackNavigator()

const createDefaultScreenOptions = navigation => ({
  headerRight: () => <Text onPress={() => navigation.reset({index: 0, routes: [{name: "NewsFeed"}]})}>キャンセル</Text>,
  headerRightContainerStyle: {marginRight: 5, padding: 0}
})

const navigatorProps = ({
  initialRouteName: "NewsFeed",
  screenOptions: {
    headerStyle: {height: 70},
    headerTitleStyle: {width: "70%"},
    headerTitleAlign: "left",
    headerBackTitleVisible: false
  }
})

const getSuggestionItems = (dispatch, text) => {
  const query = `{
    suggestionItems(item_name: "${text}", limit: 20) {
        item_id
        brand_name
        item_name
      }
  }`
  const {data, error, loading} = apiRequest(query)
  return !loading && !error && updateSuggestionItems(dispatch, data.suggestionItems)
}

const SearchScreenInner = ({navigation}) => {
  const defaultScreenOptions = createDefaultScreenOptions(navigation)
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)

  return (
    <Stack.Navigator {...navigatorProps}>
      {/* SearchbarのonChangeで再レンダリングされないようにheaderTitleにわたすコンポーネントは無名関数でラップする */}
      <Stack.Screen name="Search" component={Search} options={{
        ...defaultScreenOptions
      }}/>
      <Stack.Screen name="SelectKeywords" component={SelectKeywords} options={{
        ...defaultScreenOptions,
        headerTitle: () => <SearchInput isFocused={true} onChangeText={text => getSuggestionItems(dispatch, text)} />
      }}/>
      <Stack.Screen name="NewsFeed" component={NewsFeed} options={{
        ...defaultScreenOptions,
        headerRight: false,
        headerLeft: false,
        headerTitle: () => <FakeSearchInput navigation={navigation} value={tmpConditions.keywords} />,
        gestureDirection: "horizontal-inverted"
      }}/>
      <Stack.Screen name="Post" component={Post} options={defaultScreenOptions} />
    </Stack.Navigator>
  )
}

export const SearchScreen = props => <SearchProvider><SearchScreenInner {...props} /></SearchProvider>