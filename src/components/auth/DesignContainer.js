import React, { useState } from "react";
import classes from "./DesignContainer.module.scss";
import Image from "next/legacy/image";
import LeftArrow from "../svg/LeftArrow";
import RightArrow from "../svg/RightArrow";
import shortid from "shortid";

const textContent = [
  {
    heading: "Welcome to the future of online learning.",
    text: "Our Classroom Website is the fastest, simplest, and most effective way to teach and learn.",
  },

  {
    heading: "Ready to revolutionize your education?",
    text: "Technology is the ultimate tool for students, teachers, and anyone who wants to improve their skills at IRPCT.",
  },

  {
    heading: "Looking for an LMS that's fast, user-friendly, and effective?",
    text: "Look no further than our one-line solution. Our LMS is the ultimate tool for modern learning.",
  },

  {
    heading: "Tired of complicated, bloated learning management systems?",
    text: "Our LMS is the streamlined solution you've been looking for.",
  },
];

const DesignContainer = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [clickedButtonDirection, setClickedButtonDirection] =
    useState("initial");

  const slideLeft = () => {
    setSelectedIndex(
      (prev) => (prev - 1 + textContent.length) % textContent.length
    );
    setClickedButtonDirection("left");
  };

  const slideRight = () => {
    setSelectedIndex((prev) => (prev + 1) % textContent.length);
    setClickedButtonDirection("right");
  };

  const getRandomKey = () => {
    return shortid.generate();
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <div className={classes.emoticons}></div>

        <div className={classes["slider"]}>
          <div
            key={getRandomKey()}
            className={[
              classes.content,
              classes[`animate-${clickedButtonDirection}`],
            ].join(" ")}
          >
            <h2 className={classes["content_heading"]}>
              {textContent[selectedIndex].heading}
            </h2>
            <p className={classes["content_text"]}>
              {textContent[selectedIndex].text}
            </p>
          </div>

          <div className={classes["action_btns"]}>
            <button onClick={slideLeft}>
              <LeftArrow className={classes.arrow} />
            </button>
            <button onClick={slideRight}>
              <RightArrow className={classes.arrow} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignContainer;
