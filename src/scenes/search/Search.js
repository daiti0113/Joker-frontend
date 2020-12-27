import React, {useContext} from "react"
import {TopNavigation} from "../../components/TopNavigation"
import {SelectConditions} from "./SelectConditions"
import {searchStore, updateTmpConditionsTarget, fetchPosts} from "../../stores/searchStore"

const screens = [
  {label: "メイク", routeName: "SearchMakeup", key: "makeup"},
  {label: "ユーザー", routeName: "SearchUser", key: "user"}
]

const createRows = (screens, dispatch, tmpConditions) => 
  screens.map(screen => ({
    label: screen.label,
    routeName: screen.routeName,
    key: screen.key,
    component: SelectConditions,
    listeners: {tabPress: () => {
      updateTmpConditionsTarget(dispatch, screen.key)
      fetchPosts(dispatch, tmpConditions)
    }}
  }))

export const Search = () => {
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)

  return <TopNavigation items={createRows(screens, dispatch, tmpConditions)} />
}
