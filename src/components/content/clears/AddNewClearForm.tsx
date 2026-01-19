import { useState, useMemo, useCallback } from 'react';
import { Autocomplete, Button, Stack, TextField } from '@mui/material';

import { useClearsStore } from '@stores';
import { getWeapons } from '@data/getters';

type WeaponAspectOption = {
  weapon: string;
  aspect: string;
};

type Props = {
  selectedGame: Game;
};

export const AddNewClearForm = ({ selectedGame }: Props) => {
  const weapons = getWeapons(selectedGame);
  const { addClear } = useClearsStore();

  // Create combined weapon/aspect options grouped by weapon
  const weaponAspectOptions = useMemo(() => {
    const options: WeaponAspectOption[] = [];
    weapons.forEach((weapon) => {
      weapon.aspects.forEach((aspect) => {
        options.push({ weapon: weapon.name, aspect });
      });
    });
    return options;
  }, [weapons]);

  const [weaponAspect, setWeaponAspect] = useState<WeaponAspectOption | null>(
    null
  );
  const [clearType, setClearType] = useState<'Tartarus' | 'Olympus'>(
    'Tartarus'
  );
  const [fearLevel, setFearLevel] = useState<number>(0);

  const clearForm = useCallback(() => {
    setWeaponAspect(null);
    setClearType('Tartarus');
    setFearLevel(0);
  }, []);

  const handleAdd = () => {
    if (!weaponAspect) {
      return;
    }

    addClear({
      game: selectedGame,
      weapon: weaponAspect.weapon,
      aspect: weaponAspect.aspect,
      clearType: selectedGame === 'hades2' ? clearType : undefined,
      fearLevel,
    });

    clearForm();
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      flexWrap="wrap"
      useFlexGap
    >
      <Autocomplete
        value={weaponAspect}
        onChange={(_, newValue) => setWeaponAspect(newValue)}
        options={weaponAspectOptions}
        groupBy={(option) => option.weapon}
        getOptionLabel={(option) => option.aspect}
        isOptionEqualToValue={(option, value) =>
          option.weapon === value?.weapon && option.aspect === value?.aspect
        }
        sx={{ minWidth: 200, flex: 1 }}
        renderInput={(params) => (
          <TextField {...params} label="Weapon - Aspect" size="medium" />
        )}
      />
      {selectedGame === 'hades2' && (
        <Autocomplete<'Tartarus' | 'Olympus', false, false, false>
          value={clearType}
          onChange={(_, newValue) => {
            if (newValue) {
              setClearType(newValue);
            }
          }}
          options={['Tartarus', 'Olympus']}
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
        value={fearLevel}
        onChange={(e) => setFearLevel(Number(e.target.value) || 0)}
        size="medium"
        sx={{ maxWidth: 120, flex: '0 0 auto' }}
      />
      <Button
        sx={{ flex: '0 0 auto' }}
        onClick={handleAdd}
        disabled={!weaponAspect}
      >
        Add
      </Button>
    </Stack>
  );
};
