import React, { useContext } from 'react';
import { TagsContext } from '../TagsStore';
import TagsInput from './TagsInput';

const TagsInputWithContext = ({ value, onChange, ...props }) => {
    const { tags, addTag, updateTag } = useContext(TagsContext);

    return (
        <TagsInput
            value={value}
            onChange={onChange}
            availableTags={Array.from(tags.entries())}
            onAddTag={addTag}
            onChangeTagColor={updateTag}
            {...props}
        />
    );
};

export default TagsInputWithContext;
