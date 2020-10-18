import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import MqttStatus from 'components/MqttStatus';

const useStyles = makeStyles((theme) => ({
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
                <Typography variant="h6" className={classes.title}>
                    {process.env.REACT_APP_WEBSITE_NAME}
                </Typography>
                <MqttStatus></MqttStatus>
                <FormControlLabel
                    control={<Switch checked={hidden} onChange={handleHiddenChange} color="secondary" />}
                    label="Hide Button"
                />
            </Toolbar>
        </AppBar>
    )
}
