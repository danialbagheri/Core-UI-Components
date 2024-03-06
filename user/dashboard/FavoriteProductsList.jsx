import * as React from 'react'

/* ----------------------------- MUI Components ----------------------------- */
import {Box} from '@mui/material'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {MobileFavList} from './components'
import {CustomButton} from '../localShared'
import {getFavoriteVariantsHandler} from 'utils'
import {AppContext} from 'components/appProvider'
import {useAuthFetch} from 'components/customHooks'
import DesktopFavList from './components/DesktopFavList'
/* -------------------------------------------------------------------------- */

export function FavoriteProductsList() {
  const [appState, setAppState] = React.useContext(AppContext)
  const [loading, setLoading] = React.useState(true)

  const authFetchHandler = useAuthFetch()

  const getFavoriteVariants = async () => {
    setLoading(true)
    try {
      await getFavoriteVariantsHandler({setAppState, authFetchHandler})
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  //Get user favorite list if not already fetched
  React.useEffect(() => {
    if (!appState.favoriteProducts) {
      getFavoriteVariants()
    } else {
      setLoading(false)
    }
  }, [])

  return (
    <Box className="centralize" sx={{width: '100%', flexDirection: 'column'}}>
      <DesktopFavList loading={loading} />
      <MobileFavList loading={loading} />
      {appState?.favoriteProducts?.length && !loading ? (
        <CustomButton sx={{mt: '60px', height: 52}} variant="contained">
          Add all to cart
        </CustomButton>
      ) : null}
    </Box>
  )
}
