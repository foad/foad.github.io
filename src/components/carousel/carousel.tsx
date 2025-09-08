import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./carousel.module.css";

const BASE_URL =
  "https://foad-photos{type}.s3.eu-west-2.amazonaws.com/{filename}.jpg";

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
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);
  const [showGradientLeft, setShowGradientLeft] = useState(false);
  const [showGradientRight, setShowGradientRight] = useState(true);

  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startPos = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    isDragging.current = true;
    startPos.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeft.current = carouselRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startPos.current) * 1.5; // Adjust sensitivity
    carouselRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleArrowClick = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const itemWidth = 166;
      carouselRef.current.scrollBy({
        left: direction === "right" ? itemWidth : -itemWidth,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowGradientLeft(scrollLeft > 0);
      setShowGradientRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check

      return () => {
        carouselElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div className={styles.carousel_container}>
      <h2 className={styles.carousel_title}>My Favourite Photos</h2>
      <div className={styles.selected_image_container}>
        <img
          className={styles.selected_image}
          src={BASE_URL.replace("{type}", "-hero").replace(
            "{filename}",
            selectedImage.replace(".jpg", "")
          )}
          alt="Selected Carousel Image"
          loading="lazy"
        />
      </div>
      <div className={styles.carousel}>
        <div
          className={`${styles.carousel_arrow_left} ${
            !showGradientLeft ? styles.hidden : ""
          }`}
          onClick={() => handleArrowClick("left")}
        >
          <ChevronLeft size={32} />
        </div>
        <div
          ref={carouselRef}
          className={`${styles.carousel_images} ${
            showGradientLeft ? styles.show_gradient_left : ""
          } ${showGradientRight ? styles.show_gradient_right : ""}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {images.map((img, index) => (
            <div
              key={index}
              className={[
                styles.image_container,
                img === selectedImage ? styles.selected : "",
              ].join(" ")}
            >
              <img
                className={styles.image}
                src={BASE_URL.replace("{type}", "-thumbnails").replace(
                  "{filename}",
                  img.replace(".jpg", "")
                )}
                alt="Carousel Image"
                loading="lazy"
                onClick={() => setSelectedImage(img)}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
          ))}
        </div>
        <div
          className={`${styles.carousel_arrow_right} ${
            !showGradientRight ? styles.hidden : ""
          }`}
          onClick={() => handleArrowClick("right")}
        >
          <ChevronRight size={32} />
        </div>
      </div>
    </div>
  );
};
