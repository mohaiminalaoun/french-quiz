import React from "react";
import {useState, useEffect} from "react";
import styles from "./Quiz.module.css"; // Import css modules stylesheet as styles
import {Accents} from "../enums/accents.enum";
import PictureQuestion from "./PictureQuestion"
import Questions from './../questions/questions.json';
const ACCENT: any = Accents;

function Quiz() {
    const LINE_BREAK = "%0D%0A";
    const [answers, setAnswers] = useState([""]);
    const [questions, setQuestions] = useState([{text: ""}]);
    const [showAccents, setShowAccents] = useState(false);
    const btnClass = "btn btn-light p-1 pr-2 pl-2 mr-2 mb-2";
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
        setQuestions(Questions);
        setAnswers(Questions.map(() => ""));
    }, []);

    const addAccent = (accent: string, questionIndex: number): void => {
        let curAns = [...answers];
        curAns[questionIndex] = curAns[questionIndex] ? curAns[questionIndex] += accent : accent;
        setAnswers(curAns);
    };
    const toggleAccents = (): void => {
        setShowAccents(!showAccents);
    };

    return (
        <div className={styles.container}>
            <div className={styles.toggleAccent}>
                <div>Review</div>
                <div><span className={`${styles.accentText}`}>Show Accent Buttons</span>
                <label className={`${styles.switch}`}>
                    <input type="checkbox"></input>
                    <span className={`${styles.slider} ${styles.round}`}  onClick={toggleAccents}></span>
                </label></div>
            </div>

            {questions.map((question: any, index: number) => {
                return !question.url ? (
                    <div key={index} className={styles.questionContainer}>
                        <div className={styles.question}>
                            {index + 1}. {question.text}
                        </div>
                        {Object.keys(ACCENT).map(k => showAccents ?
                            <button className={btnClass} key={k}
                                    onClick={() => addAccent(ACCENT[k], index)}>{ACCENT[k]}</button> : null)}
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  {`R${ACCENT.e1}ponse`}
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
                ) : (<div key={index} className={styles.questionContainer}>
                        <PictureQuestion text={`${index+1}. ${question.text}`}
                                         value={answers[index]}
                                         changeFn={(e: any) => changeInput(e, index)}
                                         imgUrl={question.url}>
                            {Object.keys(ACCENT).map(k => showAccents ?
                                <button className={btnClass} key={k}
                                        onClick={() => addAccent(ACCENT[k], index)}>{ACCENT[k]}</button> : null)}
                        </PictureQuestion>
                </div>);
            })}
            <a
                className={`btn btn-primary ${styles.emailBtn}`}
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
