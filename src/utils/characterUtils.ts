/// <reference types="../types" />

/**
 * Gets a human-readable category name for a character type
 */
export const getCategoryName = (type: string, game: Game): string => {
  if (game === 'hades') {
    const categoryMap: Record<string, string> = {
      chthonic_gods: 'Chthonic Gods',
      olympian_gods: 'Olympian Gods',
      house_of_hades_and_others: 'House of Hades & Others',
      hidden: 'Hidden',
    };
    return categoryMap[type] || type;
  } else {
    // hades2
    const categoryMap: Record<string, string> = {
      protagonist: 'Protagonist',
      the_unseen_and_allies: 'The Unseen & Allies',
      olympians: 'Olympians',
      others: 'Others',
    };
    return categoryMap[type] || type;
  }
};

/**
 * Gets the display order for categories
 */
export const getCategoryOrder = (type: string, game: Game): number => {
  if (game === 'hades') {
    const orderMap: Record<string, number> = {
      chthonic_gods: 1,
      olympian_gods: 2,
      house_of_hades_and_others: 3,
      hidden: 4,
    };
    return orderMap[type] || 999;
  } else {
    // hades2
    const orderMap: Record<string, number> = {
      protagonist: 1,
      the_unseen_and_allies: 2,
      olympians: 3,
      others: 4,
    };
    return orderMap[type] || 999;
  }
};
