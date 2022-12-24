import { settings } from 'global/settings';

/**
 *
 * @param {string} iconName
 * @returns {string}
 */
export function generateIconUrl(iconName: string) {
  const iconUrl = `${settings.API_URL}/img/w/${iconName}.png`;

  return iconUrl;
}
