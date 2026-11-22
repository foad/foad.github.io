import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { thumbUrl, aspectOf, type Photo, type Section } from "../../data/photos";
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
    slidesToScroll: "auto",
    containScroll: "trimSnaps",
    align: "start",
    inViewThreshold: 0.5,
  });
  const [snaps, setSnaps] = useState<number[]>([]);
  const [selected, setSelected] = useState(0);

  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;
  const steppingRef = useRef(false);

  const sync = useCallback((api: EmblaCarouselType) => {
    setSelected(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!embla) return;
    const refresh = () => {
      setSnaps(embla.scrollSnapList());
      sync(embla);
    };
    refresh();
    embla.on("select", sync).on("reInit", refresh);
  }, [embla, sync]);

  useEffect(() => {
    if (!embla) return;
    const onSettle = () => {
      steppingRef.current = false;
    };
    const keepActiveVisible = () => {
      if (steppingRef.current) return;
      const id = activeIdRef.current;
      const activeIndex = section.photos.findIndex((p) => p.id === id);
      if (activeIndex < 0) return;
      const inView = embla.slidesInView();
      if (inView.length === 0 || inView.includes(activeIndex)) return;
      const firstVisible = section.photos[inView[0]];
      if (firstVisible && firstVisible.id !== id) onAutoSelect(firstVisible);
    };
    embla.on("scroll", keepActiveVisible).on("select", keepActiveVisible).on("settle", onSettle);
    return () => {
      embla
        .off("scroll", keepActiveVisible)
        .off("select", keepActiveVisible)
        .off("settle", onSettle);
    };
  }, [embla, section.photos, onAutoSelect]);

  const revealSlide = useCallback(
    (index: number) => {
      if (!embla) return;
      if (embla.slidesInView().includes(index)) return;
      const registry = embla.internalEngine().slideRegistry;
      let snap = registry.findIndex((group) => group.includes(index));
      if (snap < 0) snap = Math.min(index, embla.scrollSnapList().length - 1);
      steppingRef.current = true;
      embla.scrollTo(snap);
    },
    [embla]
  );

  const step = useCallback(
    (delta: number) => {
      const n = section.photos.length;
      if (!n) return;
      const cur = section.photos.findIndex((p) => p.id === activeIdRef.current);
      const target = cur < 0 ? (delta > 0 ? 0 : n - 1) : cur + delta;
      if (target < 0 || target >= n) return;
      onAutoSelect(section.photos[target]);
      revealSlide(target);
    },
    [section.photos, onAutoSelect, revealSlide]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxOpen) return;
      const el = e.target as HTMLElement | null;
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      if (section.photos.findIndex((p) => p.id === activeIdRef.current) < 0) return;
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
            {snaps.length > 1 && (
              <div className={styles.dashes} role="tablist" aria-label={`${section.label} pages`}>
                {snaps.map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    className={`${styles.dash} ${i === selected ? styles.dash_active : ""}`}
                    onClick={() => embla?.scrollTo(i)}
                    aria-label={`Go to page ${i + 1}`}
                    aria-selected={i === selected}
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
