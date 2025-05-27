import React from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Chip,
  OutlinedInput,
  SelectChangeEvent,
  Theme,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Genre } from '../types';

interface HeaderProps {
  searchTerm: string;
  selectedYear: number | null;
  selectedGenres: number[];
  years: number[];
  genres: Genre[];
  onSearchChange: (value: string) => void;
  onYearChange: (year: number | null) => void;
  onGenresChange: (genres: number[]) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(id: number, selectedIds: number[], theme: Theme) {
  return {
    fontWeight:
      selectedIds.indexOf(id) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  selectedYear,
  selectedGenres,
  years,
  genres,
  onSearchChange,
  onYearChange,
  onGenresChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleYearChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    onYearChange(value === "" ? null : Number(value));
  };

  const handleGenresChange = (e: SelectChangeEvent<number[]>) => {
    const value = e.target.value as number[];
    onGenresChange(value);
  };

  return (
    <Box 
      sx={{ 
        mb: 4, 
        pb: 3, 
        borderBottom: '1px solid', 
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}
    >
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          mb: 2, 
          fontWeight: 700,
          color: 'primary.main',
          textAlign: { xs: 'center', sm: 'left' },
          fontSize: { xs: '1.75rem', sm: '2.125rem' }
        }}
      >
        Video Browser
      </Typography>

      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
        gap: 2
      }}>
        {/* Search Filter */}
        <TextField
          fullWidth
          label="Search videos"
          variant="outlined"
          placeholder="Search by artist or title"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            sx: { borderRadius: 1 }
          }}
        />

        {/* Year Filter */}
        <FormControl fullWidth>
          <InputLabel id="year-select-label">Year</InputLabel>
          <Select
            labelId="year-select-label"
            id="year-select"
            value={selectedYear?.toString() || ""}
            label="Year"
            onChange={handleYearChange}
            sx={{ borderRadius: 1 }}
          >
            <MenuItem value="">
              <em>All Years</em>
            </MenuItem>
            {years.map((year) => (
              <MenuItem key={year} value={year.toString()}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Genre Filter */}
        <FormControl fullWidth>
          <InputLabel id="genre-select-label">Genres</InputLabel>
          <Select
            labelId="genre-select-label"
            id="genre-select"
            multiple
            value={selectedGenres}
            onChange={handleGenresChange}
            input={<OutlinedInput id="select-multiple-genres\" label="Genres" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((genreId) => (
                  <Chip 
                    key={genreId} 
                    label={genres.find(g => g.id === genreId)?.name || ''} 
                    size="small"
                    sx={{ 
                      bgcolor: 'primary.light', 
                      color: 'primary.contrastText',
                      fontWeight: 500
                    }}
                  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
            sx={{ borderRadius: 1 }}
          >
            {genres.map((genre) => (
              <MenuItem
                key={genre.id}
                value={genre.id}
                style={getStyles(genre.id, selectedGenres, theme)}
              >
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Header;