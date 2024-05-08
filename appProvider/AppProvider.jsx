import {FAVORITE_VARIANTS, USER_DATA} from 'constants/general'
import * as React from 'react'
import {MUIThemeProvider} from 'theme'
import {SUBSCRIPTION_STATE} from 'utils'

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
    favoriteVariants: null,
    userData: null,
    userHasCreateAccount: true,
    [SUBSCRIPTION_STATE]: null,
    icons,
  }
  const [appState, setAppState] = React.useState(initState)

  const value = React.useCallback(() => {
    return [appState, setAppState]
  }, [appState, setAppState])

  const getInitialStates = async () => {
    let favoriteVariants = null
    let userData = null
    const localStorageFavoriteVariants = localStorage.getItem(FAVORITE_VARIANTS)
    const localStorageUserData = localStorage.getItem(USER_DATA)

    if (localStorageFavoriteVariants) {
      favoriteVariants = await JSON.parse(
        localStorage.getItem(FAVORITE_VARIANTS) || '',
      )
    }

    if (localStorageUserData) {
      userData = await JSON.parse(localStorage.getItem(USER_DATA) || 'lll')
    }

    const isAuthenticate = !!userData

    setAppState(prevState => {
      return {
        ...prevState,
        isAuthenticate,
        favoriteVariants,
        userData,
        icons,
      }
    })
  }

  React.useEffect(() => {
    getInitialStates()
  }, [icons])

  return (
    <MUIThemeProvider>
      <AppContext.Provider value={value()}>{children}</AppContext.Provider>
    </MUIThemeProvider>
  )
}

export {AppProvider, AppContext}
