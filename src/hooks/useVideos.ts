import { useState, useEffect, useMemo } from "react";
import { Video, Genre } from "../types";
import { fetchVideos } from "../api/videoApi";
import { useDebounce } from "./useDebounce";

interface UseVideosResult {
  videos: Video[];
  genres: Genre[];
  filteredVideos: Video[];
  searchTerm: string;
  selectedYear: number | null;
  selectedGenres: number[];
  years: number[];
  loading: boolean;
  error: Error | null;
  setSearchTerm: (term: string) => void;
  setSelectedYear: (year: number | null) => void;
  setSelectedGenres: (genres: number[]) => void;
  toggleGenre: (genreId: number) => void;
}

export const useVideos = (): UseVideosResult => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const data = await fetchVideos();
        setVideos(data.videos);
        setGenres(data.genres);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  const years = useMemo(() => {
    const uniqueYears = [...new Set(videos.map((video) => video.release_year))];
    return uniqueYears.sort((a, b) => b - a);
  }, [videos]);

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const videoTitle = String(video.title || "").toLowerCase();
      const videoArtist = String(video.artist || "").toLowerCase();
      const searchTermLower = debouncedSearchTerm.toLowerCase().trim();

      const matchesSearch =
        searchTerm === "" ||
        videoArtist.includes(searchTermLower) ||
        videoTitle.includes(searchTermLower);

      const matchesYear =
        selectedYear === null || video.release_year === selectedYear;

      const matchesGenre =
        selectedGenres.length === 0 || selectedGenres.includes(video.genre_id);

      return matchesSearch && matchesYear && matchesGenre;
    });
  }, [videos, debouncedSearchTerm, searchTerm, selectedYear, selectedGenres]);

  const toggleGenre = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  return {
    videos,
    genres,
    filteredVideos,
    searchTerm,
    selectedYear,
    selectedGenres,
    years,
    loading,
    error,
    setSearchTerm,
    setSelectedYear,
    setSelectedGenres,
    toggleGenre,
  };
};
