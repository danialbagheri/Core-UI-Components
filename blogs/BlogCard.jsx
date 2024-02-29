import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import {Box, Button, CardActionArea, CardActions, Link} from '@mui/material'
import Image from 'next/image'

export default function BlogCard(props) {
  const {blog} = props
  const blogUrl = '/advice/' + blog.slug + '/'
  return (
    <Card
      sx={{maxWidth: 345, width: 345, mr: {xs: 0, sm: 4}}}
      variant="outlined"
    >
      <CardActionArea>
        <Box sx={{width: '100%', height: 140, position: 'relative'}}>
          <Image
            alt={blog.image_alt_text}
            fill
            sizes="(max-width: 600px) 90vw, (max-width: 960px) 50vw, 33vw"
            src={blog.image}
            style={{objectFit: 'cover'}}
          />
        </Box>
        <CardContent sx={{minHeight: '100px', textAlign: 'center'}}>
          <Link color="inherit" href={blogUrl} underline="none">
            <Typography component="div" gutterBottom variant="h5">
              {blog.title}
            </Typography>
          </Link>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{justifyContent: 'center'}}>
        <Link color="inherit" href={blogUrl} underline="none">
          <Button color="primary" size="small">
            Read More
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}
