import List from "@components/event/list/list";
import { Container } from "@mui/material";
import { getPaginate } from "@services/event";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Home() {
  const events = await getPaginate();
  return (
    <Container maxWidth="md">
      <Suspense fallback={<Loading />}>
        <List events={events} />
      </Suspense>
    </Container>
  );
}
