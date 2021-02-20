import React, {useContext, useState} from "react"
import {Button, TextInput, Text} from "react-native-paper"
import {View, StyleSheet, Image} from "react-native"
import {defaultStyle} from "../../styles/defaultStyle"
import {authStore, login} from "../../stores/authStore"
import {appStore} from "../../stores/appStore"

const styles = StyleSheet.create({
  ...defaultStyle,
  input: {
    maxHeight: 50,
    minWidth: 280,
    margin: 10
  },
  submit: {
    height: 50,
    minWidth: 280,
    margin: 20,
    justifyContent: "center"
  },
  buttonContentStyle: {
    height: "100%"
  },
  signupLink: {
    fontWeight: "bold"
  },
  logo: {
    width: 100,
    height: 100
  },
  errMsg: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: "auto",
    color: "red"
  }
})

export const Login = ({navigation}) => {
  const {dispatch, state: {err_msg, user: {sub}}} = useContext(authStore)
  const {dispatch: appDispatch} = useContext(appStore)
  const [mail, setMail] = useState("username1")
  const [password, setPassword] = useState("P@$$w0rd")

  return (
    <View style={styles.container}>
      {/* eslint-disable-next-line no-undef */}
      <Image source={require("../../../assets/icon.png")} style={styles.logo} />
      <TextInput style={styles.input} mode="outlined" label="ユーザー名またはメールアドレス" value={mail} onChangeText={text => setMail(text)} />
      <TextInput style={styles.input} mode="outlined" label="パスワード" value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} />
      {err_msg !== "" && <Text style={styles.errMsg}>{err_msg}</Text>}
      <Button style={styles.submit} contentStyle={styles.buttonContentStyle} mode="contained" onPress={() => login(navigation, dispatch, mail, password, appDispatch)}>ログイン</Button>
      <Text>アカウントをお持ちでない場合 <Text style={styles.signupLink} onPress={() => navigation.navigate("RegisterUsername")}>登録はこちら</Text></Text>
    </View>
  )
}
