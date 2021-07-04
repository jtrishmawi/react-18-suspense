import styled from "@emotion/styled/macro";

export const PostersRow = styled.div`
  display: grid;
  grid-template-columns: repeat(20, minmax(342px, 1fr));
  position: relative;
  min-height: 200px;

  h2 {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(51, 51, 51, 0.65);
    padding: 0.5rem;
  }
`;
