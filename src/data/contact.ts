export type ContactChannel = {
  /** Channel label shown before the value, e.g. "email". */
  label: string
  /** Display value, e.g. "isanzarenal@gmail.com". */
  value: string
  href: string
  /** Opens in a new tab (target="_blank" + rel="noopener noreferrer"). False for mailto links. */
  external: boolean
}

export const contactChannels: ContactChannel[] = [
  {
    label: 'email',
    value: 'isanzarenal@gmail.com',
    href: 'mailto:isanzarenal@gmail.com',
    external: false,
  },
  {
    label: 'linkedin',
    value: '/in/ivan-sanz-arenal',
    href: 'https://www.linkedin.com/in/ivan-sanz-arenal/',
    external: true,
  },
  {
    label: 'github',
    value: '/isanzarenal',
    href: 'https://github.com/isanzarenal',
    external: true,
  },
]
