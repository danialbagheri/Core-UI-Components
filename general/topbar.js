import * as React from 'react'
import {getTopBarStatus} from '../../services'

export default function TopBar() {
  const [message, setMessage] = React.useState(null)

  React.useEffect(() => {
    getTopBarStatus()
      .then(res => setMessage(res))
      .catch(err => console.error(err))
  }, [])

  if (message) {
    if (message.active) {
      return (
        <div className="top-bar">
          <p className="text-white text-centre">{message.value}</p>
        </div>
      )
    }
  }
  return null
}
