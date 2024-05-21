import Image from 'next/image'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function Benefits(props) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat( auto-fit, minmax(100px, 1fr))',
        rowGap: '30px',
        columnGap: '20px',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        p: 2,
        pt: '30px',
      }}
    >
      {props.tags.map((tag, i) => (
        <Box
          className="centralize"
          key={i}
          sx={{
            flexDirection: 'column',
            maxWidth: 100,
          }}
        >
          {tag.svg_icon || tag.icon ? (
            <Image
              alt={tag.name}
              height={40}
              loading="lazy"
              src={tag.svg_icon || tag.icon || ''}
              width={40}
            />
          ) : null}
          <Typography
            sx={{width: '100%', wordWrap: 'break-word'}}
            textAlign="center"
          >
            {tag.name}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}
