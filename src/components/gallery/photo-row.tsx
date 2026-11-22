import { type Photo, type Section } from "../../data/photos";
import { PhotoRail } from "../photo/photo-rail";
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
  return (
    <section
      className={styles.row}
      id={section.id}
      aria-labelledby={`row-${section.id}`}
    >
      <PhotoRail
        photos={section.photos}
        activeId={activeId}
        lightboxOpen={lightboxOpen}
        label={section.label}
        headingId={`row-${section.id}`}
        onPick={onPick}
        onAutoSelect={onAutoSelect}
      />
    </section>
  );
};
