// glossary.ts
export type GlossaryEntry = {
  slug: string;
  term: string;
  spelling: string; // "price mech·a·nism"
  partOfSpeech: string; // "noun", "concept", "proper noun"
  short: string;
  related?: string[];
};

export const GLOSSARY: Record<string, GlossaryEntry> = {
  'price-mechanism': {
    slug: 'price-mechanism',
    term: 'Price Mechanism',
    spelling: 'price mech·a·nism',
    partOfSpeech: 'noun',
    short:
      'The system by which prices transmit information about scarcity and value, coordinating millions of independent decisions without central direction.',
    related: ['spontaneous-order', 'knowledge-problem'],
  },
};
