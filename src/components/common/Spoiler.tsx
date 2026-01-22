/// <reference types="../../types" />
import { Box, Typography } from '@mui/material';
import { useSpoilerStore } from '@stores';

type Props = {
  game: Game;
  itemName: string;
  children: React.ReactNode;
  spoilerMessage?: string;
};

export const Spoiler = ({
  game,
  itemName,
  children,
  spoilerMessage = 'Game end spoilers',
}: Props) => {
  const isRevealed = useSpoilerStore((state) =>
    state.isSpoilerRevealed(game, itemName)
  );
  const toggleSpoiler = useSpoilerStore((state) => state.toggleSpoiler);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSpoiler(game, itemName);
  };

  if (isRevealed) {
    return (
      <Box
        onClick={handleClick}
        sx={{
          cursor: 'pointer',
          position: 'relative',
          flex: 1,
          minWidth: 0,
          '&:hover::after': {
            content: '"Click to hide"',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '0.75rem',
            borderRadius: 1,
            zIndex: 1,
          },
        }}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      onClick={handleClick}
      sx={{
        cursor: 'pointer',
        position: 'relative',
        userSelect: 'none',
        bgcolor: 'rgba(0, 0, 0, 0.9)',
        borderRadius: 1,
        minHeight: '2rem',
        flex: 1,
        minWidth: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          bgcolor: 'rgba(0, 0, 0, 0.85)',
        },
      }}
    >
      <Typography
        variant="caption"
        sx={{
          color: 'text.secondary',
          fontSize: '0.75rem',
          px: 1,
          textAlign: 'center',
        }}
      >
        {spoilerMessage} (click to reveal)
      </Typography>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          filter: 'blur(8px)',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
