import styled from "@emotion/styled/macro";

export const PostersRow = styled.div`
  display: grid;
  grid-template-columns: repeat(20, minmax(300px, 1fr));
  position: relative;
  min-height: 200px;

  h2 {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(#333, 0.75);
  }
`;
