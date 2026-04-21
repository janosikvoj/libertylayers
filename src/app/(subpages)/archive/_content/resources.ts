export interface Resource {
  name: string;
  type: string;
  url: string;
}

export const RESOURCES: Resource[] = [
  { name: 'mises.org', type: 'Institute', url: 'https://mises.org' },
  { name: 'fee.org', type: 'Foundation', url: 'https://fee.org' },
  { name: 'ankap.urza.cz', type: 'Community', url: 'https://ankap.urza.cz' },
  {
    name: 'The Tom Woods Show',
    type: 'Podcast',
    url: 'https://tomwoods.com/podcast',
  },
  {
    name: 'Part of the Problem',
    type: 'Podcast',
    url: 'https://podcasts.apple.com/us/podcast/part-of-the-problem/id1073415833',
  },
  {
    name: 'Students for Liberty',
    type: 'Network',
    url: 'https://studentsforliberty.org',
  },
  { name: 'Liberální Institut', type: 'Institute', url: 'https://libinst.cz' },
  { name: 'Parallel Polis', type: 'Hub', url: 'https://paralelnipolis.cz' },
];
