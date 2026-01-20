import { type Clear } from '@stores';

export const countClearsByType = (
  clears: Clear[]
): { tartarus: number; olympus: number } | null => {
  const tartarus = clears.filter((c) => c.clearType === 'Tartarus').length;
  const olympus = clears.filter((c) => c.clearType === 'Olympus').length;
  return { tartarus, olympus };
};

export const groupClearsByAspect = (
  clears: Clear[],
  isHades2: boolean
): Record<string, Clear[]> => {
  const grouped: Record<string, Clear[]> = {};
  clears.forEach((clear) => {
    if (!grouped[clear.aspect]) {
      grouped[clear.aspect] = [];
    }
    grouped[clear.aspect].push(clear);
  });

  Object.keys(grouped).forEach((aspect) => {
    grouped[aspect].sort((a, b) => {
      // Primary sort: fear level (ascending)
      const fearDiff = a.fearLevel - b.fearLevel;
      if (fearDiff !== 0) {
        return fearDiff;
      }
      // Secondary sort: clearType (Tartarus before Olympus) - only for Hades 2
      if (isHades2 && a.clearType !== b.clearType) {
        if (a.clearType === 'Tartarus') return -1;
        if (b.clearType === 'Tartarus') return 1;
        return 0;
      }
      return 0;
    });
  });

  return grouped;
};
