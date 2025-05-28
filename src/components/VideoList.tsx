import React from "react";
import { FixedSizeGrid as GridVirtualizer } from "react-window";
import {
  Box,
  CircularProgress,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Video } from "../types";
import VideoCard from "./VideoCard";

type VideoListProps = {
  videos: Video[];
  loading: boolean;
  error: Error | null;
};

const VideoList: React.FC<VideoListProps> = ({ videos, loading, error }) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const columnCount = isSm ? 1 : isMd ? 2 : 3;
  const gutter = 16;
  const cardWidth = isSm ? 360 : isMd ? 300 : 280;
  const columnWidth = cardWidth + gutter;
  const rowHeight = 230 + gutter;
  const rowCount = Math.ceil(videos.length / columnCount);

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

  const Cell = ({
    columnIndex,
    rowIndex,
    style,
  }: {
    columnIndex: number;
    rowIndex: number;
    style: React.CSSProperties;
  }) => {
    const index = rowIndex * columnCount + columnIndex;
    if (index >= videos.length) return null;

    return (
      <Box
        style={{
          ...style,
          left: Number(style.left) + gutter / 2,
          top: Number(style.top) + gutter / 2,
          boxSizing: "border-box",
          padding: `${gutter / 2}px`,
        }}
      >
        <VideoCard video={videos[index]} />
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <GridVirtualizer
        style={{
          overflowY: "scroll",
          scrollbarWidth: "none",
          overflowX: "hidden",
        }}
        columnCount={columnCount}
        columnWidth={columnWidth}
        height={700}
        rowCount={rowCount}
        rowHeight={rowHeight}
        width={columnCount * columnWidth}
      >
        {Cell}
      </GridVirtualizer>
    </Box>
  );
};

export default VideoList;
