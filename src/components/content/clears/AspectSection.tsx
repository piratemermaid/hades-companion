import { Stack, Typography } from '@mui/material';

import { type Clear } from '@stores';
import { ClearItem } from './ClearItem';

type Props = {
  aspect: string;
  clears: Clear[];
  isHades2: boolean;
  onDelete: (clear: Clear) => void;
};

export const AspectSection = ({
  aspect,
  clears,
  isHades2,
  onDelete,
}: Props) => {
  return (
    <Stack spacing={1}>
      <Typography variant="body2" fontWeight={700} color="text.highlight">
        Aspect of {aspect}
      </Typography>
      <Stack spacing={1}>
        {clears.map((clear, index) => (
          <ClearItem
            key={`${clear.aspect}-${clear.fearLevel}-${index}`}
            clear={clear}
            isHades2={isHades2}
            onDelete={onDelete}
          />
        ))}
      </Stack>
    </Stack>
  );
};
