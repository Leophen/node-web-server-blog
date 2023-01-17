const defaultState = {
  status: false
}

const handleLogin = (state) => {
  const newState = JSON.parse(JSON.stringify(state)) // 深拷贝
  newState.status = true
  return newState
}

const handleLogout = (state) => {
  const newState = JSON.parse(JSON.stringify(state)) // 深拷贝
  newState.status = false
  return newState
}

const loginReducer = {
  state: defaultState,
  reducers: {
    login: (state) => handleLogin(state),
    logout: (state) => handleLogout(state)
  }
}

export default loginReducer
