import React, {useContext} from "react"
import {ScrollView} from "react-native"
import {List} from "../../components/List"
import {Checkbox} from "react-native-paper"
import {searchStore, updateConditionsCountry} from "../../stores/searchStore"

const countries = [
  {title: "韓国", key: "korea"},
  {title: "中国",  key: "china"},
  {title: "欧米",  key: "america"},
  {title: "その他", key: "other"}
]

const createRows = (countries, dispatch, selectedCountry) =>
  countries.map(country => ({
    title: country.title,
    key: country.key,
    // eslint-disable-next-line react/display-name
    right: () => <Checkbox status={country.key === selectedCountry ? "checked" : "unchecked"} color="#333" />,
    onPress: () => updateConditionsCountry(dispatch, country.key)
  }))


export const SelectCountry = () => {
  const {dispatch, state} = useContext(searchStore)
  const rows = createRows(countries, dispatch, state.conditions.country)

  return (
    <ScrollView>
      <List rows={rows} />
    </ScrollView>
  )
}