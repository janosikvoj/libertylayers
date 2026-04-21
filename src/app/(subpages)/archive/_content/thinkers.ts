export interface Thinker {
  name: string;
  birth: number;
  death: number | null;
  role: string;
  award?: string;
  bio: string;
}

export const THINKERS: Thinker[] = [
  {
    name: 'Lysander Spooner',
    birth: 1808,
    death: 1887,
    role: 'Abolitionist & individualist anarchist',
    bio: 'American legal theorist and entrepreneur who argued that the U.S. Constitution had no binding authority over those who never consented to it. His essay No Treason remains one of the most radical critiques of the state ever written.',
  },
  {
    name: 'Ludwig von Mises',
    birth: 1881,
    death: 1973,
    role: 'Economist · Founder of praxeology',
    bio: 'Architect of praxeology, the deductive science of human action, and author of Human Action, the definitive treatise of Austrian economics. His socialist calculation argument demonstrated that central planning cannot rationally allocate resources without market prices.',
  },
  {
    name: 'Friedrich Hayek',
    birth: 1899,
    death: 1992,
    role: 'Economist · Nobel Prize 1974',
    award: 'Nobel Prize in Economics, 1974',
    bio: 'Showed that prices are an irreplaceable mechanism for transmitting dispersed knowledge that no central authority could ever possess. His Nobel Prize–winning work on spontaneous order became the intellectual backbone of modern free-market thought.',
  },
  {
    name: 'Milton Friedman',
    birth: 1912,
    death: 2006,
    role: 'Economist · Nobel Prize 1976',
    award: 'Nobel Prize in Economics, 1976',
    bio: "The 20th century's most influential advocate of free-market capitalism, whose monetarist framework reshaped macroeconomic policy worldwide. His book Capitalism and Freedom argued that economic liberty is an indispensable condition of political liberty.",
  },
  {
    name: 'Murray Rothbard',
    birth: 1926,
    death: 1995,
    role: 'Economist · Anarcho-capitalist theorist',
    bio: 'Coined the term anarcho-capitalism and synthesized Austrian economics with natural rights theory into a comprehensive anti-state philosophy. His treatise Man, Economy, and State is regarded as the most thorough work in the Austrian tradition after Mises.',
  },
  {
    name: 'Thomas Sowell',
    birth: 1930,
    death: null,
    role: 'Economist · Social theorist',
    bio: 'Senior fellow at the Hoover Institution whose prolific output spans economics, history, and social theory, consistently dismantling the intellectual foundations of state intervention. A former Marxist turned free-market advocate, his trilogy on constrained vs. unconstrained visions remains foundational.',
  },
  {
    name: 'Robert Nozick',
    birth: 1938,
    death: 2002,
    role: 'Philosopher · Minimal state libertarianism',
    bio: 'His book Anarchy, State, and Utopia, written as a direct response to Rawls, made the philosophical case that only a minimal state limited to protecting individual rights can be justified. Introduced the Wilt Chamberlain argument, a landmark challenge to redistributive theories of justice.',
  },
  {
    name: 'David Friedman',
    birth: 1945,
    death: null,
    role: 'Economist · Market anarchism & law',
    bio: 'Son of Milton Friedman and author of The Machinery of Freedom, which grounds anarcho-capitalism in consequentialist rather than natural rights reasoning. A physicist by training, he has produced influential work on law-and-economics and historical legal systems without states.',
  },
  {
    name: 'Hans-Hermann Hoppe',
    birth: 1949,
    death: null,
    role: 'Economist · Argumentation ethics',
    bio: 'Student of Habermas turned Rothbardian, who developed the argumentation ethics proof, the claim that the non-aggression principle is presupposed by rational discourse itself. His Democracy: The God That Failed makes the controversial case that monarchy is preferable to democracy as a path toward statelessness.',
  },
];
