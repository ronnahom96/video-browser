import React from "react";
import { Grid, Box, Typography, CircularProgress } from "@mui/material";
import VideoCard from "./VideoCard";
import { Video } from "../types";

interface VideoListProps {
  videos: Video[];
  loading: boolean;
  error: Error | null;
}

const VideoList: React.FC<VideoListProps> = ({ videos, loading, error }) => {
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress color='primary' />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          textAlign: "center",
          my: 4,
          p: 3,
          bgcolor: "#FFF4F5",
          borderRadius: 2,
        }}
      >
        <Typography variant='h6' color='error' gutterBottom>
          Error Loading Videos
        </Typography>
        <Typography color='error.light'>{error.message}</Typography>
      </Box>
    );
  }

  if (videos.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          my: 8,
          p: 4,
          bgcolor: "#F9FAFB",
          borderRadius: 2,
          border: "1px dashed #CBD5E1",
        }}
      >
        <Typography variant='h5' color='text.secondary' gutterBottom>
          No videos were found
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Try adjusting your search filters to find more results.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {videos.map((video) => (
        <Grid item xs={12} sm={6} md={4} key={video.id}>
          <VideoCard video={video} />
        </Grid>
      ))}
    </Grid>
  );
};

export default VideoList;
