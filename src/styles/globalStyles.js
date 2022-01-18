import { css } from '@emotion/react';

export const variables = {
   font: `'Josefin Sans', sans-serif`,

   weights: {
      normal: 400,
      bold: 700,
   },

   sizes: {
      xsmall: '12px',
      small: '14px',
      normal: '16px',
      medium: '18px',
      large: '20px',
      xlarge: '24px',
   },

   breakpoints: {
      mobile: 375,
      phablet: 550,
      tablet: 750,
      desktop: 1024,
      hd: 1280,
   },

   misc: {
      spacing: '2px',
      transitionEase: 'all 0.2s linear',
      transitionEase1: 'all 0.5s ease-in-out',
   },
};

export const globalStyles = css`
   html {
      box-sizing: border-box;
   }

   *,
   *:before,
   *:after {
      box-sizing: inherit;
      padding: 0;
      margin: 0;
      font-family: ${variables.font};
   }

   body {
      font-family: ${variables.font};
      line-height: 1.3;
   }

   img {
      max-width: 100%;
   }

   p {
      font-size: 16px;

      @media screen and (min-width: ${variables.breakpoints.desktop}px) {
         font-size: 18px;
      }
   }

   ul {
      list-style: none;
   }

   .container {
      width: 90%;
      margin: auto;

      @media screen and (min-width: ${variables.breakpoints.desktop}px) {
         width: 40%;
      }
   }

   .btn {
      background: none;
      outline: none;
      border: none;
      font-size: 16px;
      text-transform: capitalize;
      cursor: pointer;
      margin-bottom: 0;

      @media screen and (min-width: ${variables.breakpoints.desktop}px) {
         font-size: 18px;
      }
   }
`;
