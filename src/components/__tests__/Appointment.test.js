import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "../Appointment"
import {getAppointmentsForDay, getInterviewersForDay, getInterview} from "helpers/selectors"

afterEach(cleanup);


describe("Appointment", () => {
  
  it("renders without crashing", () => {
    render(<Appointment />);
  });

})
