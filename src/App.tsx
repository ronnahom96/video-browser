import { Container, Box, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./components/Header";
import VideoList from "./components/VideoList";
import { useVideos } from "./hooks/useVideos";
import theme from "./theme/theme";

function App() {
  const {
    filteredVideos,
    genres,
    years,
    searchTerm,
    selectedYear,
    selectedGenres,
    loading,
    error,
    setSearchTerm,
    setSelectedYear,
    setSelectedGenres,
  } = useVideos();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Box sx={{ py: 4 }}>
          <Header
            searchTerm={searchTerm}
            selectedYear={selectedYear}
            selectedGenres={selectedGenres}
            years={years}
            genres={genres}
            onSearchChange={setSearchTerm}
            onYearChange={setSelectedYear}
            onGenresChange={setSelectedGenres}
          />
          <VideoList videos={filteredVideos} loading={loading} error={error} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
