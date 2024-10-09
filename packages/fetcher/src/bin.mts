#!/usr/bin/env node --enable-source-maps --env-file=../../.env

import { WEEKDATES, weekRange } from '@kurone-kito/kit.black-lib';
import { fetchAllRawEventsFactory } from './fetchRaw.mjs';
import { toEventsFactory } from './parseEvent.mjs';
import { toRowMapper } from './toRow.mjs';

const fetchAllRawEvents = fetchAllRawEventsFactory();
const span = weekRange(new Date(), WEEKDATES);
const toEvents = toEventsFactory(span);
const raw = await fetchAllRawEvents(span);
console.log(JSON.stringify(toEvents(raw).map(toRowMapper), undefined, 2));
