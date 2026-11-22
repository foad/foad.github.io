import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import {
  favouritePhotos,
  heroUrl,
  exifLine,
  type Photo,
} from "../../data/photos";
import { PhotoHero } from "../photo/photo-hero";
import { PhotoRail } from "../photo/photo-rail";
import styles from "./favourites.module.css";

export const Favourites = () => {
  const favourites = useMemo(() => favouritePhotos(), []);
  const [active, setActive] = useState<Photo | undefined>(favourites[0]);
  const [index, setIndex] = useState(-1);

  const slides = useMemo(
    () =>
      favourites.map((photo) => ({
        src: heroUrl(photo),
        title: photo.title || undefined,
        description:
          [photo.location, photo.description, exifLine(photo)]
            .filter(Boolean)
            .join("  ·  ") || undefined,
        width: photo.width ?? undefined,
        height: photo.height ?? undefined,
      })),
    [favourites],
  );

  if (!favourites.length) return null;

  const openLightbox = () => {
    if (!active) return;
    setIndex(favourites.findIndex((p) => p.id === active.id));
  };

  return (
    <section className={styles.fav} aria-labelledby="favourites-heading">
      <div className={styles.fav_inner}>
        <h2 id="favourites-heading" className={styles.fav_title}>
          My Favourite Photos
          <Link to="/photography" className={styles.fav_cta}>
            View my portfolio
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </h2>

        {active && <PhotoHero photo={active} onOpen={openLightbox} />}

        <PhotoRail
          photos={favourites}
          activeId={active?.id}
          lightboxOpen={index >= 0}
          keyboard={false}
          onPick={setActive}
          onAutoSelect={setActive}
        />
      </div>

      <Lightbox
        open={index >= 0}
        index={Math.max(index, 0)}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Captions]}
        captions={{ descriptionTextAlign: "start" }}
      />
    </section>
  );
};
