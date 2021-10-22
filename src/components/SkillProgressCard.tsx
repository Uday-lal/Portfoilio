import React from "react";
import Card from "./Card";

function SkillProgressCard(props: any) {
  return (
    <React.Fragment>
      <Card width="100%">
        <img src={props.img} alt="tool-img" />
        <span className="tool-title">{props.title}</span>
      </Card>
    </React.Fragment>
  );
}

export default SkillProgressCard;
