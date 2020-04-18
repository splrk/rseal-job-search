import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import ColorTag from './ColorTag';

const TagsInput = ({
    id,
    value: values,
    onChange,
    availableTags,
    onAddTag,
    onChangeTagColor,
    size
}) => {
    const onUpdateTags = (event, value, reason) => {
        console.log(value, reason);
    
        switch (reason) {
        case 'create-option':
            onAddTag(value[value.length - 1]);
            onChange(value);
            break;
        case 'select-option':
        case 'remove-option':
            onChange(value);
            break;
        default:
            break;
        }
    }

    return (
        <Autocomplete
            multiple
            id={id}
            options={Array.from(availableTags.entries()).map(([tag]) => tag)}
            value={values}
            freeSolo
            onChange={onUpdateTags}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                    const color = availableTags.has(option) ? availableTags.get(option) : 'default';
                    return (
                        <ColorTag
                            size={size}
                            label={option}
                            color={color}
                            onChange={newColor => onChangeTagColor(option, newColor)}
                            { ...getTagProps({ index }) }
                        />
                    );
                })
            }
            renderInput={(params) => (
                <TextField {...params} placeholder="Tags" />
            )}
        />
    );
};

export default TagsInput;
