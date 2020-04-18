import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    red: {
        backgroundColor: 'red'
    },
    default: {

    },
    green: {
        backgroundColor: 'green'
    },
    blue: {
        backgroundColor: 'blue'
    }
}));

const TagsInput = ({
    id,
    value: values,
    onChange,
    availableTags,
    onAddTag,
    onChangeTagColor,
    size
}) => {
    const classes = useStyles();

    console.log(values, availableTags);

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
            options={availableTags.map(([tag]) => tag)}
            value={values}
            freeSolo
            onChange={onUpdateTags}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                    const color = availableTags[index] ? availableTags[index][1] : 'default';
                    return (
                        <Chip size={size} label={option} className={classes[color]} {...getTagProps({ index })} />
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
