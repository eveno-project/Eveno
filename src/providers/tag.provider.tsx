'use client';
import { ReactNode, useContext, useEffect, useState } from "react";
import { TagContext } from "@contexts/tag.context";
import Tag from "@interfaces/tag";
import { ContinuousColorLegend } from "@mui/x-charts";


export default function TagProvider({ children }: { children: ReactNode }) {
    const [tags, setTags] = useState<Tag[]>([]);
    function setTag(newTag: Tag) {
        setTags((prevTags) => {
          const existingTagIndex = prevTags.findIndex(tag => tag.id === newTag.id);
          if (existingTagIndex !== -1) {
            return prevTags.map((tag, index) =>
                index === existingTagIndex ? newTag : tag
              );
          } else {
            return [...prevTags, newTag];
          }
        });
      };
    
      function deleteTag(id: number) {
        const remove = async () => {
            const response = await fetch(`/api/tag?id=${id}`, { method: 'DELETE' });
            if (response.ok) {
                const tagDeleted = (await response.json() as { data: Tag }).data;
                setTags((prevTags) => prevTags.filter(tag => tag.id !== tagDeleted.id));
            }
        }
        remove();
      };
    return (
        <TagContext.Provider value={{ tags, setTag, deleteTag }}>
            {children}
        </TagContext.Provider>
    );
}