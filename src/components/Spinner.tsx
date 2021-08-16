import styled from "@emotion/styled/macro";

interface Props {
  index: number;
}

const Container = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  height: 100%;
`;
const FloatingBars = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 75px;
  margin: auto;
`;
const FloatingBar = styled.div<Props>`
  position: absolute;
  background-color: rgb(51, 51, 51);
  width: 10px;
  height: 23px;
  border-radius: 8px 8px 0 0;
  transform: scale(0.4);
  animation-name: fadeG;
  animation-duration: 0.832s;
  animation-iteration-count: infinite;
  animation-direction: normal;

  @keyframes fadeG {
    0% {
      background-color: rgb(51, 51, 51, 0.5);
    }

    100% {
      background-color: rgb(0, 0, 0, 0.65);
    }
  }

  ${(props) => {
    if (props.index === 0) {
      return `left: 0; top: 27px; animation-delay: 0.3095s; transform: rotate(-90deg);`;
    }

    if (props.index === 1) {
      return `left: 8px; top: 10px; animation-delay: 0.416s; transform: rotate(-45deg);`;
    }

    if (props.index === 2) {
      return `left: 25px; top: 3px; animation-delay: 0.5225s; transform: rotate(0deg);`;
    }

    if (props.index === 3) {
      return `right: 8px; top: 10px; animation-delay: 0.619s; transform: rotate(45deg);`;
    }

    if (props.index === 4) {
      return `right: 0; top: 27px; animation-delay: 0.7255s; transform: rotate(90deg);`;
    }

    if (props.index === 5) {
      return `right: 8px; bottom: 7px; animation-delay: 0.832s; transform: rotate(135deg);`;
    }

    if (props.index === 6) {
      return `bottom: 0; left: 25px; animation-delay: 0.9385s; transform: rotate(180deg);`;
    }

    if (props.index === 7) {
      return `left: 8px; bottom: 7px; animation-delay: 1.035s; transform: rotate(-135deg);`;
    }
  }}
`;

export const Spinner = () => {
  return (
    <Container>
      <FloatingBars>
        {[...Array(8).keys()].map((i) => (
          <FloatingBar key={i} index={i} />
        ))}
      </FloatingBars>
    </Container>
  );
};
