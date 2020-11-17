import React from "react";
import styles from "./PictureQuestion.module.css";
type PictureQuestionProps = {
    text: string;
    imgUrl: string;
    changeFn: any;
    value: string;
    children: any;
}
function PictureQuestion({text, imgUrl, changeFn, value, children}: PictureQuestionProps) {
    return (
        <div>
            <div className={styles.text}>{text}</div>
            <div className={styles.image}style={{backgroundImage: `url(${imgUrl})`}}></div>
            {children}
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                    Reponse
                </span>
                </div>
                <input
                    type="text"
                    className="form-control"
                    value={value}
                    onChange={changeFn}
                ></input>
            </div>
        </div>
    );
}

export default PictureQuestion;
