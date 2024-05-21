import {Breadcrumbs, Typography} from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Link from 'next/link'

export function DashboardBreadCrumbs(props) {
  const renderBreadCrumbs = props => {
    const {breadcrumbs = []} = props
    return breadcrumbs.map((breadcrumb, index) => {
      const {label, href, onClick = () => {}} = breadcrumb
      const isLast = index === breadcrumbs.length - 1
      return isLast ? (
        <Typography color="primary" fontSize={14} fontWeight={500} key={label}>
          {label}
        </Typography>
      ) : (
        <Link
          href={href}
          key={label}
          onClick={onClick}
          style={{textDecoration: 'none'}}
        >
          <Typography color="primary" fontSize={14} fontWeight={500}>
            {label}
          </Typography>
        </Link>
      )
    })
  }

  const breadcrumbs = renderBreadCrumbs(props)
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextIcon color="primary" fontSize="small" />}
    >
      {breadcrumbs}
    </Breadcrumbs>
  )
}
