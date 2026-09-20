import { useEffect, type RefObject } from "react";
/** Fine-pointer decoration only; does not turn informational cards into buttons. */
export function useCardTilt(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const media = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const cards = Array.from(
      root.current?.querySelectorAll<HTMLElement>(
        ".feature-card, .review-card",
      ) ?? [],
    );
    const reset = () =>
      cards.forEach((card) => {
        card.style.removeProperty("--tilt-x");
        card.style.removeProperty("--tilt-y");
      });
    const cleanups = cards.map((card) => {
      const move = (e: PointerEvent) => {
        if (!media.matches || e.pointerType !== "mouse") return;
        const r = card.getBoundingClientRect();
        card.style.setProperty(
          "--tilt-x",
          `${(-(e.clientY - r.top - r.height / 2) / r.height) * 5}deg`,
        );
        card.style.setProperty(
          "--tilt-y",
          `${((e.clientX - r.left - r.width / 2) / r.width) * 5}deg`,
        );
      };
      const leave = () => {
        card.style.removeProperty("--tilt-x");
        card.style.removeProperty("--tilt-y");
      };
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
      card.addEventListener("pointercancel", leave);
      return () => {
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerleave", leave);
        card.removeEventListener("pointercancel", leave);
      };
    });
    media.addEventListener("change", reset);
    return () => {
      cleanups.forEach((cleanup) => cleanup());
      media.removeEventListener("change", reset);
      reset();
    };
  }, [root]);
}
