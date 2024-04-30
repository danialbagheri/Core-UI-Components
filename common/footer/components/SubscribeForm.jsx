import * as React from 'react'

import {
  NOT_SUBSCRIBED,
  SUBSCRIBED,
  SUBSCRIPTION_STATE,
  subscriptionHandler,
  validateEmail,
} from 'utils'
import {Container} from './Container'
import {AppContext} from 'components/appProvider'
import {useAuthFetch} from 'components/customHooks'
import {getUserInfo, postUserSubscriptionInfo} from 'services'
import {SubscribeElement} from './SubscribeElement'

export function SubscribeForm({sx = {}}) {
  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [appState, setAppState] = React.useContext(AppContext)

  const authFunctions = useAuthFetch()

  const submitHandler = async e => {
    e.preventDefault()

    if (!email) {
      setError('Email is required.')
      return
    } else if (!validateEmail(email)) {
      setError('Please enter a correct email address.')
      return
    }

    setLoading(true)
    setError('')

    const subscribeState = await subscriptionHandler({
      email,
      setLoading,
      setAppState,
    })

    if (subscribeState) {
      userDataHandler(true)
    }
  }

  const userDataHandler = async subscriptionState => {
    if (subscriptionState) {
      //Check if user is registered and we had not fetched the user data
      if (appState.userData === null && appState.userHasCreateAccount) {
        const onAuthenticatedAction = async token => {
          const data = await getUserInfo(token)
          setAppState(prevState => ({
            ...prevState,
            userData: {...data},
            [SUBSCRIPTION_STATE]: SUBSCRIBED,
          }))
        }
        const onNotAuthenticatedAction = async () => {
          setAppState(prevState => ({
            ...prevState,
            [SUBSCRIPTION_STATE]: SUBSCRIBED,
            userHasCreateAccount: false,
            userData: null,
          }))
        }

        await authFunctions({
          onAuthenticatedAction,
          onNotAuthenticatedAction,
        })
      }
    } else if (appState[SUBSCRIPTION_STATE] === null) {
      const onAuthenticatedAction = async token => {
        const data = await getUserInfo(token)
        const email = data.email
        const subscriptionData = await postUserSubscriptionInfo({
          token,
          data: {email},
        })
        const subscriptionState = subscriptionData.is_subscribed
          ? SUBSCRIBED
          : NOT_SUBSCRIBED
        localStorage.setItem(SUBSCRIPTION_STATE, subscriptionState)
        setAppState(prevState => ({
          ...prevState,
          userData: {...data},
          [SUBSCRIPTION_STATE]: false,
        }))
      }

      const onNotAuthenticatedAction = () => {
        setAppState(prevState => ({
          ...prevState,
          [SUBSCRIPTION_STATE]: null,
          userData: null,
        }))
      }

      await authFunctions({
        onAuthenticatedAction,
        onNotAuthenticatedAction,
      })
    }
  }

  React.useEffect(() => {
    const subscriptionState = localStorage.getItem(SUBSCRIPTION_STATE)
    const isSubscribed = subscriptionState === SUBSCRIBED

    userDataHandler(isSubscribed)
  }, [])

  return (
    <Container sx={{...sx}}>
      <SubscribeElement
        email={email}
        error={error}
        loading={loading}
        setEmail={setEmail}
        submitHandler={submitHandler}
      />
    </Container>
  )
}
