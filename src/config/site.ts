/**
 * Eagle Innovia Ltd — single source of truth for site-wide data.
 *
 * Anything we do not know yet is the string 'TODO' (or an empty array).
 * Components hide any block whose data is still TODO, so nothing fake is ever shown.
 * Search this file for "TODO" to see what is still missing.
 */

export const TODO = 'TODO' as const;

/** True when a config value has been filled in (not empty and not a TODO placeholder). */
export const isSet = (value: unknown): value is string =>
  typeof value === 'string' && value.trim() !== '' && !value.trim().startsWith('TODO');

export const site = {
  name: 'Eagle Innovia Ltd',
  shortName: 'Eagle Innovia',
  url: 'https://www.eagleinnovia.com',
  tagline: 'Cloud, healthcare and education solutions, delivered worldwide.',
  focus: ['Health', 'Technology', 'Education', 'Innovation'],
  description:
    'Eagle Innovia Ltd delivers cloud, healthcare and education solutions to clients in the UK, USA, Canada, Switzerland, the EU and Nigeria.',
  markets: ['UK', 'USA', 'Canada', 'Switzerland', 'EU', 'Nigeria'],

  location: {
    locality: 'Kuje',
    region: 'Federal Capital Territory (Abuja)',
    country: 'Nigeria',
    countryCode: 'NG',
    display: 'Kuje, Abuja, Nigeria',
    // Approximate centre of Kuje, used for the map and LocalBusiness schema.
    lat: 8.8795,
    lng: 7.2276,
  },

  /**
   * Emails are stored split (user + domain) so the full address never appears in source
   * or built HTML. <ObfuscatedEmail> assembles them in the browser.
   */
  emails: {
    info: { user: 'info', domain: 'eagleinnovia.com' },
    gmail: { user: 'eagleinnovia', domain: 'gmail.com' },
  },

  calendly: 'https://calendly.com/eagleinnovia/30min',

  /** International format, digits only, e.g. '2348012345678'. Hidden while TODO. */
  whatsapp: TODO as string,
  /** Display phone, e.g. '+234 801 234 5678'. Hidden while TODO. */
  phone: TODO as string,

  /** Corporate Affairs Commission registration number, e.g. 'RC 1234567'. Hidden while TODO. */
  cacNumber: '8852938',

  social: {
    linkedin: TODO as string,
    x: TODO as string,
    facebook: TODO as string,
    instagram: TODO as string,
    youtube: TODO as string, // Eagle Innovia's own channel, if any (the AWS course channel is personal)
  },

  /**
   * Analytics are OFF by default. To enable a free, cookie-less option later:
   *  - GoatCounter: provider 'goatcounter' and set goatcounterCode (the part before .goatcounter.com)
   *  - Cloudflare Web Analytics: provider 'cloudflare' and set cloudflareToken
   */
  analytics: {
    provider: 'none' as 'none' | 'goatcounter' | 'cloudflare',
    goatcounterCode: TODO as string,
    cloudflareToken: TODO as string,
  },

  certifications: [
    'AWS Certified Solutions Architect – Associate',
    'AWS Certified Cloud Practitioner',
    'Kubernetes and Cloud Native Associate (KCNA)',
    'HIPAA certification',
  ],

  /** Free AWS course on the "Cloud Engineering and AI with Ugochukwu" YouTube channel. */
  awsCourse: {
    title: 'Cloud Computing with AWS: Zero to Job-Ready',
    channelName: 'Cloud Engineering and AI with Ugochukwu',
    channel: 'https://www.youtube.com/@lightcloud9',
    playlist: 'https://www.youtube.com/playlist?list=PLV6bFfc-yYjE',
    labRepo: 'https://github.com/lightcloud99/AWS-Cloud-Engineering-for-Beginners',
    lessons: [
      { title: 'Lesson 1', id: 'RRIqStltAxk' },
      { title: 'Lesson 2', id: '5roKEmZjbPs' },
      { title: 'Lesson 3', id: 'oCXQa5hXg_c' },
      { title: 'Lesson 4', id: 'H89J90edFG0' },
      { title: 'Bonus: securing your account with MFA', id: 'qcLGkjtdiOA' },
    ],
  },

  /** Healthcare Virtual Assistant Training & Simulation Programme. */
  vaProgramme: {
    nextCohortDate: TODO as string, // e.g. '12 January 2027'
    fee: TODO as string, // e.g. '₦150,000' or '£250'
  },

  afroremote: {
    url: 'https://afroremote.com',
    /** Path inside src/assets, e.g. 'afroremote-home.png'. Hidden while TODO. */
    screenshot: 'afroremote-home.png',
    /** Real, verified results only, e.g. ['1,200 jobs listed in the first month']. */
    results: [] as string[],
  },

  /** Real testimonials only. The section stays hidden while this is empty. */
  testimonials: [] as { quote: string; name: string; role: string }[],

  /** Leadership team. The section stays hidden while this is empty. */
  team: [] as { name: string; role: string; bio?: string }[],

  /**
   * Package prices for the Technology service pages, keyed by `priceKey` in
   * src/content/services/*.md. While TODO, the package shows "Get a quote".
   */
  prices: {
    'cloud-aws-assessment': TODO as string,
    'cloud-aws-migration': TODO as string,
    'cloud-aws-managed': TODO as string,
    'devops-pipeline': TODO as string,
    'devops-kubernetes': TODO as string,
    'devops-support': TODO as string,
    'security-assessment': TODO as string,
    'security-hardening': TODO as string,
    'security-review': TODO as string,
    'crm-setup': TODO as string,
    'crm-automation': TODO as string,
    'crm-support': TODO as string,
    'web-site': TODO as string,
    'web-platform': TODO as string,
    'web-care': TODO as string,
  } as Record<string, string>,

  /** Online stores. Product cards and store buttons stay hidden while TODO. */
  stores: {
    naturals: TODO as string, // Ozzie Naturals Selar store URL
    selar: TODO as string, // Digital products Selar store URL
    amazon: TODO as string, // Amazon KDP author page URL
  },
};

export type Site = typeof site;
