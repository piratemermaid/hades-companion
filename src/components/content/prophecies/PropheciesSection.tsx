import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
} from '@mui/material';

import {
  ProphecyAccordionTitle,
  ProphecyItem,
} from '@components/content/prophecies';
import { usePropheciesStore } from '@stores';
import { getProphecies } from '@data';

type Props = {
  selectedGame: Game;
};

export const PropheciesSection = ({ selectedGame }: Props) => {
  const prophecies = getProphecies(selectedGame);
  const completedProphecies = usePropheciesStore(
    (state) => state.completedProphecies
  );

  const propheciesOrdered = prophecies.sort((a, b) => {
    const aCompleted = completedProphecies.includes(
      `${selectedGame}:${a.name}`
    );
    const bCompleted = completedProphecies.includes(
      `${selectedGame}:${b.name}`
    );
    return aCompleted ? 1 : bCompleted ? -1 : 0;
  });

  return (
    <Stack spacing={0.5}>
      {propheciesOrdered.map((prophecy) => {
        return (
          <Accordion
            key={prophecy.name}
            sx={{ '&:before': { display: 'none' } }}
          >
            <AccordionSummary>
              <ProphecyAccordionTitle
                prophecyName={prophecy.name}
                game={selectedGame}
                items={prophecy.items}
              />
            </AccordionSummary>
            {prophecy.items && (
              <AccordionDetails sx={{ pt: 0.5, pb: 0.5, px: 1 }}>
                <Stack spacing={1}>
                  {prophecy.items.map((item) => (
                    <ProphecyItem
                      key={item}
                      game={selectedGame}
                      prophecyName={prophecy.name}
                      item={item}
                      allItems={prophecy.items}
                    />
                  ))}
                </Stack>
              </AccordionDetails>
            )}
          </Accordion>
        );
      })}
    </Stack>
  );
};
