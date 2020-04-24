import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import TableHead from '@material-ui/core/TableHead';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { format, parseISO } from 'date-fns';
import ResponseTypes from '../JobStore/ResponseTypes';

const ResponseSelect = (props) => (
    <Select {...props}>
        {Object.values(ResponseTypes).map(type => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
        ))}
    </Select>
);

const ResponsesForm = ({ responses = [], onChange }) => {
    const [newRespose, setNewResponse] = useState();
    const [newDate, setNewDate] = useState(new Date());
    console.log(responses);

    const updateResponse = (value, index) => {
        onChange([
            ...responses.splice(0, index),
            value,
            ...responses.splice(index + 1)
        ])
    };

    const updateResponseType = (value, index) => {
        const newValue = responses[index];
        newValue.response = value;
        updateResponse(newValue, index);
    };

    const updateResponseDate = (value, index) => {
        const newValue = responses[index];
        newValue.date = value;
        updateResponse(newValue, index);
    };

    const addResponse = () => {
        console.log(onChange, newRespose, newDate);
        onChange([
            ...responses,
            { response: newRespose, date: newDate } 
        ])
    };

    const removeResponse = event => {
        const index = event.target.dataset.index;
        console.log(event.target);
        onChange([
            ...responses.splice(0, index),
            ...responses.splice(index + 1)
        ]);
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Response</TableCell>
                    <TableCell>Date</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {responses && responses.map(({ response, date }, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <IconButton data-index={index} onClick={removeResponse}>
                                <DeleteForeverIcon data-index={index} />
                            </IconButton>
                        </TableCell>
                        <TableCell> 
                            <ResponseSelect
                                onChange={event => updateResponseType(event.target.value, index)}
                                value={response}
                            />
                        </TableCell>
                        <TableCell>
                            <InputBase
                                type="date"
                                value={format(date, 'yyyy-MM-dd')}
                                onChange={(event) => updateResponseDate(parseISO(event.target.value), index)}
                            />
                        </TableCell>
                    </TableRow>
                ))}
                <TableRow>
                    <TableCell>
                        <IconButton onClick={addResponse}>
                            <AddIcon />
                        </IconButton>
                    </TableCell>
                    <TableCell> 
                        <ResponseSelect
                            onChange={event => setNewResponse(event.target.value)}
                            value={newRespose}
                        />
                    </TableCell>
                    <TableCell>
                        <InputBase
                            type="date"
                            value={format(newDate, 'yyyy-MM-dd')}
                            onChange={(event) => setNewDate(parseISO(event.target.value))}
                        />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
};

export default ResponsesForm;
