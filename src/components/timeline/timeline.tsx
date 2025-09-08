import styles from "./timeline.module.css";

const timelineItems = [
  {
    date: "Sep 2024 - Present",
    title: "MSc Artificial Intelligence Student",
    subtitle: "University of Bath",
    description:
      "Part-time, focusing on machine learning, data science, and AI ethics.",
  },
  {
    date: "Feb 2024 - Present",
    title: "Lead Developer",
    subtitle: "Cambridge University Press & Assessment",
    description:
      "Developing innovative digital solutions with a focus on the safe use of modern AI techniques in the educational sector.",
  },
  {
    date: "Jan 2023 - Feb 2024",
    title: "Senior Developer",
    subtitle: "Sky UK",
    description:
      "Engineered the core streaming technologies that power Peacock, Sky Glass, and NOW, built to handle millions of concurrent users.",
  },
  {
    date: "Sep 2021 - Jan 2023",
    title: "Software Engineering Manager",
    subtitle: "Sky UK (NOW TV)",
    description:
      "Led the hiring and running of a team to release a new cross-platform app for Apple TV and Roku while still contributing as a senior engineer.",
  },
  {
    date: "Nov 2019 - Sep 2021",
    title: "Senior Software Developer",
    subtitle: "Sky UK (NOW TV)",
    description:
      "Contributed to the development and technical direction of NOW's streaming services, focusing on accessibility and pipeline reliability.",
  },
  {
    date: "Dec 2018 - Nov 2019",
    title: "Software Developer",
    subtitle: "Sky UK (NOW TV)",
    description:
      "Developed and maintained both frontend streaming platforms and backend payment gateways.",
  },
  {
    date: "Jul 2018 - Dec 2018",
    title: "Associate Software Developer",
    subtitle: "Sky UK",
    description: "Contributed to Smart TV applications and internal tools.",
  },
  {
    date: "Sep 2015 - Jul 2018",
    title: "BEng Computer Systems Engineering Student",
    subtitle: "University of Birmingham",
    description:
      "Studied a broad range of topics including software engineering, embedded systems and digital signal processing.",
  },
];

export const Timeline = () => {
  return (
    <div className={styles.timeline_section}>
      <h2 className={styles.section_title}>My Journey</h2>
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
                <p className={styles.timeline_description}>
                  {item.description}
                </p>
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
    </div>
  );
};
