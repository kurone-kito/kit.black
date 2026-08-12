import { appendFileSync } from 'node:fs';
import {
  fetchFreshDataText,
  fetchLiveDataText,
  isChanged,
} from './detectChange.mjs';

/** The live published calendar data URL. */
const LIVE_URL = 'https://kit.black/data.json';

/**
 * Writes the `changed` output for GitHub Actions (`$GITHUB_OUTPUT`),
 * falling back to stdout when run outside of GitHub Actions.
 * @param changed Whether the calendar data changed.
 */
const writeOutput = (changed: boolean): void => {
  const line = `changed=${changed}`;
  const file = process.env['GITHUB_OUTPUT'];
  if (file) appendFileSync(file, `${line}\n`);
  else console.log(line);
};

// Fail open: any failure here (fetch, auth, network, or an unexpected
// exception) is treated as "changed" so the caller always builds and
// deploys rather than silently skipping on a detection error.
try {
  const fresh = await fetchFreshDataText();
  const live = await fetchLiveDataText(LIVE_URL);
  writeOutput(live === undefined || isChanged(fresh, live));
} catch (error) {
  console.error(error);
  writeOutput(true);
}
