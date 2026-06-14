export interface Book {
  title: string;
  author: string;
  year: string;
  pages: number;
  category: "anarchist" | "economics" | "philosophy" | "political";
  href: string;
}

export const BOOKS: Book[] = [
  {
    title: "The Machinery of Freedom",
    author: "David Friedman",
    year: "1973",
    pages: 227,
    category: "anarchist",
    href: "https://en.wikipedia.org/wiki/The_Machinery_of_Freedom",
  },
  {
    title: "For a New Liberty",
    author: "Murray Rothbard",
    year: "1973",
    pages: 338,
    category: "anarchist",
    href: "https://en.wikipedia.org/wiki/For_a_New_Liberty",
  },
  {
    title: "The Road to Serfdom",
    author: "Friedrich Hayek",
    year: "1944",
    pages: 274,
    category: "political",
    href: "https://en.wikipedia.org/wiki/The_Road_to_Serfdom",
  },
  {
    title: "No Treason",
    author: "Lysander Spooner",
    year: "1867",
    pages: 56,
    category: "philosophy",
    href: "https://en.wikipedia.org/wiki/No_Treason",
  },
  {
    title: "Human Action",
    author: "Ludwig von Mises",
    year: "1949",
    pages: 881,
    category: "economics",
    href: "https://en.wikipedia.org/wiki/Human_Action",
  },
  {
    title: "Man, Economy, and State",
    author: "Murray Rothbard",
    year: "1962",
    pages: 987,
    category: "economics",
    href: "https://en.wikipedia.org/wiki/Man,_Economy,_and_State",
  },
  {
    title: "The Ethics of Liberty",
    author: "Murray Rothbard",
    year: "1982",
    pages: 308,
    category: "philosophy",
    href: "https://en.wikipedia.org/wiki/The_Ethics_of_Liberty",
  },
  {
    title: "Democracy: The God That Failed",
    author: "Hans-Hermann Hoppe",
    year: "2001",
    pages: 318,
    category: "political",
    href: "https://en.wikipedia.org/wiki/Democracy:_The_God_That_Failed",
  },
  {
    title: "The Use of Knowledge in Society",
    author: "Friedrich Hayek",
    year: "1945",
    pages: 30,
    category: "economics",
    href: "https://en.wikipedia.org/wiki/The_Use_of_Knowledge_in_Society",
  },
];

export const CATEGORY_COLORS: Record<
  Book["category"],
  {
    palette: string;
    spine: string;
    cover: string;
    text: string;
    spineText: string;
  }
> = {
  anarchist: {
    palette: "text-stone-900",
    spine: "bg-stone-900",
    cover: "bg-stone-800",
    text: "text-yellow-400",
    spineText: "text-yellow-500",
  },
  economics: {
    palette: "text-yellow-500",
    spine: "bg-yellow-500",
    cover: "bg-yellow-400",
    text: "text-stone-900",
    spineText: "text-stone-800",
  },
  philosophy: {
    palette: "text-stone-700",
    spine: "bg-stone-700",
    cover: "bg-stone-600",
    text: "text-stone-100",
    spineText: "text-stone-300",
  },
  political: {
    palette: "text-yellow-300",
    spine: "bg-yellow-300",
    cover: "bg-yellow-200",
    text: "text-stone-800",
    spineText: "text-stone-600",
  },
};
