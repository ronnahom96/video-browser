import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
        }
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={video.image_url}
        alt={`${video.artist} - ${video.title}`}
        sx={{ 
          objectFit: 'cover',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <CardContent sx={{ flexGrow: 1, padding: 2 }}>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div" 
          sx={{ 
            fontWeight: 600, 
            fontSize: '1rem',
            lineHeight: 1.2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            height: '2.4rem'
          }}
        >
          {video.title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            {video.artist}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {video.release_year}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VideoCard;