import { RefObject, useLayoutEffect } from "react";

export const useHorizontalScroll = (elem: RefObject<HTMLElement>) =>
  useLayoutEffect(() => {
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    elem.current?.addEventListener("mousedown", (e) => {
      isDown = true;
      elem.current?.classList.add("active");
      startX = e.pageX - elem.current!.offsetLeft;
      scrollLeft = elem.current!.scrollLeft;
    });

    elem.current?.addEventListener("mouseleave", () => {
      isDown = false;
      elem.current?.classList.remove("active");
    });

    elem.current?.addEventListener("mouseup", () => {
      isDown = false;
      elem.current?.classList.remove("active");
    });

    elem.current?.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - elem.current!.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      elem.current!.scrollLeft = scrollLeft - walk;
    });
  }, []);
