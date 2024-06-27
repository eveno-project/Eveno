import EventList from "@components/event/list/list";
import { getByUserEmail } from "@services/event";
import { authOptions } from "@lib/auth";
import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await getServerSession(authOptions);
    const events = await getByUserEmail(session.user.email);

    if (!session) {
        redirect("/");
    }

    return (
        <div>
            <EventList events={events} />
        </div>
    );
}