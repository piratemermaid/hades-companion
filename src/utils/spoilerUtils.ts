/// <reference types="../types" />

/**
 * Determines if a keepsake is a spoiler (game end content)
 * @param game - The game ('hades' or 'hades2')
 * @param keepsakeName - The name of the keepsake
 * @returns true if the keepsake is a spoiler
 */
export const isSpoilerKeepsake = (game: Game, keepsakeName: string): boolean => {
  if (game === 'hades') {
    // Persephone and Hades keepsakes are spoilers
    return keepsakeName === 'Pom Blossom' || keepsakeName === 'Sigil of the Dead';
  } else if (game === 'hades2') {
    // Hades & Persephone, Zagreus, and Chronos keepsakes are spoilers
    return (
      keepsakeName === 'Jeweled Pom' ||
      keepsakeName === 'Calling Card' ||
      keepsakeName === 'Time Piece'
    );
  }
  return false;
};
