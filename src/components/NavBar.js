import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Switch from '@material-ui/core/Switch';

import MqttStatus from 'components/MqttStatus';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));

export default function NavBar(props) {
    const {
        hidden,
        onChange
    } = props;
    const classes = useStyles();

    
    const handleHiddenChange = (event) => {
        onChange(event.target.checked);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton> */}
                <Typography variant="h6" className={classes.title}>
                    {process.env.REACT_APP_WEBSITE_NAME}
                </Typography>
                <MqttStatus></MqttStatus>
                <FormControlLabel
                    control={<Switch checked={hidden} onChange={handleHiddenChange} color="primary" />}
                    label="Hide Button"
                />
                {/* <Button color="inherit">Login</Button> */}
            </Toolbar>
        </AppBar>
    )
}
