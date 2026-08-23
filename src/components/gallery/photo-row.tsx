import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { thumbUrl, aspectOf, type Photo, type Section } from "../../data/photos";
import styles from "./gallery.module.css";

type PhotoRowProps = {
  section: Section;
  activeId?: string;
  onPick: (photo: Photo) => void;
  onAutoSelect: (photo: Photo) => void;
};

export const PhotoRow = ({
  section,
  activeId,
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
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = useCallback((api: EmblaCarouselType) => {
    setSelected(api.selectedScrollSnap());
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
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

  const activeIdRef = useRef(activeId);
  activeIdRef.current = activeId;

  useEffect(() => {
    if (!embla) return;
    const keepActiveVisible = () => {
      const id = activeIdRef.current;
      const activeIndex = section.photos.findIndex((p) => p.id === id);
      if (activeIndex < 0) return;
      const inView = embla.slidesInView();
      if (inView.length === 0 || inView.includes(activeIndex)) return;
      const firstVisible = section.photos[inView[0]];
      if (firstVisible && firstVisible.id !== id) onAutoSelect(firstVisible);
    };
    embla.on("scroll", keepActiveVisible).on("select", keepActiveVisible);
    return () => {
      embla.off("scroll", keepActiveVisible).off("select", keepActiveVisible);
    };
  }, [embla, section.photos, onAutoSelect]);

  const scrollable = snaps.length > 1;

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
        {scrollable && (
          <div className={styles.row_controls}>
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
            <button
              type="button"
              className={styles.row_arrow}
              onClick={() => embla?.scrollPrev()}
              disabled={!canPrev}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className={styles.row_arrow}
              onClick={() => embla?.scrollNext()}
              disabled={!canNext}
              aria-label="Scroll right"
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
