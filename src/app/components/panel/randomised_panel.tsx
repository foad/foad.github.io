import { ReactNode } from "react";
import { Panel } from "./panel";
import { Title, TITLE_TYPE } from "@/app/components/title";
import { generateText } from "@/app/utils/text_gen";
import {
  Contour,
  Sunburst,
  BarGraphs,
  RadarGraph,
  Squares,
} from "@/app/components/visual";
import { Table } from "@/app/components/text";

export const RandomisedPanel = () => {
  const visual_items = [Contour, Sunburst, BarGraphs, RadarGraph, Squares];
  // const text_items = [Table];

  const shuffleArray = (array: ReactNode[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getRandomLetter = () =>
    String.fromCharCode(Math.floor(Math.random() * 26) + 65);

  const getRandomTitle = () => {
    const variant =
      Object.values(TITLE_TYPE)[
        Math.floor(Math.random() * Object.values(TITLE_TYPE).length)
      ];
    let text = "";
    switch (variant) {
      case TITLE_TYPE.main:
        text = generateText("{{component}} {{measurement}}");
        break;
      case TITLE_TYPE.secondary:
        text = generateText("{{component}} {{measurement}} 0{{number}}");
        break;
      case TITLE_TYPE.tertiary:
        text = generateText(`${getRandomLetter()}{{number}} {{component}}`);
        break;
    }
    return (
      <Title variant={variant} key={`title_${variant}_${text.substring(0, 5)}`}>
        {text}
      </Title>
    );
  };

  const generateRandomItems = () => {
    const items = [];

    const RandomVisual =
      visual_items[Math.floor(Math.random() * visual_items.length)];

    const randomText =
      Math.random() < 0.5 ? (
        <Table key="text_0" />
      ) : (
        <div key="text_0" className="text">
          {generateText("{{component}} {{measurement}}")}
        </div>
      );
    items.push(randomText);

    items.push(<RandomVisual key="visual_0" />);

    const shuffledItems = shuffleArray(items);
    const randomTitles = Array.from({ length: shuffledItems.length }, () =>
      getRandomTitle()
    );

    return randomTitles.map((k, i) => [k, shuffledItems[i]]).flat();
  };

  return <Panel>{generateRandomItems()}</Panel>;
};
