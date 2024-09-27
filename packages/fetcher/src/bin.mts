#!/usr/bin/env node --enable-source-maps --env-file=../../.env
console.log(JSON.stringify(process.env, undefined, 2));
