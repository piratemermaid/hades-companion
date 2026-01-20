import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from '@mui/material';

import { ProphecyItem } from '@components/content/prophecies';
import { getProphecies } from '@data';

type Props = {
  selectedGame: Game;
};

export const PropheciesSection = ({ selectedGame }: Props) => {
  const prophecies = getProphecies(selectedGame);

  return (
    <Stack spacing={2}>
      {prophecies.map((prophecy) => (
        <Accordion key={prophecy.name}>
          <AccordionSummary>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body1" fontWeight={700}>
                {prophecy.name}
              </Typography>
              {prophecy.items && (
                <Typography variant="body2" color="text.secondary">
                  {' '}
                  {prophecy.items.length} / {prophecy.items.length} completed
                </Typography>
              )}
            </Stack>
          </AccordionSummary>
          {prophecy.items && (
            <AccordionDetails>
              <Stack spacing={1}>
                {prophecy.items.map((item) => (
                  <ProphecyItem key={item} item={item} />
                ))}
              </Stack>
            </AccordionDetails>
          )}
        </Accordion>
      ))}
    </Stack>
  );
};
