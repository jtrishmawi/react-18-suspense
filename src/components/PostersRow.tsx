import styled from "@emotion/styled/macro";
import { useHorizontalScroll } from "hooks/useHorizontalScroll";
import { PropsWithChildren, useRef } from "react";

interface Props {
  big?: boolean;
  title: string;
}

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 50px auto;
  grid-template-columns: 1fr;

  h2 {
    grid-row: 1/2;
    grid-column: 1/2;
    display: block;
    position: sticky;
    z-index: 1;
    top: 0;
    background-color: rgba(51, 51, 51, 0.5);
    margin: 0;
    width: 100%;
    line-height: 50px;
    padding-left: 1rem;
  }
`;

const Row = styled.div<Pick<Props, "big">>`
  grid-row: 1/3;
  grid-column: 1/2;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${(props) =>
    props.big ? "minmax(342px, 1fr)" : "minmax(185px, 1fr)"};
  min-height: ${(props) => (props.big ? "530px" : "300px")};
  overflow-x: auto;
  overflow-y: hidden;

  &.active {
    cursor: grabbing;
  }

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 3px rgba(51, 51, 51, 0.5);
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ff7a18;
  }
`;

export const PostersRow = ({
  title,
  big,
  children,
}: PropsWithChildren<Props>) => {
  const ref = useRef<HTMLDivElement>(null);
  useHorizontalScroll(ref);

  return (
    <Container>
      <h2>{title}</h2>
      <Row big={big} ref={ref}>
        {children}
      </Row>
    </Container>
  );
};
