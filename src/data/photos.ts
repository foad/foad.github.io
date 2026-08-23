import photosData from "./photos.json";

export type PhotoSettings = {
  camera: string | null;
  lens: string | null;
  focalLength: number | null;
  focalLength35: number | null;
  aperture: number | null;
  shutter: string | null;
  iso: number | null;
  takenAt: string | null;
};

export type Photo = {
  id: string;
  section: string;
  order: number;
  title: string;
  location: string;
  description: string;
  featured: boolean;
  tags: string[];
  width: number | null;
  height: number | null;
  aspect: number | null;
  settings: PhotoSettings;
};

export type Section = {
  id: string;
  label: string;
  photos: Photo[];
};

export const photos = photosData as unknown as Photo[];

const HERO_BASE = "https://foad-photos-hero.s3.eu-west-2.amazonaws.com/";
const THUMB_BASE = "https://foad-photos-thumbnails.s3.eu-west-2.amazonaws.com/";

export const heroUrl = (photo: Photo) => HERO_BASE + photo.id;
export const thumbUrl = (photo: Photo) => THUMB_BASE + photo.id;

export const SECTIONS: { id: string; label: string }[] = [
  { id: "nature", label: "Nature" },
  { id: "urban", label: "Urban" },
  { id: "people", label: "People" },
];

const orderKey = (order: number) => (order < 0 ? Infinity : order);

export const sortPhotos = (list: Photo[]) =>
  [...list].sort((a, b) => {
    const delta = orderKey(a.order) - orderKey(b.order);
    return delta !== 0 ? delta : a.id.localeCompare(b.id);
  });

export const photosBySection = (section: string) =>
  sortPhotos(photos.filter((photo) => photo.section === section));

export const sectionsWithPhotos = (): Section[] =>
  SECTIONS.map((section) => ({
    ...section,
    photos: photosBySection(section.id),
  })).filter((section) => section.photos.length > 0);

export const featuredPhoto = (): Photo | undefined => {
  const flagged = sortPhotos(photos.filter((photo) => photo.featured));
  if (flagged.length) return flagged[0];
  const [first] = sectionsWithPhotos();
  return first?.photos[0] ?? photos[0];
};

export const aspectOf = (photo: Photo) =>
  photo.aspect && photo.aspect > 0
    ? photo.aspect
    : photo.width && photo.height
      ? photo.width / photo.height
      : 1.5;

export const exifLine = (photo: Photo): string => {
  const s = photo.settings;
  const parts = [
    s.aperture != null ? `ƒ/${s.aperture}` : null,
    s.shutter ? `${s.shutter}s` : null,
    s.iso != null ? `ISO ${s.iso}` : null,
    s.focalLength != null ? `${s.focalLength}mm` : null,
  ].filter(Boolean);
  return parts.join("  ·  ");
};
