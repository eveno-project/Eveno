"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { Container } from "@mui/material";
import List from "@components/event/list/list";
import Loading from "./loading";
import style from "./page.module.css";
import Event from "@interfaces/event";
import Tag from "@interfaces/tag";
import TagSelect from "@components/tag/tagSelect";
import { SelectChangeEvent } from "@mui/material/Select";

const Main = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filterText, setFilterText] = useState("");
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingTags, setLoadingTags] = useState(true);

  useEffect(() => {
    fetch("/api/event")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          const validEvents = data.data.filter((event: Event) => event.isValid);
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
  }, []);

  useEffect(() => {
    fetch("/api/tag")
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
  }, []);

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const handleTagSelect = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedTags(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  if (loadingEvents || loadingTags) {
    return <Loading />;
  }

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(filterText.toLowerCase())
  );

  const filteredByTags = selectedTags.length
    ? filteredEvents.filter((event) => selectedTags.every((tag) => event.tags.some((et) => et.name === tag)))
    : filteredEvents;

  return (
    <Container maxWidth="md">
      <input
        type="text"
        placeholder="Filter Events"
        value={filterText}
        onChange={handleFilterChange}
        className={style.navbar__searchbar}
      />
      <TagSelect
        tags={tags}
        selectedTags={selectedTags}
        onTagChange={handleTagSelect}
      />
      <List events={filteredByTags} />
    </Container>
  );
};

export default Main;
