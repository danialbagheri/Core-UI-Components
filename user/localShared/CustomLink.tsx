import {Box, SxProps, useTheme} from '@mui/material'
import Link from 'next/link'

/**
 * Props for the CustomLink component.
 */
interface PropsTypes {
  /** The URL the link points to. */
  href: string
  /** Additional styles for the component. */
  sx?: SxProps
  /** The content of the link. */
  children: React.ReactNode
}

/**
 * A Next.js link component with custom styling.
 *
 * @param {PropsTypes} props - The properties for the component.
 * @returns {React.ReactElement} - A Next.js link component.
 */

export function CustomLink(props: PropsTypes) {
  const {href, children, sx} = props
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'inline-block',
        fontSize: 14,
        fontWeight: 700,
        color: theme.palette.primary.main,
        ...sx,
      }}
    >
      <Link href={href} style={{textDecoration: 'none'}}>
        {children}
      </Link>
    </Box>
  )
}
