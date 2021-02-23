import React from "react";
import axios from "axios";
import { render, cleanup, waitForElement, fireEvent, getByText, queryByText, queryByAltText, getAllByTestId, getByAltText, getByPlaceholderText, getByDisplayValue } from "@testing-library/react";

import Application from "components/Application";


import reducer from "reducers/application";

describe("Application Reducer", () => {

  it("throws an error with an unsupported type", () => {

    expect(() => reducer({}, { type: null })).toThrowError(
      /Tried to reduce with unsupported action type/i
    );

  })

})