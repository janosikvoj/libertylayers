export type GlossaryEntry = {
  slug: string;
  term: string;
  spelling: string;
  partOfSpeech: string;
  desc: string;
  category: "economic" | "ethical" | "political" | "technical";
  related?: string[];
};

export const GLOSSARY: Record<string, GlossaryEntry> = {
  // TODO:
  // positive-rights
  // minarchism
  // anarcho-capitalism
  // polycentric-law

  // ── Economic ──────────────────────────────────────────────────────────────

  praxeology: {
    slug: "praxeology",
    term: "Praxeology",
    spelling: "prax·e·ol·o·gy",
    partOfSpeech: "noun",
    category: "economic",
    desc: "The deductive science of human action, holding that all economic laws can be derived a priori from the axiom that humans act purposefully to achieve chosen ends.",
    related: [
      "subjective-value",
      "time-preference",
      "economic-calculation",
      "spontaneous-order",
    ],
  },

  "subjective-value": {
    slug: "subjective-value",
    term: "Subjective Value",
    spelling: "sub·jec·tive val·ue",
    partOfSpeech: "concept",
    category: "economic",
    desc: "Value is not intrinsic to goods but exists only in the mind of the valuing individual — the same object can be worth everything to one person and nothing to another.",
    related: [
      "praxeology",
      "price-mechanism",
      "opportunity-cost",
      "time-preference",
    ],
  },

  "price-mechanism": {
    slug: "price-mechanism",
    term: "Price Mechanism",
    spelling: "price mech·a·nism",
    partOfSpeech: "noun",
    category: "economic",
    desc: "The system by which prices transmit information about scarcity and value, coordinating millions of independent decisions without central direction.",
    related: [
      "spontaneous-order",
      "knowledge-problem",
      "economic-calculation",
      "subjective-value",
    ],
  },

  "economic-calculation": {
    slug: "economic-calculation",
    term: "Economic Calculation",
    spelling: "ec·o·nom·ic cal·cu·la·tion",
    partOfSpeech: "concept",
    category: "economic",
    desc: "Mises's argument that rational allocation of resources requires genuine market prices — without them, as under socialism, planners cannot know whether they are creating or destroying value.",
    related: [
      "price-mechanism",
      "praxeology",
      "spontaneous-order",
      "knowledge-problem",
    ],
  },

  "knowledge-problem": {
    slug: "knowledge-problem",
    term: "Knowledge Problem",
    spelling: "knowl·edge prob·lem",
    partOfSpeech: "concept",
    category: "economic",
    desc: "Hayek's insight that the information needed to run an economy is dispersed across millions of minds and can never be fully gathered by any central authority.",
    related: [
      "spontaneous-order",
      "price-mechanism",
      "economic-calculation",
      "decentralization",
    ],
  },

  "spontaneous-order": {
    slug: "spontaneous-order",
    term: "Spontaneous Order",
    spelling: "spon·ta·ne·ous or·der",
    partOfSpeech: "concept",
    category: "economic",
    desc: "Complex, functional social patterns — language, law, markets — that emerge from individual actions without any designer or central plan.",
    related: [
      "knowledge-problem",
      "price-mechanism",
      "polycentricity",
      "economic-calculation",
    ],
  },

  "time-preference": {
    slug: "time-preference",
    term: "Time Preference",
    spelling: "time pref·er·ence",
    partOfSpeech: "noun",
    category: "economic",
    desc: "The universal tendency to value present goods more highly than identical future goods — the foundation of interest rates and capital theory.",
    related: ["capital-theory", "praxeology", "subjective-value"],
  },

  "capital-theory": {
    slug: "capital-theory",
    term: "Capital Theory",
    spelling: "cap·i·tal the·o·ry",
    partOfSpeech: "noun",
    category: "economic",
    desc: "The Austrian account of how saved resources are invested into longer production structures, explaining the business cycle when credit artificially suppresses interest rates.",
    related: ["time-preference", "economic-calculation", "praxeology"],
  },

  "opportunity-cost": {
    slug: "opportunity-cost",
    term: "Opportunity Cost",
    spelling: "op·por·tu·ni·ty cost",
    partOfSpeech: "noun",
    category: "economic",
    desc: "The value of the next-best alternative foregone whenever a choice is made — the true cost of any action is always what you give up to take it.",
    related: ["subjective-value", "praxeology"],
  },

  // ── Ethical ───────────────────────────────────────────────────────────────

  "self-ownership": {
    slug: "self-ownership",
    term: "Self-Ownership",
    spelling: "self-own·er·ship",
    partOfSpeech: "concept",
    category: "ethical",
    desc: "Each person has absolute sovereign authority over their own body and mind — the foundational axiom from which libertarian rights theory is derived.",
    related: [
      "non-aggression-principle",
      "homesteading",
      "negative-rights",
      "positive-rights",
      "voluntaryism",
    ],
  },

  "non-aggression-principle": {
    slug: "non-aggression-principle",
    term: "Non-Aggression Principle",
    spelling: "non-ag·gres·sion prin·ci·ple",
    partOfSpeech: "proper noun",
    category: "ethical",
    desc: "The ethical prohibition on initiating force or fraud against any person or their legitimately held property — the central axiom of libertarian ethics.",
    related: [
      "self-ownership",
      "homesteading",
      "voluntaryism",
      "negative-rights",
    ],
  },

  homesteading: {
    slug: "homesteading",
    term: "Homesteading",
    spelling: "home·stead·ing",
    partOfSpeech: "concept",
    category: "ethical",
    desc: "Locke's principle, refined by Rothbard, that mixing one's labor with previously unowned resources creates legitimate property rights over them.",
    related: ["self-ownership", "non-aggression-principle", "voluntaryism"],
  },

  "negative-rights": {
    slug: "negative-rights",
    term: "Negative Rights",
    spelling: "neg·a·tive rights",
    partOfSpeech: "noun",
    category: "ethical",
    desc: "Rights that require only non-interference from others — the right not to be killed, coerced, or stolen from — as distinct from positive rights that impose obligations to provide.",
    related: [
      "self-ownership",
      "non-aggression-principle",
      "voluntaryism",
      "positive-rights",
    ],
  },

  voluntaryism: {
    slug: "voluntaryism",
    term: "Voluntaryism",
    spelling: "vol·un·tar·y·ism",
    partOfSpeech: "noun",
    category: "ethical",
    desc: "The position that all human relationships and institutions should be based exclusively on voluntary consent, with no role for coercion of any kind.",
    related: [
      "non-aggression-principle",
      "self-ownership",
      "negative-rights",
      "polycentricity",
    ],
  },

  "positive-rights": {
    slug: "positive-rights",
    term: "Positive Rights",
    spelling: "pos·i·tive rights",
    partOfSpeech: "noun",
    category: "ethical",
    desc: "Rights that require others to provide something — housing, healthcare, education — necessarily assigning an obligation to a third party that must be enforced by authority.",
    related: ["negative-rights", "self-ownership", "non-aggression-principle"],
  },

  // ── Political ─────────────────────────────────────────────────────────────

  polycentricity: {
    slug: "polycentricity",
    term: "Polycentricity",
    spelling: "pol·y·cen·tric·i·ty",
    partOfSpeech: "noun",
    category: "political",
    desc: "A social order with multiple competing centers of authority rather than a single monopoly state — law, security, and dispute resolution provided by overlapping voluntary institutions.",
    related: [
      "spontaneous-order",
      "voluntaryism",
      "decentralization",
      "public-choice-theory",
      "polycentric-law",
    ],
  },

  "public-choice-theory": {
    slug: "public-choice-theory",
    term: "Public Choice Theory",
    spelling: "pub·lic choice the·o·ry",
    partOfSpeech: "noun",
    category: "political",
    desc: "The economic analysis of political behavior — treating politicians and bureaucrats as self-interested actors, explaining why state intervention systematically fails even with good intentions.",
    related: ["polycentricity", "knowledge-problem", "privatization"],
  },

  privatization: {
    slug: "privatization",
    term: "Privatization",
    spelling: "pri·vat·i·za·tion",
    partOfSpeech: "noun",
    category: "political",
    desc: "The transfer of state-controlled assets, services, or functions to private ownership, on the argument that market competition produces better outcomes than political management.",
    related: ["public-choice-theory", "polycentricity", "spontaneous-order"],
  },

  minarchism: {
    slug: "minarchism",
    term: "Minarchism",
    spelling: "min·ar·chism",
    partOfSpeech: "noun",
    category: "political",
    desc: "The position that a minimal state — limited strictly to protecting negative rights, enforcing contracts, and deterring aggression — is both justified and necessary.",
    related: [
      "negative-rights",
      "non-aggression-principle",
      "anarcho-capitalism",
      "polycentric-law",
    ],
  },

  "anarcho-capitalism": {
    slug: "anarcho-capitalism",
    term: "Anarcho-Capitalism",
    spelling: "an·ar·cho-cap·i·tal·ism",
    partOfSpeech: "noun",
    category: "political",
    desc: "The position that even a minimal state violates the NAP through compulsory taxation, and that protection and dispute resolution should be provided by competing voluntary institutions.",
    related: [
      "non-aggression-principle",
      "minarchism",
      "polycentric-law",
      "voluntaryism",
    ],
  },

  "polycentric-law": {
    slug: "polycentric-law",
    term: "Polycentric Law",
    spelling: "pol·y·cen·tric law",
    partOfSpeech: "noun",
    category: "political",
    desc: "A legal order of multiple competing frameworks that individuals choose between, rather than a single system imposed by territorial monopoly — the institutional implication of consistent negative-rights theory.",
    related: [
      "polycentricity",
      "anarcho-capitalism",
      "minarchism",
      "voluntaryism",
    ],
  },

  // ── Technical ─────────────────────────────────────────────────────────────

  decentralization: {
    slug: "decentralization",
    term: "Decentralization",
    spelling: "de·cen·tral·i·za·tion",
    partOfSpeech: "noun",
    category: "technical",
    desc: "The distribution of control away from a central authority — in technology, a system where no single node can unilaterally alter, censor, or shut down the network.",
    related: [
      "polycentricity",
      "knowledge-problem",
      "blockchain",
      "cryptography",
    ],
  },

  cryptography: {
    slug: "cryptography",
    term: "Cryptography",
    spelling: "cryp·tog·ra·phy",
    partOfSpeech: "noun",
    category: "technical",
    desc: "The mathematics of securing information through encryption — enabling trustless, private transactions between parties without requiring a trusted intermediary.",
    related: ["blockchain", "decentralization"],
  },

  blockchain: {
    slug: "blockchain",
    term: "Blockchain",
    spelling: "block·chain",
    partOfSpeech: "noun",
    category: "technical",
    desc: "A distributed ledger maintained by cryptographic consensus across a peer-to-peer network — making it practically impossible to alter records without controlling the majority of the network.",
    related: ["cryptography", "decentralization", "voluntaryism"],
  },
};
