import styled from "@emotion/styled/macro";
import { useCallback, useState } from "react";
import { MovieListObject, TvListResultObject } from "../helpers/api";
import SuspenseImage from "./SuspenseImage";

const Container = styled.div`
  position: relative;
`;

const Img = styled(SuspenseImage)`
  object-fit: fill;
  width: 100%;
  height: 100%;
`;

const Body = styled.div<{ visible: boolean }>`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(51, 51, 51, 0.65);
  padding: 0.5rem;
  ${({ visible }) => {
    return visible
      ? `visibility: visible;
    opacity: 1;
    transition: visibility 0s ease-in 0s, opacity 300ms;`
      : `visibility: hidden;
  opacity: 0;
  transition: visibility 0s ease-out 300ms, opacity 300ms;`;
  }}
`;

interface Props {
  movie: TvListResultObject & MovieListObject;
}

const Poster = ({ movie }: Props) => {
  const [visible, setVisible] = useState(false);

  const handleMouseOver = useCallback(() => {
    setVisible((visible) => {
      if (!visible) {
        setTimeout(() => {
          setVisible(false);
        }, 1500);
      }
      return !visible;
    });
  }, []);

  return (
    <Container onMouseOver={handleMouseOver}>
      <Img alt={movie.title ?? movie.name} src={movie.poster_path!} />
      <Body visible={visible}>
        <h3>{movie.title ?? movie.name}</h3>
      </Body>
    </Container>
  );
};

export default Poster;
