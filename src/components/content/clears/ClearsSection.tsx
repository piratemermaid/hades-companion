import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { FlatCard } from '@components/common';
import { getWeapons } from '@data/getters';
import { useMemo } from 'react';

type Props = {
  selectedGame: Game;
};

export const ClearsSection = ({ selectedGame }: Props) => {
  const weapons = getWeapons(selectedGame);

  const defaultAspect = useMemo(
    () => (selectedGame === 'hades' ? 'Zagreus' : 'Melinoë'),
    [selectedGame]
  );

  return (
    <Stack spacing={2}>
      <FlatCard>
        <Typography variant="h6">Add New Clear</Typography>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          flexWrap="wrap"
          useFlexGap
        >
          <Autocomplete
            options={weapons}
            getOptionLabel={(option: Weapon) => option.name}
            sx={{ minWidth: 160, flex: 1 }}
            renderInput={(params) => (
              <TextField {...params} label="Weapon" size="medium" />
            )}
          />
          <Autocomplete
            key={`aspect-${selectedGame}`}
            defaultValue={defaultAspect}
            options={weapons.flatMap((weapon) => weapon.aspects)}
            getOptionLabel={(option: string) => option}
            sx={{ minWidth: 160, flex: 1 }}
            renderInput={(params) => (
              <TextField {...params} label="Aspect" size="medium" />
            )}
          />
          {selectedGame === 'hades2' && (
            <Autocomplete
              options={['Tartarus', 'Olympus']}
              defaultValue="Tartarus"
              getOptionLabel={(option: string) => option}
              sx={{ minWidth: 160, flex: 1 }}
              renderInput={(params) => (
                <TextField {...params} label="Clear Type" size="medium" />
              )}
            />
          )}
          <TextField
            label="Fear Level"
            type="number"
            defaultValue={0}
            size="medium"
            sx={{ maxWidth: 100, flex: '0 0 auto' }}
          />
          <Button sx={{ flex: '0 0 auto' }}>Add</Button>
        </Stack>
      </FlatCard>
    </Stack>
  );
};
