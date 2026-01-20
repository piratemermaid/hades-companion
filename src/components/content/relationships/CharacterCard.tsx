import { IconButton, Stack, Typography } from '@mui/material';
import {
  Favorite as HeartIcon,
  FavoriteBorder as HeartBorderIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from '@mui/icons-material';

import { useRelationshipsStore } from '@stores';
import { FlatCard } from '@components/common';

type Props = {
  game: Game;
  character: Character;
  maxHearts: number;
};

export const CharacterCard = ({ game, character, maxHearts }: Props) => {
  const key = `${game}:${character.name}`;
  const heartProgress = useRelationshipsStore((state) => state.heartProgress);
  const favorites = useRelationshipsStore((state) => state.favorites);
  const setHeartProgress = useRelationshipsStore(
    (state) => state.setHeartProgress
  );
  const toggleFavorite = useRelationshipsStore((state) => state.toggleFavorite);

  const currentHearts = heartProgress[key] || 0;
  const isFavorite = favorites.includes(key);

  const handleHeartClick = (heartIndex: number) => {
    // If clicking on a filled heart, set to that number
    // If clicking on an empty heart, set to that number + 1
    const newHearts = heartIndex < currentHearts ? heartIndex : heartIndex + 1;
    setHeartProgress(game, character.name, newHearts);
  };

  return (
    <FlatCard>
      <Stack
        spacing={1.5}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header with name and favorite icon */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ flexShrink: 0 }}
        >
          <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 500 }}>
            {character.name}
          </Typography>
          <IconButton
            size="small"
            onClick={() => toggleFavorite(game, character.name)}
            sx={{ p: 0.5, flexShrink: 0 }}
          >
            {isFavorite ? (
              <StarIcon sx={{ fontSize: '20px', color: 'warning.main' }} />
            ) : (
              <StarBorderIcon sx={{ fontSize: '20px' }} />
            )}
          </IconButton>
        </Stack>

        {/* Hearts row */}
        <Stack
          direction="row"
          spacing={0.5}
          flexWrap="wrap"
          sx={{ flexGrow: 1, minHeight: '40px' }}
        >
          {Array.from({ length: maxHearts }).map((_, index) => {
            const isFilled = index < currentHearts;
            return (
              <IconButton
                key={index}
                size="small"
                onClick={() => handleHeartClick(index)}
                sx={{
                  p: 0,
                  width: '20px',
                  height: '20px',
                  flexShrink: 0,
                  '&:hover': { opacity: 0.8 },
                }}
              >
                {isFilled ? (
                  <HeartIcon sx={{ fontSize: '20px', color: 'error.main' }} />
                ) : (
                  <HeartBorderIcon
                    sx={{ fontSize: '20px', color: 'text.secondary' }}
                  />
                )}
              </IconButton>
            );
          })}
        </Stack>

        {/* Progress */}
        <Stack
          direction="row"
          alignItems="center"
          sx={{ flexShrink: 0, mt: 'auto' }}
        >
          <Typography variant="body2" color="text.secondary">
            {currentHearts} / {maxHearts}
          </Typography>
        </Stack>
      </Stack>
    </FlatCard>
  );
};
