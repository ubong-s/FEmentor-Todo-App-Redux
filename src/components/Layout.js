import React from 'react';
import styled from '@emotion/styled';
import { Global } from '@emotion/react';
import { ThemeProvider } from '@emotion/react';
import { globalStyles } from '../styles/globalStyles';
import { theme } from '../styles/themeConfig';
import { BottomSection, TopSection } from '../components';
import { connect } from 'react-redux';

const Layout = ({ darkMode }) => {
   return (
      <ThemeProvider theme={darkMode ? theme.dark : theme.light}>
         <Global styles={globalStyles} />
         <LayoutWrap>
            <TopSection />
            <BottomSection />
         </LayoutWrap>
      </ThemeProvider>
   );
};

const mapStateToProps = (state) => {
   return { darkMode: state.darkMode };
};

export default connect(mapStateToProps)(Layout);

const LayoutWrap = styled.div`
   background: ${(props) => props.theme.body};
   color: ${(props) => props.theme.text};
   min-height: 100vh;
   transition: all 0.3s ease-in-out;
`;
