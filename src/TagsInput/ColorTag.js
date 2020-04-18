import React, { useRef, useState } from 'react';
import Chip from '@material-ui/core/Chip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import cx from 'classnames';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    red: {
        backgroundColor: red[500],
        color: 'white'
    },
    default: {
        backgroundColor: grey[300],
        color: 'black'
    },
    green: {
        backgroundColor: green[500],
        color: 'white'
    },
    blue: {
        backgroundColor: blue[500],
        color: 'white'
    },
    yellow: {
        backgroundColor: yellow[500],
        color: 'black'
    },
    circle: {
        borderRadius: '50%',
        height: '1em',
        width: '1em'
    }
}));

const ColorTag = ({ value, onChange, label, color, ...props }) => {
    const anchorEl = useRef(null);
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const changeColor = newColor => () => {
        setOpen(false);
        onChange(newColor);
    }

    return (
        <>
            <Chip
                label={label}
                classes={{ root: classes[color] }}
                onClick={() => setOpen(true)}
                ref={anchorEl}
                {...props}
             />
            <Menu
                keepMounted
                anchorEl={anchorEl.current}
                open={open}
                onClose={() => setOpen(false)}
            >
                <MenuItem onClick={changeColor('default')}>
                   <span className={cx(classes.circle, classes.default)} />
                   Default
                </MenuItem>
                <MenuItem onClick={changeColor('red')}>
                    <span className={cx(classes.circle, classes.red)} />
                    Red
                </MenuItem>
                <MenuItem onClick={changeColor('blue')}>
                    <span className={cx(classes.circle, classes.blue)} />
                    Blue
                </MenuItem>
                <MenuItem onClick={changeColor('green')}>
                    <span className={cx(classes.circle, classes.green)} />
                    Green
                </MenuItem>
                <MenuItem  onClick={changeColor('yellow')}>
                    <span className={cx(classes.circle, classes.yellow)} />
                    Yellow
                </MenuItem>
            </Menu>
        </>
    );
}

export default ColorTag;
