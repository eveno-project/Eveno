import React, { useState, useEffect, ChangeEvent } from "react";
import { Container, ButtonGroup, Button } from "@mui/material";
import List from "@components/event/list/list";
import Loading from "../../app/loading";
import TagSelect from "@components/tag/tagSelect";
import Event from "@interfaces/event";
import Tag from "@interfaces/tag";
import { SelectChangeEvent } from "@mui/material/Select";
import style from "./filter.module.css";
import { useRouter } from "next/navigation";

interface FilterProps {
    apiUrl: string;
    showValidationFilter: boolean;
}

export default function Filter({ apiUrl, showValidationFilter }: FilterProps) {
    const [events, setEvents] = useState<Event[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [filterText, setFilterText] = useState("");
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [loadingTags, setLoadingTags] = useState(true);
    const [validationFilter, setValidationFilter] = useState<"all" | "validated" | "notValidated">("all");
    const router = useRouter();
    useEffect(() => {
        fetch(`${apiUrl}`)
            .then((response) => {
                console.log("la rseponce : ", response);
                if (response.status === 401) {
                    router.push("/login");
                    return;
                }
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data && Array.isArray(data.data)) {
                    let validEvents;
                    if (showValidationFilter == true) {
                        validEvents = data.data;
                    } else {
                        validEvents = data.data.filter((event: Event) => event.isValid);
                    }
                    setEvents(validEvents);
                } else {
                    throw new Error("Fetched data is not an array");
                }
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
            })
            .finally(() => {
                setLoadingEvents(false);
            });
    }, [apiUrl]);

    useEffect(() => {
        fetch(`/api/tag`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data && Array.isArray(data.data)) {
                    setTags(data.data);
                } else {
                    throw new Error("Fetched data is not an array");
                }
            })
            .catch((error) => {
                console.error("Error fetching tags:", error);
            })
            .finally(() => {
                setLoadingTags(false);
            });
    }, [apiUrl]);

    const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFilterText(event.target.value);
    };

    const handleTagSelect = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        setSelectedTags(
            typeof value === "string" ? value.split(",") : value
        );
    };

    const handleValidationFilterChange = (filter: "all" | "validated" | "notValidated") => {
        setValidationFilter(filter);
    };

    if (loadingEvents || loadingTags) {
        return <Loading />;
    }

    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(filterText.toLowerCase())
    );

    const filteredByTags = selectedTags.length
        ? filteredEvents.filter((event) =>
            selectedTags.every((tag) => event.tags.some((et) => et.name === tag))
        )
        : filteredEvents;

    const filteredByValidation = filteredByTags.filter((event) => {
        if (validationFilter === "validated") return event.isValid;
        if (validationFilter === "notValidated") return !event.isValid;
        return true; // "all"
    });

    return (
        <Container maxWidth="md">
            <input
                type="text"
                placeholder="Filter Events"
                value={filterText}
                onChange={handleFilterChange}
                className={style.navbar__searchbar}
            />
            {showValidationFilter && (
                <ButtonGroup variant="outlined" aria-label="outlined button group" className={style.validationButtons}>
                    <Button
                        onClick={() => handleValidationFilterChange("all")}
                        variant={validationFilter === "all" ? "contained" : "outlined"}
                    >
                        All
                    </Button>
                    <Button
                        onClick={() => handleValidationFilterChange("validated")}
                        variant={validationFilter === "validated" ? "contained" : "outlined"}
                    >
                        Validated
                    </Button>
                    <Button
                        onClick={() => handleValidationFilterChange("notValidated")}
                        variant={validationFilter === "notValidated" ? "contained" : "outlined"}
                    >
                        Not Validated
                    </Button>
                </ButtonGroup>
            )}
            <TagSelect
                tags={tags}
                selectedTags={selectedTags}
                onTagChange={handleTagSelect}
            />
            <List events={filteredByValidation} />
        </Container>
    );
};