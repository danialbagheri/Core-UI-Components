import Typography from '@mui/material/Typography'
import {Box, Button, Link} from '@mui/material'
import Image from 'next/image'

export default function BlogCard(props) {
  const {blog} = props
  const blogUrl = '/advice/' + blog.slug + '/'
  return (
    <Box sx={{mr: {xs: 0, sm: 4}, borderRadius: '20px', width: '100%'}}>
      <Box>
        <Box
          sx={{
            width: '100%',
            height: 190,
            position: 'relative',
          }}
        >
          <Image
            alt={blog.image_alt_text}
            fill
            sizes="(max-width: 600px) 90vw, (max-width: 960px) 50vw, 33vw"
            src={blog.image}
            style={{objectFit: 'cover', borderRadius: '10px'}}
          />
        </Box>
        <Box sx={{minHeight: '70px', mt: 5}}>
          <Link color="inherit" href={blogUrl} underline="none">
            <Typography gutterBottom variant="h5">
              {blog.title}
            </Typography>
          </Link>
        </Box>
      </Box>
      <Box>
        <Link color="inherit" href={blogUrl} underline="none">
          <Button color="primary" size="medium">
            Read More
          </Button>
        </Link>
      </Box>
    </Box>
  )
}
