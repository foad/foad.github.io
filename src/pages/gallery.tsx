import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import {
  sectionsWithPhotos,
  featuredPhoto,
  heroUrl,
  exifLine,
  type Photo,
} from "../data/photos";
import { PhotoHero } from "../components/photo/photo-hero";
import { PhotoRow } from "../components/gallery/photo-row";
import { Logo } from "../components/logo";
import styles from "../components/gallery/gallery.module.css";

export const Gallery = () => {
  const sections = useMemo(() => sectionsWithPhotos(), []);
  const featured = useMemo(() => featuredPhoto(), []);
  const allPhotos = useMemo(
    () => sections.flatMap((section) => section.photos),
    [sections]
  );
  const [active, setActive] = useState<Photo | undefined>(featured);
  const [index, setIndex] = useState(-1);

  const activeRef = useRef(active);
  activeRef.current = active;
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add("gallery-active");
    return () => document.body.classList.remove("gallery-active");
  }, []);

  // mobile only: focus a row's photo as soon as it becomes the centred row while scrolling
  useEffect(() => {
    const el = rowsRef.current;
    if (!el) return;
    let raf = 0;
    let lastIndex = -1;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!window.matchMedia("(max-width: 900px)").matches) return;
        const rect = el.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const rows = [...el.children].filter(
          (c) => c.tagName === "SECTION"
        ) as HTMLElement[];
        let best = -1;
        let bestDist = Infinity;
        rows.forEach((row, i) => {
          const r = row.getBoundingClientRect();
          const dist = Math.abs(r.top + r.height / 2 - mid);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        });
        if (best < 0 || best === lastIndex) return;
        lastIndex = best;
        const rowEl = rows[best];
        const viewport = rowEl.querySelector('[class*="row_viewport"]');
        const vpLeft = (viewport ?? rowEl).getBoundingClientRect().left;
        const tiles = [...rowEl.querySelectorAll("[data-id]")] as HTMLElement[];
        let chosen = tiles[0];
        let chosenLeft = Infinity;
        tiles.forEach((t) => {
          const l = t.getBoundingClientRect().left;
          if (l >= vpLeft - 4 && l < chosenLeft) {
            chosenLeft = l;
            chosen = t;
          }
        });
        const id = chosen?.getAttribute("data-id");
        const photo = id ? allPhotos.find((p) => p.id === id) : undefined;
        if (photo && photo.id !== activeRef.current?.id) {
          setActive(photo);
        }
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sections, allPhotos]);

  const slides = useMemo(
    () =>
      allPhotos.map((photo) => ({
        src: heroUrl(photo),
        title: photo.title || undefined,
        description:
          [photo.location, photo.description, exifLine(photo)]
            .filter(Boolean)
            .join("  ·  ") || undefined,
        width: photo.width ?? undefined,
        height: photo.height ?? undefined,
      })),
    [allPhotos]
  );

  const pickPhoto = (photo: Photo) => {
    setActive(photo);
    if (window.matchMedia("(min-width: 901px)").matches) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const openLightbox = () => {
    if (!active) return;
    setIndex(allPhotos.findIndex((p) => p.id === active.id));
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.top}>
        <header className={styles.header}>
          <div className={styles.header_left}>
            <Link to="/" className={styles.brand} aria-label="Back to home">
              <Logo height={26} />
            </Link>
            <span className={styles.header_divider} aria-hidden="true" />
            <h1 className={styles.page_title}>Photography</h1>
          </div>
        </header>

        {active && <PhotoHero photo={active} onOpen={openLightbox} />}
      </div>

      <div className={styles.rows} ref={rowsRef}>
        {sections.map((section) => (
          <PhotoRow
            key={section.id}
            section={section}
            activeId={active?.id}
            lightboxOpen={index >= 0}
            onPick={pickPhoto}
            onAutoSelect={setActive}
          />
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={Math.max(index, 0)}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Captions]}
        captions={{ descriptionTextAlign: "start" }}
      />
    </div>
  );
};
