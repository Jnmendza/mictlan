// Mouse tracking for the spotlight effect on both tracking texts
export const handleMouseMove = (
  e: React.MouseEvent<HTMLParagraphElement>,
  ref: React.RefObject<HTMLParagraphElement | null>,
) => {
  const el = ref.current;
  if (!el) return;

  // Get mouse position relative to the element
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Set CSS variables for the gradient center
  el.style.setProperty("--mouse-x", `${x}px`);
  el.style.setProperty("--mouse-y", `${y}px`);
};
