import {useRouter} from 'next/router'
import {destroyCookie, parseCookies, setCookie} from 'nookies'

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

  if (setError) {
    setError({...initialState})
  }

  if (setLoading) {
    setLoading(true)
  }

  try {
    const response = await asyncFunc({data, token: calacc})
    return response
  } catch (err) {
    if (err.status === 401) {
      try {
        const {access} = await asyncFunc({refresh: calref || 'null_token'})
        setCookie(null, 'calacc', access, {
          path: '/',
        })

        const response = await asyncFunc({data, token: access})
        return response
      } catch {
        if (err.status === 401) {
          destroyCookie(null, 'calacc', {path: '/'})
          destroyCookie(null, 'calref', {path: '/'})
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
