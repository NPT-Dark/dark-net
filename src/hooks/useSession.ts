import { useEffect, useState } from "react";

export function useActiveSection(
  ids: string[],
  containerId: string,
  pathName: string | null
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined")
      return;
    const container = document.getElementById(containerId);
    if (!container) return setActiveId(null);

    function onScroll() {
      let found: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && container) {
          const containerRect = container.getBoundingClientRect();
          const rect = el.getBoundingClientRect();
          const containerMiddle = containerRect.top + containerRect.height / 2;
          if (rect.top <= containerMiddle && rect.bottom >= containerMiddle) {
            found = id;
            break;
          }
        }
      }
      if (activeId !== found) {
        history.replaceState(null, "", `#${found}`);
      }
      setActiveId(found);
    }

    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      container.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids, containerId, pathName]);

  return activeId;
}
