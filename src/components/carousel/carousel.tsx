import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./carousel.module.css";

const BASE_URL =
  "https://foad-photos{type}.s3.eu-west-2.amazonaws.com/{filename}";

const images = [
  "DSCF0637.jpg",
  "DSCF1115-2.jpg",
  "DSCF2079.jpg",
  "DSCF4749-2.jpg",
  "DSCF4821.jpg",
  "DSCF5283.jpg",
  "DSCF6354.jpg",
  "DSCF7549-2.jpg",
  "DSCF7908.jpg",
  "DSCF8059.jpg",
];

const srcFor = (type: "-hero" | "-thumbnails", filename: string) =>
  BASE_URL.replace("{type}", type).replace("{filename}", filename);

export const Carousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const [mainRef, mainApi] = useEmblaCarousel();
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi]
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    const index = mainApi.selectedScrollSnap();
    setSelectedIndex(index);
    setCanScrollPrev(mainApi.canScrollPrev());
    setCanScrollNext(mainApi.canScrollNext());
    thumbApi.scrollTo(index);
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on("select", onSelect).on("reInit", onSelect);
  }, [mainApi, onSelect]);

  return (
    <section
      className={styles.carousel_container}
      aria-labelledby="photos-heading"
    >
      <h2 id="photos-heading" className={styles.carousel_title}>
        My Favourite Photos
      </h2>

      <div className={styles.viewport} ref={mainRef}>
        <div className={styles.track}>
          {images.map((img, index) => (
            <div className={styles.slide} key={img}>
              <img
                className={styles.selected_image}
                src={srcFor("-hero", img)}
                alt={`Photograph ${index + 1} of ${images.length}`}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.carousel}>
        <button
          type="button"
          className={styles.carousel_arrow_left}
          onClick={() => mainApi?.scrollPrev()}
          disabled={!canScrollPrev}
          aria-label="Previous photo"
        >
          <ChevronLeft size={32} />
        </button>

        <div className={styles.thumb_viewport} ref={thumbRef}>
          <div className={styles.thumb_track}>
            {images.map((img, index) => (
              <button
                type="button"
                key={img}
                className={[
                  styles.image_container,
                  index === selectedIndex ? styles.selected : "",
                ].join(" ")}
                onClick={() => onThumbClick(index)}
                aria-label={`Show photograph ${index + 1}`}
                aria-current={index === selectedIndex}
              >
                <img
                  className={styles.image}
                  src={srcFor("-thumbnails", img)}
                  alt=""
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={styles.carousel_arrow_right}
          onClick={() => mainApi?.scrollNext()}
          disabled={!canScrollNext}
          aria-label="Next photo"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </section>
  );
};
