import { useEffect, useMemo, useState } from "react";
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
import { GalleryHero } from "../components/gallery/gallery-hero";
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

  useEffect(() => {
    document.body.classList.add("gallery-active");
    return () => document.body.classList.remove("gallery-active");
  }, []);

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

        {active && <GalleryHero photo={active} onOpen={openLightbox} />}
      </div>

      <div className={styles.rows}>
        {sections.map((section) => (
          <PhotoRow
            key={section.id}
            section={section}
            activeId={active?.id}
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
