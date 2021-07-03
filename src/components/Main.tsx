import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import emotionNormalize from "emotion-normalize";
import { PropsWithChildren } from "react";

const Container = styled.div`
  margin: 0;
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
      `}
    />
    {children}
  </Container>
);
