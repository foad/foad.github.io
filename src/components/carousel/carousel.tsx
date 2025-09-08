import { useState, useRef, useEffect } from "react";
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

export const Carousel = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const carouselRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isDragging = useRef(false);
  const startPos = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const item = itemRefs.current[selectedImageIndex];
    const carousel = carouselRef.current;

    if (item && carousel && !isDragging.current) {
      const carouselCenter = carousel.offsetWidth / 2;
      const itemCenter = item.offsetWidth / 2;
      const scrollPosition = item.offsetLeft - carouselCenter + itemCenter;

      carousel.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }

    setShowLeftArrow(selectedImageIndex > 0);
    setShowRightArrow(selectedImageIndex < images.length - 1);
  }, [selectedImageIndex]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!carouselRef.current) return;
    isDragging.current = true;
    const startX = "touches" in e ? e.touches[0].pageX : e.pageX;
    startPos.current = startX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const currentX = "touches" in e ? e.touches[0].pageX : e.pageX;
    const x = currentX - carouselRef.current.offsetLeft;
    const walk = (x - startPos.current) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    const carousel = carouselRef.current;
    if (!carousel) return;

    const viewportCenter = carousel.scrollLeft + carousel.offsetWidth / 2;
    let closestIndex = -1;
    let minDistance = Infinity;

    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const distance = Math.abs(viewportCenter - itemCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== -1) {
      setSelectedImageIndex(closestIndex);
    }
  };

  const handleArrowClick = (direction: "left" | "right") => {
    if (direction === "left") {
      setSelectedImageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else {
      setSelectedImageIndex((prevIndex) =>
        Math.min(prevIndex + 1, images.length - 1)
      );
    }
  };

  return (
    <div className={styles.carousel_container}>
      <h2 className={styles.carousel_title}>My Favourite Photos</h2>
      <div className={styles.selected_image_container}>
        <img
          className={styles.selected_image}
          src={BASE_URL.replace("{type}", "-hero").replace(
            "{filename}",
            images[selectedImageIndex]
          )}
          alt="Selected Carousel Image"
          loading="lazy"
        />
      </div>
      <div className={styles.carousel}>
        <div
          className={`${styles.carousel_arrow_left} ${
            !showLeftArrow ? styles.hidden : ""
          }`}
          onClick={() => handleArrowClick("left")}
        >
          <ChevronLeft size={32} />
        </div>
        <div
          ref={carouselRef}
          className={styles.carousel_images}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {images.map((img, index) => (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              className={[
                styles.image_container,
                index === selectedImageIndex ? styles.selected : "",
              ].join(" ")}
              onClick={() => {
                if (!isDragging.current) {
                  setSelectedImageIndex(index);
                }
              }}
            >
              <img
                className={styles.image}
                src={BASE_URL.replace("{type}", "-thumbnails").replace(
                  "{filename}",
                  img
                )}
                alt="Carousel Thumbnail"
                loading="lazy"
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
          ))}
        </div>
        <div
          className={`${styles.carousel_arrow_right} ${
            !showRightArrow ? styles.hidden : ""
          }`}
          onClick={() => handleArrowClick("right")}
        >
          <ChevronRight size={32} />
        </div>
      </div>
    </div>
  );
};
