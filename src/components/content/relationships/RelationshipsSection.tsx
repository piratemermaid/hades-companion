import { useMemo, useEffect } from 'react';
import { Stack, Typography, Grid, ToggleButton, Divider } from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';

import { CharacterCard } from '@components/content/relationships';
import { useRelationshipsStore } from '@stores';
import { getCharacters } from '@data';
import { getCategoryName, getCategoryOrder } from '@utils';

type Props = {
  selectedGame: Game;
};

type GroupedCharacters = {
  category: string;
  categoryName: string;
  order: number;
  characters: Character[];
};

export const RelationshipsSection = ({ selectedGame }: Props) => {
  const characters = getCharacters(selectedGame);
  const showFavoritesOnly = useRelationshipsStore(
    (state) => state.showFavoritesOnly
  );
  const setShowFavoritesOnly = useRelationshipsStore(
    (state) => state.setShowFavoritesOnly
  );
  const favorites = useRelationshipsStore((state) => state.favorites);
  const getTotalHearts = useRelationshipsStore((state) => state.getTotalHearts);
  const getMaxTotalHearts = useRelationshipsStore(
    (state) => state.getMaxTotalHearts
  );
  const setMaxHearts = useRelationshipsStore((state) => state.setMaxHearts);
  const maxHearts = useRelationshipsStore((state) => state.maxHearts);

  // Initialize max hearts in store
  useEffect(() => {
    characters.forEach((char) => {
      if (char.maxHearts) {
        const key = `${selectedGame}:${char.name}`;
        if (!maxHearts[key]) {
          setMaxHearts(selectedGame, char.name, char.maxHearts);
        }
      }
    });
  }, [characters, selectedGame, maxHearts, setMaxHearts]);

  // Filter characters - only show those with maxHearts defined
  const filteredCharacters = useMemo(() => {
    let filtered = characters.filter((char) => char.maxHearts !== undefined);

    if (showFavoritesOnly) {
      filtered = filtered.filter((char) => {
        const key = `${selectedGame}:${char.name}`;
        return favorites.includes(key);
      });
    }

    return filtered;
  }, [characters, showFavoritesOnly, favorites, selectedGame]);

  // Group and sort characters by category
  const groupedCharacters = useMemo(() => {
    // Group by type
    const grouped = filteredCharacters.reduce(
      (acc, character) => {
        const category = character.type;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(character);
        return acc;
      },
      {} as Record<string, Character[]>
    );

    // Sort characters alphabetically within each category and create grouped structure
    const groupedArray: GroupedCharacters[] = Object.entries(grouped)
      .map(([category, chars]) => ({
        category,
        categoryName: getCategoryName(category, selectedGame),
        order: getCategoryOrder(category, selectedGame),
        characters: chars.sort((a, b) => a.name.localeCompare(b.name)),
      }))
      .sort((a, b) => a.order - b.order);

    return groupedArray;
  }, [filteredCharacters, selectedGame]);

  const totalHearts = getTotalHearts(selectedGame);
  const maxTotalHearts = getMaxTotalHearts(selectedGame);

  return (
    <Stack spacing={2}>
      {/* Header */}
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Stack spacing={0.5}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Relationships
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {totalHearts} / {maxTotalHearts} hearts collected
          </Typography>
        </Stack>
        <ToggleButton
          value="favorites"
          selected={showFavoritesOnly}
          onChange={() => setShowFavoritesOnly(!showFavoritesOnly)}
          size="small"
          sx={{
            px: 2,
            py: 1,
            textTransform: 'none',
            border: '1px solid',
            borderColor: 'divider',
            '&.Mui-selected': {
              bgcolor: 'action.selected',
            },
          }}
        >
          <StarIcon sx={{ fontSize: '16px', mr: 0.5 }} />
          Favorites Only
        </ToggleButton>
      </Stack>

      {/* Character groups */}
      {groupedCharacters.length > 0 ? (
        <Stack spacing={3}>
          {groupedCharacters.map((group) => (
            <Stack key={group.category} spacing={1.5}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, textTransform: 'uppercase' }}
                >
                  {group.categoryName}
                </Typography>
                <Divider sx={{ flex: 1 }} />
                <Typography variant="caption" color="text.secondary">
                  {group.characters.length}
                </Typography>
              </Stack>
              <Grid container spacing={2}>
                {group.characters.map((character) => (
                  <Grid
                    size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                    key={character.name}
                  >
                    <CharacterCard
                      game={selectedGame}
                      character={character}
                      maxHearts={character.maxHearts || 0}
                    />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          ))}
        </Stack>
      ) : (
        <Typography variant="body2" color="text.secondary" align="center">
          {showFavoritesOnly
            ? 'No favorite characters yet'
            : 'No characters available'}
        </Typography>
      )}
    </Stack>
  );
};
