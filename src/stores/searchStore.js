import React, {createContext, useReducer} from "react"

const initialState = {
  conditions: {
    userInfo: {
      personalColor: false,
      faceType: false
    },
    color: ""
  }
}

// Define Store
const searchStore = createContext(initialState)

// Define Types
const UPDATE_CONDITIONS_USER_INFO = "UPDATE_CONDITIONS_USER_INFO"
const UPDATE_CONDITIONS_COLOR = "UPDATE_CONDITIONS_COLOR"

// Define ActionCreator
export const updateConditionsUserInfo = (dispatch, userInfo) => dispatch({type: UPDATE_CONDITIONS_USER_INFO, payload: userInfo})
export const updateConditionsColor = (dispatch, color) => dispatch({type: UPDATE_CONDITIONS_COLOR, payload: color})

// Defin Provider
const {Provider} = searchStore
const SearchProvider = ({children}) => {
  // Define Reducer
  const [state, dispatch] = useReducer((state, action) => {
    console.log("[prevState]", state)
    console.log(action.type, action.payload)
    switch (action.type) {
      case UPDATE_CONDITIONS_USER_INFO:
        return {conditions: {...state.conditions, userInfo: {...state.conditions.userInfo, ...action.payload}}}
      case UPDATE_CONDITIONS_COLOR:
        return {conditions: {...state.conditions, color: action.payload}}
      default:
        return {...state}
    }
  }, initialState)
  console.log("nextState", state)
  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {searchStore, SearchProvider}