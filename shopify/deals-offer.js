import {useEffect, useState} from 'react'
import DealItem from './deal-item'
import LinearProgress from '@mui/material/LinearProgress'
import {Typography} from '@mui/material'

export default function DealOffer(props) {
  const [offerDeal, setOfferDeal] = useState(false)
  const [remainingAmount, setRemainingAmount] = useState(0)
  const [remindFreeDelivery, setRemindFreeDelivery] = useState(false)
  const [offerLipBalm] = useState(false)
  const totalPrice = props.checkoutState?.totalPrice
  const checkoutState = props.checkoutState

  // const checkLipBalmDeal = () => {
  //   const lineItems = checkoutState.lineItems

  //   function verifySku(n) {
  //     return n.variant.sku.startsWith('CALB')
  //   }
  //   const result = _.map(lineItems, verifySku)
  //   const containSanitiser = _.pullAll(result, [false])
  //   if (lineItems && lineItems.length == containSanitiser.length) {
  //     setOfferLipBalm(false)
  //     console.error('There is only sanitiser in the basket')
  //   } else {
  //     setOfferLipBalm(true)
  //   }
  // }

  const checkFreeDeliveryEligibility = () => {
    if (checkoutState?.totalPrice && checkoutState.totalPrice.amount < 25) {
      const remainingAmount = 25 - parseFloat(checkoutState.totalPrice.amount)
      setRemainingAmount(remainingAmount.toFixed(2))
      setRemindFreeDelivery(true)
    } else {
      setRemindFreeDelivery(false)
    }
  }

  const checkSanitiserDeal = () => {
    const minTotalPriceCondition = 5
    if (totalPrice > minTotalPriceCondition) {
      setOfferDeal(true)
    } else {
      setOfferDeal(false)
    }
  }

  useEffect(() => {
    checkSanitiserDeal()
    checkFreeDeliveryEligibility()
  }, [props.checkoutState])

  return (
    <>
      {remindFreeDelivery ? (
        <div className="Cart-info clearfix calypso-orange">
          <LinearProgress
            color="primary"
            sx={{mb: 3}}
            value={100 - remainingAmount * 4}
            variant="determinate"
          />
          <Typography color="primary">
            Spend £{remainingAmount} more to be eligible for{' '}
            <strong>FREE shipping</strong>
          </Typography>
        </div>
      ) : (
        <div className="Cart-info clearfix calypso-orange">
          <LinearProgress
            color="primary"
            sx={{mb: 3}}
            value={100}
            variant="determinate"
          />
          <Typography color="primary">
            You have got free shipping! 🧡 🎉
          </Typography>
        </div>
      )}
      <div className="deal-container">
        {offerDeal || offerLipBalm ? (
          <div className="Cart-info clearfix">
            <div>
              <Typography color="primary">
                <strong>DEALS</strong>
              </Typography>
              <div>
                <Typography color="primary">
                  <small>You are eligible for the following deals</small>
                </Typography>
              </div>
              {offerDeal && <DealItem />}
              {/* {offerLipBalm && <LipBalmDeal />} */}
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}
