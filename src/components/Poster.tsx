import styled from "@emotion/styled/macro";
import { MovieListObject, TvListResultObject } from "../helpers/api";

const Container = styled.div`
  display: block;
`;

interface Props {
  movie: TvListResultObject & MovieListObject;
}

export const Poster = ({ movie }: Props) => (
  <Container>{movie.title ?? movie.name}</Container>
);
