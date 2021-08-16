import loadImage from "./loadImage";

export default function SuspenseImage(
  props: React.ImgHTMLAttributes<HTMLImageElement>
): JSX.Element {
  loadImage(props.src).read();
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...props} loading="lazy" />;
}
