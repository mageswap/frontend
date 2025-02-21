const EXPLORER_HOSTNAMES: { [hostname: string]: true } = {
  'bscscan.com': true,
  'ftmscan.com': true,
  'goerli.ftmscan.com': true,
  'optimistic.ftmscan.com': true,
  'goerli-optimism.ftmscan.com': true,
  'arbiscan.io': true,
}

/**
 * Returns the anonymized version of the given href, i.e. one that does not leak user information
 * @param href the link to anonymize, i.e. remove any personal data from
 * @return string anonymized version of the given href
 */
export function anonymizeLink(href: string): string {
  try {
    const url = new URL(href)
    if (EXPLORER_HOSTNAMES[url.hostname]) {
      const pathPieces = url.pathname.split('/')

      const anonymizedPath = pathPieces.map((pc) => (/0x[a-fA-F0-9]+/.test(pc) ? '***' : pc)).join('/')

      return `${url.protocol}//${url.hostname}${anonymizedPath}`
    }
    return href
  } catch (error) {
    return href
  }
}
