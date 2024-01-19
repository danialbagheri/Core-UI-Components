import * as React from 'react'
import {MUIThemeProvider} from 'theme'

const AppContext = React.createContext(undefined)

function AppProvider(props) {
  const initState = {
    searchValues: {
      value: '',
      results: [],
      count: 0,
    },
    productQuestions: [],
    userAssets: null,
    signUpEmail: '',
  }
  const [appState, setAppState] = React.useState(initState)

  const value = React.useCallback(() => {
    return [appState, setAppState]
  }, [appState, setAppState])

  return (
    <MUIThemeProvider>
      <AppContext.Provider value={value()} {...props} />
    </MUIThemeProvider>
  )
}

export {AppProvider, AppContext}
