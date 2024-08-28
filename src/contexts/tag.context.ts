'use client';
import Tag from "@interfaces/tag";
import { createContext, useContext } from "react";

type TagContextType = {
    tags: Tag[];
    setTag: (newTag: Tag) => void;
    deleteTag: (id: number) => void;
  };

export const TagContext = createContext<TagContextType>({
    tags: [] as Tag[],
    setTag: (tag: Tag) => {},
    deleteTag: (id: number) => {}
});

export function useTag() {
    return useContext(TagContext);
}