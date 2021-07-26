import React from "react";
import { render, screen } from "@testing-library/react";
import { SurveyItem } from "..";
import { mockSurveyModel } from "@/domain/mocks";
import { IconName } from "@/presentation/components/utils";

describe("SurveyItem Component", () => {
  test("should render with correct values", () => {
    const survey = mockSurveyModel();
    survey.didAnswer = true;
    render(<SurveyItem survey={survey} />);
    expect(screen.getByTestId("thumbs-icon")).toHaveProperty(
      "src",
      IconName.thumbsUp
    );
  });
});
