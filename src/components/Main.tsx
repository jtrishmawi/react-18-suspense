import { css, Global } from "@emotion/react/macro";
import styled from "@emotion/styled/macro";
import emotionNormalize from "emotion-normalize";
import { PropsWithChildren } from "react";

const Container = styled.div`
  margin: 0;
  height: 100vh;
`;

export const Main = ({ children }: PropsWithChildren<{}>) => (
  <Container>
    <Global
      styles={css`
        @import url(https://fonts.googleapis.com/css2?family=Bitter&display=swap);
        ${emotionNormalize}

        html,
        body {
          padding: 0;
          margin: 0;
          background: #222222;
          color: #fefefe;
          font-family: "Bitter", Arial, Helvetica, sans-serif;
        }

        *,
        *::after,
        *::before {
          box-sizing: border-box;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
        }

        &::-webkit-scrollbar {
          width: 9px;
          height: 9px;
          transition: width 300ms, height 300ms;
        }

        &::-webkit-scrollbar-track {
          box-shadow: inset 0 0 3px rgba(51, 51, 51, 0.5);
        }

        &::-webkit-scrollbar-thumb {
          background-color: #ff7a18;
        }
      `}
    />
    {children}
  </Container>
);
