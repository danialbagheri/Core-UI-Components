import {useRouter} from 'next/router'
import {destroyCookie, parseCookies, setCookie} from 'nookies'
import {useContext} from 'react'
import {AppContext} from '../../appProvider'

export async function useAuthFetch({
  asyncFunc,
  setError = null,
  handleError = null,
  setLoading = null,
  initialState = null,
  data = {},
}) {
  const {calacc, calref} = parseCookies()
  const router = useRouter()
  const {setAppState} = useContext(AppContext)

  if (setError) {
    setError({...initialState})
  }

  if (setLoading) {
    setLoading(true)
  }

  try {
    const response = await asyncFunc({data, token: calacc})
    setAppState(perv => ({...perv, isAuthenticate: true}))
    return response
  } catch (err) {
    if (err.status === 401) {
      try {
        const {access} = await asyncFunc({refresh: calref || 'null_token'})
        setCookie(null, 'calacc', access, {
          path: '/',
        })
        setAppState(perv => ({...perv, isAuthenticate: true}))

        const response = await asyncFunc({data, token: access})
        return response
      } catch {
        if (err.status === 401) {
          destroyCookie(null, 'calacc', {path: '/'})
          destroyCookie(null, 'calref', {path: '/'})
          setAppState(perv => ({...perv, isAuthenticate: false}))
          console.error(err)
          router.push('/user')
        } else {
          console.error(err)
          if (handleError) {
            handleError(err.res)
          }
        }
      }
    } else {
      console.error(err)
      if (handleError) {
        handleError(err.res)
      }
    }
  } finally {
    if (setLoading) {
      setLoading(false)
    }
  }
}
