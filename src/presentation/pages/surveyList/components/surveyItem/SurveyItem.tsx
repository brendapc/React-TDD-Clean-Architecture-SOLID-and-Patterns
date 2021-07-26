import React from "react";
import Styles from "./surveyItem.styles.scss";
import { IconName, ThumbsIcons } from "@/presentation/components/utils";
import { ISurveyModel } from "@/domain/models";

type Props = {
  survey: ISurveyModel;
};
export const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <ThumbsIcons
          className={Styles.iconWrapper}
          iconName={IconName.thumbsUp}
        />
        <time>
          <span className={Styles.day}>05</span>
          <span className={Styles.month}>07</span>
          <span className={Styles.year}>2021</span>
        </time>
        <p>Qual é seu framework preferido?</p>
      </div>
      <footer>Ver resultado</footer>
    </li>
  );
};
