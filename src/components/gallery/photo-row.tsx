import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  thumbUrl,
  aspectOf,
  type Photo,
  type Section,
} from "../../data/photos";
import styles from "./gallery.module.css";

type PhotoRowProps = {
  section: Section;
  activeId?: string;
  lightboxOpen?: boolean;
  onPick: (photo: Photo) => void;
  onAutoSelect: (photo: Photo) => void;
};

export const PhotoRow = ({
  section,
  activeId,
  lightboxOpen,
  onPick,
  onAutoSelect,
}: PhotoRowProps) => {
  const [ref, embla] = useEmblaCarousel({
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    align: "start",
    inViewThreshold: 0.6,
  });

  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;
  const steppingRef = useRef(false);

  const [pages, setPages] = useState(0);
  const [activePage, setActivePage] = useState(0);

  const pageCount = useCallback(() => {
    if (!embla) return 1;
    const vp = embla.rootNode().clientWidth;
    const content = embla.containerNode().scrollWidth;
    return vp > 0 ? Math.max(1, Math.ceil(content / vp)) : 1;
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    const sync = () => {
      const n = pageCount();
      setPages(n);
      setActivePage(
        Math.min(
          n - 1,
          Math.max(0, Math.round(embla.scrollProgress() * (n - 1))),
        ),
      );
    };
    sync();
    embla.on("reInit", sync).on("scroll", sync).on("select", sync);
    return () => {
      embla.off("reInit", sync).off("scroll", sync).off("select", sync);
    };
  }, [embla, pageCount]);

  const goToPage = useCallback(
    (i: number) => {
      if (!embla) return;
      const n = pages > 1 ? pages : 1;
      const target = n > 1 ? i / (n - 1) : 0;
      const list = embla.scrollSnapList();
      let idx = 0;
      let best = Infinity;
      list.forEach((p, k) => {
        const d = Math.abs(p - target);
        if (d < best) {
          best = d;
          idx = k;
        }
      });
      embla.scrollTo(idx);
    },
    [embla, pages],
  );

  useEffect(() => {
    if (!embla) return;
    const onSettle = () => {
      steppingRef.current = false;
    };
    const keepActiveVisible = () => {
      if (steppingRef.current) return;
      const id = activeIdRef.current;
      const i = section.photos.findIndex((p) => p.id === id);
      if (i < 0) return;
      const inView = embla.slidesInView();
      if (inView.length === 0 || inView.includes(i)) return;
      const first = section.photos[inView[0]];
      if (first && first.id !== id) onAutoSelect(first);
    };
    embla
      .on("scroll", keepActiveVisible)
      .on("select", keepActiveVisible)
      .on("settle", onSettle);
    return () => {
      embla
        .off("scroll", keepActiveVisible)
        .off("select", keepActiveVisible)
        .off("settle", onSettle);
    };
  }, [embla, section.photos, onAutoSelect]);

  const step = useCallback(
    (delta: number) => {
      const n = section.photos.length;
      if (!n) return;
      const cur = section.photos.findIndex((p) => p.id === activeIdRef.current);
      const target = cur < 0 ? (delta > 0 ? 0 : n - 1) : cur + delta;
      if (target < 0 || target >= n) return;
      onAutoSelect(section.photos[target]);
      if (embla) {
        steppingRef.current = true;
        embla.scrollTo(target);
      }
    },
    [embla, section.photos, onAutoSelect],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxOpen) return;
      const el = e.target as HTMLElement | null;
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      if (section.photos.findIndex((p) => p.id === activeIdRef.current) < 0)
        return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, section.photos, lightboxOpen]);

  const multi = section.photos.length > 1;
  const activeIndex = section.photos.findIndex((p) => p.id === activeId);
  const canPrev = activeIndex !== 0;
  const canNext = activeIndex < 0 || activeIndex < section.photos.length - 1;

  return (
    <section
      className={styles.row}
      id={section.id}
      aria-labelledby={`row-${section.id}`}
    >
      <div className={styles.row_head}>
        <h2 id={`row-${section.id}`} className={styles.row_title}>
          {section.label}
        </h2>
        {multi && (
          <div className={styles.row_controls}>
            {pages > 1 && (
              <div
                className={styles.dashes}
                role="tablist"
                aria-label={`${section.label} pages`}
              >
                {Array.from({ length: pages }).map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    className={`${styles.dash} ${
                      i === activePage ? styles.dash_active : ""
                    }`}
                    onClick={() => goToPage(i)}
                    aria-label={`Page ${i + 1}`}
                    aria-selected={i === activePage}
                    role="tab"
                  />
                ))}
              </div>
            )}
            <button
              type="button"
              className={styles.row_arrow}
              onClick={() => step(-1)}
              disabled={!canPrev}
              aria-label="Previous photo"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className={styles.row_arrow}
              onClick={() => step(1)}
              disabled={!canNext}
              aria-label="Next photo"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <div className={styles.row_viewport} ref={ref}>
        <div className={styles.row_track}>
          {section.photos.map((photo) => (
            <button
              type="button"
              key={photo.id}
              data-id={photo.id}
              className={`${styles.tile} ${
                photo.id === activeId ? styles.tile_active : ""
              }`}
              style={{ aspectRatio: String(aspectOf(photo)) }}
              onClick={() => onPick(photo)}
              aria-label={`Highlight ${photo.title || photo.id}`}
              aria-pressed={photo.id === activeId}
            >
              <img
                src={thumbUrl(photo)}
                alt={photo.title || ""}
                loading="lazy"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
