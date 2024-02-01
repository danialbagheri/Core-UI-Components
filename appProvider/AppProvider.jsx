import * as React from 'react'
import {MUIThemeProvider} from 'theme'

const AppContext = React.createContext(undefined)

function AppProvider(props) {
  const {children, icons = {}} = props

  const initState = {
    searchValues: {
      value: '',
      results: [],
      count: 0,
    },
    productQuestions: [],
    userAssets: null,
    signUpEmail: '',
    isAuthenticate: undefined,
    favoriteProducts: null,
    icons,
  }
  const [appState, setAppState] = React.useState(initState)

  const value = React.useCallback(() => {
    return [appState, setAppState]
  }, [appState, setAppState])

  React.useEffect(() => {
    setAppState(prevState => {
      return {
        ...prevState,
        icons,
      }
    })
  }, [icons])

  return (
    <MUIThemeProvider>
      <AppContext.Provider value={value()}>{children}</AppContext.Provider>
    </MUIThemeProvider>
  )
}

export {AppProvider, AppContext}
