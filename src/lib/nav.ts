export interface NavLink {
  label: string;
  href: string;
  description?: string;
}
export interface NavItem {
  label: string;
  href?: string;
  children?: NavLink[];
}

export const technologyLinks: NavLink[] = [
  { label: 'Light Cloud overview', href: '/technology', description: 'All technology services' },
  { label: 'Cloud & AWS', href: '/technology/cloud-aws' },
  { label: 'DevOps & Kubernetes', href: '/technology/devops-kubernetes' },
  { label: 'Cloud security', href: '/technology/security' },
  { label: 'CRM & automation', href: '/technology/crm-automation' },
  { label: 'Web platforms', href: '/technology/web-platforms' },
];

export const mainNav: NavItem[] = [
  { label: 'Technology', children: technologyLinks },
  { label: 'Healthcare', href: '/healthcare' },
  { label: 'Academy', href: '/academy' },
  {
    label: 'Shop',
    children: [
      { label: 'Ozzie Naturals', href: '/naturals' },
      { label: 'Digital Products', href: '/products' },
    ],
  },
  {
    label: 'Company',
    children: [
      { label: 'About', href: '/about' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export const divisions = [
  {
    name: 'Light Cloud',
    area: 'Technology',
    href: '/technology',
    icon: 'cloud',
    accent: 'teal',
    text: 'AWS cloud engineering, DevOps, security, CRM automation and web platforms.',
  },
  {
    name: 'Ozzie Health Consult',
    area: 'Healthcare',
    href: '/healthcare',
    icon: 'stethoscope',
    accent: 'sage',
    text: 'Remote healthcare support, HIPAA-aware medical virtual assistants and health education.',
  },
  {
    name: 'Eagle Innovia Academy',
    area: 'Education',
    href: '/academy',
    icon: 'graduation',
    accent: 'lime',
    text: 'Practical training, including a free AWS course and a Healthcare VA programme.',
  },
  {
    name: 'Ozzie Naturals',
    area: 'Wellness',
    href: '/naturals',
    icon: 'leaf',
    accent: 'sage-light',
    text: 'Natural skin, hair and wellness products.',
  },
] as const;
