import styles from "./timeline.module.css";

const timelineItems = [
  {
    date: "Sep 2024 - Present",
    title: "MSc Artificial Intelligence Student",
    subtitle: "University of Bath",
    description:
      "Leading the development of innovative educational technologies and platforms to enhance learning experiences worldwide.",
  },
  {
    date: "Feb 2024 - Present",
    title: "Lead Developer",
    subtitle: "Cambridge University Press & Assessment",
    description:
      "Leading the development of innovative educational technologies and platforms to enhance learning experiences worldwide.",
  },
  {
    date: "Jan 2023 - Feb 2024",
    title: "Senior Developer",
    subtitle: "Sky UK",
    description:
      "Leading the development of innovative educational technologies and platforms to enhance learning experiences worldwide.",
  },
  {
    date: "Sep 2021 - Jan 2023",
    title: "Software Engineering Manager",
    subtitle: "NOW TV",
    description:
      "Leading the development of innovative educational technologies and platforms to enhance learning experiences worldwide.",
  },
  {
    date: "Nov 2019 - Sep 2021",
    title: "Senior Software Developer",
    subtitle: "NOW TV",
    description:
      "Leading the development of innovative educational technologies and platforms to enhance learning experiences worldwide.",
  },
  {
    date: "Dec 2018 - Nov 2019",
    title: "Software Developer",
    subtitle: "NOW TV",
    description:
      "Leading the development of innovative educational technologies and platforms to enhance learning experiences worldwide.",
  },
  {
    date: "Jul 2018 - Dec 2018",
    title: "Associate Software Developer",
    subtitle: "Sky UK",
    description:
      "Leading the development of innovative educational technologies and platforms to enhance learning experiences worldwide.",
  },
  {
    date: "Sep 2015 - Jul 2018",
    title: "BEng Computer Systems Engineering Student",
    subtitle: "University of Birmingham",
    description:
      "Leading the development of innovative educational technologies and platforms to enhance learning experiences worldwide.",
  },
];

export const Timeline = () => {
  return (
    <div className={styles.timeline_container}>
      {timelineItems.map((item, index) => {
        const renderItem = (isLeft: boolean) => (
          <div
            className={[
              styles.timeline_content,
              isLeft ? styles.left : styles.right,
            ].join(" ")}
          >
            <div className={styles.timeline_content_box}>
              <h3 className={styles.timeline_title}>{item.title}</h3>
              <h4 className={styles.timeline_subtitle}>{item.subtitle}</h4>
              <p className={styles.timeline_description}>{item.description}</p>
            </div>
          </div>
        );

        const renderDate = (isLeft: boolean) => (
          <div
            className={[
              styles.timeline_date,
              isLeft ? styles.left : styles.right,
            ].join(" ")}
          >
            {item.date}
          </div>
        );

        return (
          <div key={index} className={styles.timeline_item}>
            {index % 2 === 0 ? renderItem(true) : renderDate(true)}
            <div className={styles.timeline_bar}>
              <div className={styles.timeline_inner_circle}></div>
            </div>
            {index % 2 !== 0 ? renderItem(false) : renderDate(false)}
          </div>
        );
      })}
    </div>
  );
};
