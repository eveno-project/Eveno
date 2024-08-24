"use client"

import React from "react";
import Filter from "@components/filter/filter";

const Main = () => {
  return <Filter apiUrl="/api/event" showValidationFilter={false} />;
};

export default Main;
