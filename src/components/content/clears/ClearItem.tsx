import { IconButton, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { ClearTypeBadge } from '@components/content/clears';
import { type Clear } from '@stores';

type Props = {
  clear: Clear;
  isHades2: boolean;
  onDelete: (clear: Clear) => void;
};

export const ClearItem = ({ clear, isHades2, onDelete }: Props) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ bgcolor: 'card.background', borderRadius: 0.5, p: 1 }}
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        {isHades2 && clear.clearType && (
          <ClearTypeBadge clearType={clear.clearType} />
        )}

        <Typography variant="body1" color="text.secondary">
          {clear.fearLevel} {clear.fearLevel === 1 ? 'Fear' : 'Fear'}
        </Typography>
      </Stack>

      <IconButton
        size="small"
        onClick={() => onDelete(clear)}
        sx={{ color: 'text.secondary' }}
      >
        <DeleteIcon sx={{ fontSize: '16px' }} />
      </IconButton>
    </Stack>
  );
};
