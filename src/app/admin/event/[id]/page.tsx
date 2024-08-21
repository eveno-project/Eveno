"use client"
import { useEffect, useState } from "react";



const adminEventValidation = ({ params }: { params: { id: number } }) => {
    const [event, setEvent] = useState<Event | null>(null);

    useEffect(() => {
        fetch(`/api/event/${params.id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data && data.data) {
                    setEvent(data.data);
                } else {
                    throw new Error("Event data not found");
                }
            })
            .catch((error) => {
                console.error("Error fetching event:", error);
            });
    }, [params.id]);
}

export default adminEventValidation;