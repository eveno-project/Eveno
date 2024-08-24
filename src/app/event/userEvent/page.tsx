"use client"

import React from "react";
import Filter from "@components/filter/filter";

const Main = () => {
    return <Filter apiUrl="/api/users/event/myEvent" showValidationFilter={true} />;
};

export default Main;
