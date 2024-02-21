import * as React from 'react'

/* ---------------------------- NextJs Components --------------------------- */
import Image from 'next/image'
/* -------------------------------------------------------------------------- */

/* ----------------------------- MUI Components ----------------------------- */
import {Box, CircularProgress, Typography} from '@mui/material'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {RemoveIcon} from './RemoveIcon'
import {AppContext} from 'components/appProvider'
import {CustomButton} from 'components/user/localShared'
import {EmptyState} from './EmptyState'
/* -------------------------------------------------------------------------- */

export function MobileFavList(props) {
  const {loading} = props
  const [appState] = React.useContext(AppContext)

  return (
    <Box sx={{display: {xs: 'block', md: 'none'}}}>
      <Box
        sx={{
          width: '288px',
          height: '1px',
          margin: '0 auto',
          bgcolor: '#E4E4E4',
        }}
      />
      {loading ? (
        <Box className="centralize" mt="35px">
          <CircularProgress sx={{display: {xs: 'block', md: 'none'}}} />
        </Box>
      ) : (
        <>
          {appState?.favoriteProducts?.length ? (
            appState?.favoriteProducts.map(product => (
              <>
                <Box
                  className="centralize"
                  key={product.id}
                  sx={{py: '24px', width: 317, gap: 5}}
                >
                  <Box sx={{width: 79, height: 92, position: 'relative'}}>
                    <Image
                      alt={product.name}
                      fill
                      sizes="10vw"
                      src={product.main_image_webp}
                      style={{objectFit: 'cover'}}
                    />
                  </Box>
                  <Box
                    sx={{
                      flexGrow: '1',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      flexDirection: 'column',
                      height: 92,
                    }}
                  >
                    <Typography sx={{fontSize: 14, fontWeight: 500}}>
                      {product.name}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <CustomButton
                        sx={{height: 30, width: 152, fontSize: 14}}
                        variant="contained"
                      >
                        Add to cart
                      </CustomButton>
                      <RemoveIcon />
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: '288px',
                    height: '1px',
                    margin: '0 auto',
                    bgcolor: '#E4E4E4',
                  }}
                />
              </>
            ))
          ) : (
            <EmptyState sx={{mt: '35px'}} />
          )}
        </>
      )}
    </Box>
  )
}
