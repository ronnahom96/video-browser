import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Video } from "../types";

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <Card
      sx={{
        "height": "100%",
        "display": "flex",
        "flexDirection": "column",
        "transition": "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardMedia
        component='img'
        image={video.image_url}
        alt={`${video.artist} - ${video.title}`}
      />
      <CardContent
        sx={{
          backgroundColor: "#f9f6e4",
          textAlign: "center",
          padding: "0 !important",
        }}
      >
        <Typography variant='body2'>{video.title}</Typography>
        <Typography variant='body2'>{video.artist}</Typography>
        <Typography variant='body2'>{video.release_year}</Typography>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
