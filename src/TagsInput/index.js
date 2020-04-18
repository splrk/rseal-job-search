import React, { useContext } from 'react';
import { TagsContext } from '../TagsStore';
import TagsInput from './TagsInput';

const TagsInputWithContext = ({ value, onChange, ...props }) => {
    const { tags, addTag, updateTag, deleteTag } = useContext(TagsContext);

    return (
        <TagsInput
            value={value}
            onChange={onChange}
            availableTags={tags}
            onAddTag={addTag}
            onChangeTagColor={updateTag}
            onDeleteTag={deleteTag}
            {...props}
        />
    );
};

export default TagsInputWithContext;
