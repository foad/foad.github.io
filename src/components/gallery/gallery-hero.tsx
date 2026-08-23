import { heroUrl, exifLine, type Photo } from "../../data/photos";
import styles from "./gallery.module.css";

const formatDate = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

type GalleryHeroProps = {
  photo: Photo;
  onOpen: () => void;
};

export const GalleryHero = ({ photo, onOpen }: GalleryHeroProps) => {
  const s = photo.settings;
  const settings = exifLine(photo);

  return (
    <section className={styles.hero} aria-label="Featured photograph">
      <button
        type="button"
        className={styles.hero_image_btn}
        onClick={onOpen}
        aria-label={`Open ${photo.title || "photograph"} full screen`}
      >
        <img
          className={styles.hero_image}
          src={heroUrl(photo)}
          alt={photo.title || "Featured photograph"}
        />
      </button>

      <div className={styles.hero_details}>
        {photo.title && <h2 className={styles.hero_title}>{photo.title}</h2>}
        {photo.location && (
          <p className={styles.hero_location}>{photo.location}</p>
        )}
        {photo.description && (
          <p className={styles.hero_desc}>{photo.description}</p>
        )}
        <dl className={styles.exif}>
          {s.camera && (
            <div>
              <dt>Camera</dt>
              <dd>{s.camera}</dd>
            </div>
          )}
          {s.lens && (
            <div>
              <dt>Lens</dt>
              <dd>{s.lens}</dd>
            </div>
          )}
          {settings && (
            <div>
              <dt>Settings</dt>
              <dd>{settings}</dd>
            </div>
          )}
          {s.takenAt && (
            <div>
              <dt>Taken</dt>
              <dd>{formatDate(s.takenAt)}</dd>
            </div>
          )}
        </dl>
        <button type="button" className={styles.hero_view} onClick={onOpen}>
          View full size
        </button>
      </div>
    </section>
  );
};
