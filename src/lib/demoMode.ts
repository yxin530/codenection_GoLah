/**
 * GoLah Demo Mode utilities.
 * Sets all localStorage state needed to pre-populate the group trip demo.
 * Call initDemoMode() before navigating to /analyzing?type=group.
 */

const DEMO_KEYS = [
  'golahDemoMode',
  'golahTripType',
  'golahTripBudget',
  'tripLikedPlaces',
  'tripLikedAccs',
  'approvedPollAcc',
  'approvedPollPlace',
  'golahTripAnswers',
  'golahBookingComplete',
];

export function initDemoMode(): void {
  // Clear any previous session
  DEMO_KEYS.forEach(k => localStorage.removeItem(k));

  localStorage.setItem('golahDemoMode', 'true');
  localStorage.setItem('golahTripType', 'group');
  localStorage.setItem('golahTripBudget', 'RM 2,500\u20134,000');

  localStorage.setItem('tripLikedPlaces', JSON.stringify([
    'Universal Studios Japan',
    'Osaka Castle',
    'Fushimi Inari Taisha',
    'Dotonbori',
  ]));

  localStorage.setItem('tripLikedAccs', JSON.stringify([
    'Kyoto Ryokan Kinoe',
    'Nine Hours Namba',
  ]));

  localStorage.setItem('approvedPollAcc', 'Kyoto Ryokan Kinoe');
  localStorage.setItem('approvedPollPlace', 'Universal Studios Japan');

  localStorage.setItem('golahTripAnswers', JSON.stringify({
    0: ['12\u201317 Oct'],
    1: ['Kyoto', 'Osaka'],
    2: ['Culture + history', 'Food adventure'],
    3: ['Universal Studios Japan'],
    4: ['Balanced'],
    5: ['No restrictions'],
    6: ['Direct first'],
    7: ['Economy'],
    8: ['Ryokan'],
    9: ['Near the action'],
    10: ['RM 2,500\u20134,000'],
    11: ['Yes, include it'],
    12: ['20 kg checked'],
    13: ['Add standard cover'],
    14: ['Surprise me'],
  }));

  localStorage.setItem('golahBookingComplete', 'false');
}

export function resetDemoMode(): void {
  DEMO_KEYS.forEach(k => localStorage.removeItem(k));
}

export function isDemoMode(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('golahDemoMode') === 'true';
}
