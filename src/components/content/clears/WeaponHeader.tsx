import { Stack, Typography } from '@mui/material';

type Props = {
  weaponName: string;
  clearCount: number;
  clearCounts: { tartarus: number; olympus: number } | null;
  isHades2: boolean;
};

export const WeaponHeader = ({
  weaponName,
  clearCount,
  clearCounts,
  isHades2,
}: Props) => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="body1" sx={{ fontWeight: 700 }}>
        {weaponName}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {isHades2 && clearCounts
          ? `${clearCounts.tartarus} Tartarus, ${clearCounts.olympus} Olympus`
          : `${clearCount} ${clearCount === 1 ? 'clear' : 'clears'}`}
      </Typography>
    </Stack>
  );
};
