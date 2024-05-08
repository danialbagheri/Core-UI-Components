import * as React from 'react'

import {destroyCookie, parseCookies, setCookie} from 'nookies'
import {AppContext} from '../appProvider'
import {postRefreshToken} from '../../services'
import {FAVORITE_VARIANTS, USER_DATA} from 'constants/general'

export function useAuthFetch() {
  const {calacc, calref} = parseCookies()
  const [, setAppState] = React.useContext(AppContext)

  return async function ({
    setLoading,
    onAuthenticatedAction = async () => {},
    onNotAuthenticatedAction = async () => {},
    handleError = () => {},
    onFinally = () => {},
  }) {
    if (setLoading) {
      setLoading(true)
    }

    try {
      await onAuthenticatedAction(calacc)
      setAppState(perv => ({...perv, isAuthenticate: true}))
    } catch (err) {
      if (err.status === 401) {
        try {
          const {access} = await postRefreshToken({
            refresh: calref || 'no-token',
          })

          setAppState(perv => ({...perv, isAuthenticate: true}))
          setCookie(null, 'calacc', access, {
            maxAge: 30 * 24 * 60 * 60 * 1000 * 1000,
            path: '/',
          })

          await onAuthenticatedAction(access)
        } catch (err) {
          if (err.status === 401) {
            destroyCookie(null, 'calacc', {path: '/'})
            destroyCookie(null, 'calref', {path: '/'})
            localStorage.removeItem(FAVORITE_VARIANTS)
            localStorage.removeItem(USER_DATA)
            setAppState(perv => ({
              ...perv,
              isAuthenticate: false,
              favoriteVariants: null,
              userData: null,
            }))
            await onNotAuthenticatedAction()
            console.error(err)
          } else {
            console.error(err)
            handleError(err.res)
          }
        }
      } else {
        console.error(err)
        handleError(err.res)
      }
    } finally {
      onFinally()
      if (setLoading) {
        setLoading(false)
      }
    }
  }
}
