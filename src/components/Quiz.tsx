import React from "react";
import { useState, useEffect } from "react";
import styles from "./Quiz.module.css"; // Import css modules stylesheet as styles
const ACCENT = {
  e1: "\xE9",
  e2: "\xE8",
  c1: "\xE7",
  aHat: "\xE2",
};
function Quiz() {
  const LINE_BREAK = "%0D%0A";
  const [answers, setAnswers] = useState([""]);
  const [questions, setQuestions] = useState([""]);
  const SPACE = "%20";
  const changeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    let val = e.target.value;
    let curAns = [...answers];
    curAns[index] = val;
    setAnswers(curAns);
  };
  useEffect(() => {
    let questions = [
      `Comment t'appelles-tu?`,
      `Comment ${ACCENT.c1}a va?`,
      `Quel ${ACCENT.aHat}ge as-tu?`,
    ];
    setQuestions(questions);
    setAnswers(questions.map(() => ""));
  }, []);
  return (
    <div className={styles.container}>
      {questions.map((question: string, index: number) => {
        return (
          <div key={index} className={styles.questionContainer}>
            <div className={styles.question}>
              {index + 1}. {question}
            </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  {"R\xE9ponse"}
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                value={answers[index]}
                onChange={(e) => changeInput(e, index)}
              ></input>
            </div>
          </div>
        );
      })}

      <a
        className="btn btn-primary"
        onClick={() => {
          const emailAnswers = answers.join(LINE_BREAK);
          window.location.href = `mailto:mohaiminx@gmail.com?subject=Header&body=${emailAnswers}`;
        }}
      >
        Send Answers in Email
      </a>
    </div>
  );
}

export default Quiz;
