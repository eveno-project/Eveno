import React from "react";
import Filter from "@components/filter/filter";
import { Container } from "@mui/material";

export default function Page() {
    return (
        <Container component="main" maxWidth="md">
            <Filter apiUrl="/api/user/event/follow" showValidationFilter={false} />
        </Container>
    );
};
