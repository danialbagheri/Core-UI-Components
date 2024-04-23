import * as React from 'react'

import {dateFormat} from 'utils'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import {IconButton, useTheme} from '@mui/material'
import Stack from '@mui/material/Stack'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import {singleReviewPatch} from 'services'
import {BouncyLoading} from 'sharedComponents'

const LIKE = 'like'
const DISLIKE = 'dislike'
const REVIEW_ACTION_IDS = 'reviewActionIds'

function ReviewDetail(props) {
  const theme = useTheme()

  const [like, setLike] = React.useState(props.like)
  const [dislike, setDislike] = React.useState(props.dislike)
  const [loading, setLoading] = React.useState({like: false, dislike: false})
  const [disabled, setDisabled] = React.useState(false)

  const localStorageHandler = async id => {
    const reviewActionIds =
      (await JSON.parse(localStorage.getItem(REVIEW_ACTION_IDS))) || []
    reviewActionIds.push(id)
    localStorage.setItem(REVIEW_ACTION_IDS, JSON.stringify(reviewActionIds))
  }

  const reviewRateHandler = async (id, rate_type) => {
    setLoading(prev => ({...prev, [rate_type]: true}))

    try {
      await singleReviewPatch(id, {rate_type})
      await localStorageHandler(id)

      if (rate_type === LIKE) {
        setLike(like + 1)
      } else if (rate_type === DISLIKE) {
        setDislike(dislike + 1)
      }
      setDisabled(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(prev => ({...prev, [rate_type]: false}))
    }
  }

  React.useEffect(() => {
    const reviewActionIds =
      JSON.parse(localStorage.getItem(REVIEW_ACTION_IDS)) || []
    const hasActed = reviewActionIds.find(
      id => id.toString() === props.id.toString(),
    )
    if (hasActed) {
      setDisabled(true)
    }
  }, [like, dislike])

  return (
    <Box mb={6}>
      <Typography variant={'h4'}>{props.customer_name}</Typography>

      <Box mt={2}>
        <Rating
          defaultValue={props.score}
          emptyIcon={<StarIcon color={'grey'} fontSize="inherit" />}
          readOnly
          sx={{
            '& .MuiRating-icon': {
              color: theme.palette.golden.main,
            },
          }}
        />
      </Box>

      <Stack alignItems={'center'} direction={'row'} gap={3}>
        <Typography variant={'h6'}>{props.title}</Typography>
        <Typography color={'primary'} variant={'subtitle1'}>
          {/*TO DO::: After implementing Verified purchase in back should be used*/}
          {/* {props.approved ? 'Verified purchase' : ''} */}
        </Typography>
      </Stack>
      <Box mt={2}>
        <Typography variant={'body1'}>{props.comment}</Typography>
      </Box>

      <Box mt={2}>
        <Typography color={'secondary'} variant={'body1'}>
          {props.location ? `Reviewed in ${props.location} on` : null}{' '}
          {dateFormat(props.date_created)}
        </Typography>
      </Box>

      <Stack
        alignItems={'center'}
        direction={'row'}
        justifyContent={'flex-end'}
      >
        <Typography color={'primary'} variant={'body2'}>
          {disabled
            ? "You've already shared your feedback on this review."
            : 'Did you find it useful?'}
        </Typography>
        <Stack alignItems={'center'} direction={'row'} ml={6}>
          {loading.like ? (
            <BouncyLoading sx={{mt: '-36px', ml: 7}} />
          ) : (
            <>
              <IconButton
                color="primary"
                disabled={disabled}
                onClick={() => reviewRateHandler(props.id, LIKE)}
              >
                <ThumbUpIcon />
              </IconButton>
              <Typography color={'primary'} variant={'h5'}>
                {like}
              </Typography>
            </>
          )}
        </Stack>
        <Stack alignItems={'center'} direction={'row'} ml={6}>
          {loading.dislike ? (
            <BouncyLoading sx={{mt: '-36px', ml: 7}} />
          ) : (
            <>
              <IconButton
                color="primary"
                disabled={disabled}
                onClick={() => reviewRateHandler(props.id, DISLIKE)}
              >
                <ThumbDownIcon />
              </IconButton>
              <Typography color={'primary'} variant={'h5'}>
                {dislike}
              </Typography>
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  )
}

export default ReviewDetail
