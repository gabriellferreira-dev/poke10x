import { Global } from '@emotion/react';

import PokemonSolid from '../assets/fonts/PokemonSolidNormal.ttf';

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Pokemon Solid Normal';
        font-style: normal;
        font-weight: 400;
        src: url(${PokemonSolid}) format("truetype");
      }

      `}
  />
);

export default Fonts;
