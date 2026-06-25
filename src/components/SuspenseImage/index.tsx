import type { ImgHTMLAttributes } from "react";
import loadImage from "./loadImage";

export default function SuspenseImage({
  alt,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement>) {
  loadImage(rest.src).read();
  return <img alt={alt} {...rest} loading="lazy" />;
}
