import React from "react";
import "../styles/languages.css";

interface Languages {
  languageName: string;
  amount: number;
}

interface LanguagesProgressProps {
  languages: Languages[];
}

function LanguageProgress(props: LanguagesProgressProps) {
  const countWidth = (currWidth: number) => {
    let totalSum: number = 0;
    props.languages.map((language) => {
      totalSum += language.amount;
    });
    const width = (currWidth / totalSum) * 100;
    return Math.round(width);
  };
  return (
    <React.Fragment>
      <div
        className="language-progress"
        style={{ width: "100%", display: "flex" }}
      >
        {props.languages.map((language) => (
          <div
            className={`language-progress-bar ${language.languageName}`}
            style={{
              width: `${countWidth(language.amount)}%`,
              height: "12px",
            }}
          ></div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default LanguageProgress;
