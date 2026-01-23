type Game = 'hades' | 'hades2';
type Tab = 'clears' | 'prophecies' | 'keepsakes' | 'relationships' | 'items';

type Weapon = {
  name: string;
  aspects: string[];
};

type Prophecy = {
  name: string;
  items?: string[];
};

type Boon = {
  name: string;
  boonsRequired: {
    name: string;
    boons: string[];
  };
};

type Keepsake = {
  name: string;
  from: string;
  description: string;
  bondMessage?: string;
  notes?: string;
  isSpoiler?: boolean;
};

type Character = {
  name: string;
  title: string;
  type: string;
  maxHearts?: number;
  isSpoiler?: boolean;
};