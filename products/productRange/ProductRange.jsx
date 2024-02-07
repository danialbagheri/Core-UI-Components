import * as React from 'react'

/* ---------------------------- NextJs Components --------------------------- */
import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from 'next/router'
/* -------------------------------------------------------------------------- */

/* ------------------------- Video player Component ------------------------- */
import ReactPlayer from 'react-player/lazy'
/* -------------------------------------------------------------------------- */

/* ----------------------------- MUI Components ----------------------------- */
import {Box, CircularProgress, Typography} from '@mui/material'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {ProductItem} from '../ProductItem'
/* -------------------------------------------------------------------------- */

const COLUMN_MAX_WIDTH = 240
const COLUMN_GAP = 12

export default function ProductRange(props) {
  const {products, banner} = props

  const [bannerSpecs, setBannerSpecs] = React.useState({
    columnsCount: 2,
    gridRow: 4,
    bannerHeight: 212,
    bannerSrc: banner.mobile,
  })
  const [initialized, setInitialized] = React.useState(false)
  const productsContainer = React.useRef(null)
  const router = useRouter()

  const category = router.query.category

  //This is to calculate the count of product columns in order to set the banner's width.
  const gridContainerSpecsHandler = (container, window) => {
    if (window && container.current) {
      const gridStyles = window?.getComputedStyle(container.current)
      const gridWidth = container.current?.clientWidth ?? 1000
      const gridHeight = container.current?.clientHeight ?? 1000

      // Calculate height and width of each element
      const gridRowHeight =
        parseInt(gridStyles.getPropertyValue('grid-auto-rows'), 10) ||
        parseInt(gridStyles.getPropertyValue('grid-template-rows'), 10)
      const gridColumnWidth =
        parseInt(gridStyles.getPropertyValue('grid-auto-columns'), 10) ||
        parseInt(gridStyles.getPropertyValue('grid-template-columns'), 10)

      //Get row gaps
      const gridRowGap = parseInt(gridStyles.getPropertyValue('row-gap'), 10)
      const gridColumnGap = parseInt(
        gridStyles.getPropertyValue('column-gap'),
        10,
      )

      const columnWidth = gridColumnWidth + gridColumnGap
      const rowHeight = gridRowHeight + gridRowGap

      const rowsCount = Math.floor(gridHeight / rowHeight)

      const gridRow = rowsCount < 3 ? rowsCount + 1 : 4

      const columnsCount =
        gridWidth / columnWidth > 2 ? Math.floor(gridWidth / columnWidth) : 2

      const bannerHeight = columnsCount > 2 ? 113 : 212

      //Set proper source of banner based on the columns counts
      let bannerSrc = banner.mobile
      if (columnsCount > 3) {
        bannerSrc = banner.lg
      } else if (columnsCount === 3) {
        bannerSrc = banner.md
      }

      setBannerSpecs({columnsCount, bannerHeight, bannerSrc, gridRow})
    }
  }

  /**
   *
   * @param {any} window
   * As nextJs works SSR, it is used inside useEffect function so after
   * initializing window object, the video will be rendered
   */
  const initializeWindowsHandler = window => {
    if (typeof window !== 'undefined') {
      setInitialized(true)
    }
  }

  React.useEffect(() => {
    window.addEventListener('resize', () =>
      gridContainerSpecsHandler(productsContainer, window),
    )
    gridContainerSpecsHandler(productsContainer, window)

    initializeWindowsHandler(window)
  }, [])

  return (
    <Box
      ref={productsContainer}
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: `repeat(2, minmax(160px, ${COLUMN_MAX_WIDTH}px))`,
          md: `repeat(auto-fit, minmax(180px, ${COLUMN_MAX_WIDTH}px))`,
        },
        gridTemplateRows: 'auto',
        rowGap: 12,
        columnGap: `${COLUMN_GAP}px`,
        justifyContent: 'center',
        pt: 4,
        pb: 40,
      }}
    >
      {/* --------------------------- Product page video --------------------------- */}
      {initialized ? (
        <Box
          sx={{
            width: '100%',
            height: 'auto',
            maxHeight: '365px',
            overflow: 'hidden',
            position: 'relative',
            gridColumn: `1 / span ${bannerSpecs.columnsCount}`,
            gridRow: '1',
            borderRadius: '10px',
            '& video': {
              borderRadius: '10px',
            },
          }}
        >
          <Typography
            sx={{
              position: 'absolute',
              left: '56px',
              top: '56px',
              fontSize: 35,
              fontWeight: 700,
              color: '#FFF',
            }}
          >
            {category}
          </Typography>
          <ReactPlayer
            height="auto"
            loop={true}
            muted
            playing={true}
            url="/videos/product-page-header.mp4"
            width="100%"
          />
        </Box>
      ) : (
        <Box height={400} />
      )}

      {/* -------------------------------------------------------------------------- */}
      {products.length < 1 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {products
            .sort(function (a) {
              if (a.collection_names[0] === 'New') {
                return -1
              }
              return 0
            })
            .map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
        </>
      )}
      {/* -------------------------- Product finder Banner ------------------------- */}
      <Box
        sx={{
          position: 'relative',
          height: bannerSpecs.bannerHeight,
          gridColumn: `1 / span ${bannerSpecs.columnsCount}`, // Ensure the image spans across all columns
          gridRow: bannerSpecs.gridRow,
          cursor: 'pointer',
        }}
      >
        <Link href="/product-finder">
          <Image
            alt="Product finder"
            fill
            src={bannerSpecs?.bannerSrc || ''}
            style={{objectFit: 'cover'}}
          />
        </Link>
      </Box>
      {/* -------------------------------------------------------------------------- */}
    </Box>
  )
}
