import * as React from 'react'

const UserContext = React.createContext(undefined)

function UserProvider(props) {
  const initState = {}
  const [userState, setUserState] = React.useState(initState)

  const value = React.useCallback(() => {
    return [userState, setUserState]
  }, [userState, setUserState])

  return <UserContext.Provider value={value} {...props} />
}

export {UserProvider, UserContext}
