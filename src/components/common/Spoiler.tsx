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
    // Don't toggle if clicking on an interactive element (button, icon button, etc.)
    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('[role="button"]') ||
      target.closest('a') ||
      target.closest('input') ||
      target.closest('select')
    ) {
      return;
    }
    e.stopPropagation();
    toggleSpoiler(game, itemName);
  };

  if (isRevealed) {
    return (
      <Box
        onClick={handleClick}
        sx={{
          position: 'relative',
          flex: 1,
          minWidth: 0,
          '&:hover > .spoiler-hide-hint': {
            opacity: 1,
          },
        }}
      >
        {children}
        <Box
          className="spoiler-hide-hint"
          sx={{
            position: 'absolute',
            bottom: 4,
            right: 4,
            bgcolor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            fontSize: '0.65rem',
            px: 0.75,
            py: 0.25,
            borderRadius: 0.5,
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.2s',
            zIndex: 10,
          }}
        >
          Click to hide
        </Box>
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
