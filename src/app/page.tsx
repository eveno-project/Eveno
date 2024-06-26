import List from "@components/event/list/list";
import { Container } from "@mui/material";
import { getAll, getPaginate } from "@services/event";
import { Suspense } from "react";
import Loading from "./event/[id]/loading";

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
