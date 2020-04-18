import React, { useState, useEffect } from 'react';

const TagsContext = React.createContext(new Map());

const TagsProvider = ({ cache, children }) => {
    const [tags, setTags] = useState(new Map(cache.value));

    useEffect(() => {
        console.log('Caching', Array.from(tags.entries()));
        cache.updateValue(Array.from(tags.entries()));
    }, [tags, cache]);

    const updateTag = (tag, color) => {
        const newTags = new Map(tags.entries());
        newTags.set(tag, 'default');
        setTags(newTags); 
    }

    const addTag = (tag) => updateTag(tag, 'default');

    const deleteTag = (tag) => {
        const newTags = new Map(tags.entries());
        newTags.delete(tag);
        setTags(newTags);
    }

    return (
        <TagsContext.Provider value={{ tags, addTag, updateTag, deleteTag }}>
            {children}
        </TagsContext.Provider>
    );
};

export { TagsContext, TagsProvider };
