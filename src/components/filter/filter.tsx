import React, { useState, useEffect, ChangeEvent } from "react";
import { Container, ButtonGroup, Button, Box, TextField } from "@mui/material";
import List from "@components/event/list/list";
import Loading from "../../app/loading";
import TagSelect from "@components/tag/tagSelect";
import Event from "@interfaces/event";
import Tag from "@interfaces/tag";
import { SelectChangeEvent } from "@mui/material/Select";
import { useRouter } from "next/navigation";
import Route from "@enums/routes.enum";

interface FilterProps {
    apiUrl: string;
    showValidationFilter: boolean;
}

type Validation = "all" | "validated" | "notValidated";

export default function Filter({ apiUrl, showValidationFilter }: FilterProps) {
    const [events, setEvents] = useState<Event[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [filterText, setFilterText] = useState("");
    const [loadingEvents, setLoadingEvents] = useState(true);
    const [loadingTags, setLoadingTags] = useState(true);
    const [validationFilter, setValidationFilter] = useState<Validation>("all");
    const router = useRouter();
    useEffect(() => {
        fetch(`${apiUrl}`)
            .then((response) => {
                if (response.status === 401) {
                    router.push(Route.LOGIN);
                    return;
                }
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data && Array.isArray(data.data.events)) {
                    let validEvents;
                    if (showValidationFilter == true) {
                        validEvents = data.data.events;
                    } else {
                        validEvents = data.data.events.filter((event: Event) => event.isValid);
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
    }, [apiUrl, router, showValidationFilter]);

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

    const handleValidationFilterChange = (filter: Validation) => {
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
        return true;
    });

    return (
        <Box component="section">
            <Box component="article" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
                <Box maxWidth={300}>
                    <TextField
                        fullWidth
                        type="text"
                        placeholder="Filter Events"
                        value={filterText}
                        onChange={handleFilterChange}
                    />
                </Box>
                {showValidationFilter && (
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button
                            onClick={() => handleValidationFilterChange("all")}
                            variant={validationFilter === "all" ? "contained" : "outlined"}
                        >
                            Tous
                        </Button>
                        <Button
                            onClick={() => handleValidationFilterChange("validated")}
                            variant={validationFilter === "validated" ? "contained" : "outlined"}
                        >
                            Validé
                        </Button>
                        <Button
                            onClick={() => handleValidationFilterChange("notValidated")}
                            variant={validationFilter === "notValidated" ? "contained" : "outlined"}
                        >
                            À validé
                        </Button>
                    </ButtonGroup>
                )}
                <TagSelect
                    tags={tags}
                    selectedTags={selectedTags}
                    onTagChange={handleTagSelect}
                />
            </Box>
            <List events={filteredByValidation} />
        </Box>
    );
};