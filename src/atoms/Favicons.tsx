import React from 'react';
import { Head } from 'react-static';

import F16 from '~/images/favicons/016.png';
import F24 from '~/images/favicons/024.png';
import F32 from '~/images/favicons/032.png';
import F36 from '~/images/favicons/036.png';
import F48 from '~/images/favicons/048.png';
import F57 from '~/images/favicons/057.png';
import F60 from '~/images/favicons/060.png';
import F72 from '~/images/favicons/072.png';
import F76 from '~/images/favicons/076.png';
import F96 from '~/images/favicons/096.png';
import F114 from '~/images/favicons/114.png';
import F120 from '~/images/favicons/120.png';
import F128 from '~/images/favicons/128.png';
import F144 from '~/images/favicons/144.png';
import F152 from '~/images/favicons/152.png';
import F160 from '~/images/favicons/160.png';
import F180 from '~/images/favicons/180.png';
import F192 from '~/images/favicons/192.png';
import F196 from '~/images/favicons/196.png';
import F256 from '~/images/favicons/256.png';
import F384 from '~/images/favicons/384.png';
import FaviconImage from '~/images/favicons/favicon.ico';

const component: React.FC = () => (
  <Head>
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="msapplication-TileImage" content={F144} />
    <link rel="shortcut icon" type="image/vnd.microsoft.icon" href={FaviconImage} />
    <link rel="icon" type="image/vnd.microsoft.icon" href={FaviconImage} />
    <link rel="apple-touch-icon" sizes="57x57" href={F57} />
    <link rel="apple-touch-icon" sizes="60x60" href={F60} />
    <link rel="apple-touch-icon" sizes="72x72" href={F72} />
    <link rel="apple-touch-icon" sizes="76x76" href={F76} />
    <link rel="apple-touch-icon" sizes="114x114" href={F114} />
    <link rel="apple-touch-icon" sizes="120x120" href={F120} />
    <link rel="apple-touch-icon" sizes="144x144" href={F144} />
    <link rel="apple-touch-icon" sizes="152x152" href={F152} />
    <link rel="apple-touch-icon" sizes="180x180" href={F180} />
    <link rel="icon" type="image/png" sizes="36x36" href={F36} />
    <link rel="icon" type="image/png" sizes="48x48" href={F48} />
    <link rel="icon" type="image/png" sizes="72x72" href={F72} />
    <link rel="icon" type="image/png" sizes="96x96" href={F96} />
    <link rel="icon" type="image/png" sizes="128x128" href={F128} />
    <link rel="icon" type="image/png" sizes="144x144" href={F144} />
    <link rel="icon" type="image/png" sizes="152x152" href={F152} />
    <link rel="icon" type="image/png" sizes="160x160" href={F160} />
    <link rel="icon" type="image/png" sizes="192x192" href={F192} />
    <link rel="icon" type="image/png" sizes="196x196" href={F196} />
    <link rel="icon" type="image/png" sizes="256x256" href={F256} />
    <link rel="icon" type="image/png" sizes="384x384" href={F384} />
    <link rel="icon" type="image/png" sizes="16x16" href={F16} />
    <link rel="icon" type="image/png" sizes="24x24" href={F24} />
    <link rel="icon" type="image/png" sizes="32x32" href={F32} />
  </Head>);

component.displayName = 'Favicons';

export default component;
