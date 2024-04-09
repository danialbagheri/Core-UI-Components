import {Box} from '@mui/material'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

export default function BreadCrumb(props) {
  const {breadcrumbs} = props

  const children = breadcrumbs.map((child, index) => {
    return (
      <Link
        color="inherit"
        href={child.url}
        key={index}
        typeof="WebPage"
        underline="hover"
      >
        <span>{child.name}</span>
      </Link>
    )
  })
  return (
    <Box sx={{m: '10px'}}>
      <Breadcrumbs aria-label="breadcrumb" typeof="BreadcrumbList">
        {children}
      </Breadcrumbs>
    </Box>
  )
}
