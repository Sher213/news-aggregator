import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { Link } from "@mui/material";

interface NewsCardProps {
    id: number;
    title: string;
    link: string;
    urlToImage: string;
    description: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ id, title, link, urlToImage, description }) => {
    return (
        <Link href={link} target="_blank">
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="140"
                    image={urlToImage}
                    alt={title}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {description} {link}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" href={link} target="_blank">
                    Go to Story
                    </Button>
                </CardActions>
            </Card>
        </Link>
    );
}

export default NewsCard;