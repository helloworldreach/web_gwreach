import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Switch from 'material-ui/Switch';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

import IconButton from 'material-ui/IconButton';
import CastIcon from 'material-ui-icons/Cast';
import ScreenShareIcon from 'material-ui-icons/ScreenShare';
import CallEndIcon from 'material-ui-icons/CallEnd';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import PersonIcon from 'material-ui-icons/Person';

const drawerWidth = 240;
const style = theme => ({
    drawerPaper: {
        position: 'relative',
        height: '100vh',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
});

const Sidebar = (props) => (
    <Drawer
        type="persistent"
        classes={{
            paper: props.classes.drawerPaper,
        }}
        anchor='left'
        open={props.drawerStatus}
    >
        <div className={props.classes.drawerInner}>
            <div className={props.classes.drawerHeader}>
                <IconButton
                    onClick={props.handleDrawerClose}
                >
                    {props.theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider />
            <ListItem>
                <ListItemIcon>
                    <CastIcon />
                </ListItemIcon>
                <ListItemText primary="Media server" />
                <ListItemSecondaryAction>
                    <Switch
                        checked={props.mediaServer}
                        onChange={props.handleMediaServer}
                    />
                </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <List dense>
                <ListItem>
                    <ListItemIcon>
                        <ScreenShareIcon />
                    </ListItemIcon>
                    <ListItemText primary="Share" />
                    <ListItemSecondaryAction>
                        <Switch
                            checked={!!props.local}
                            disabled={!props.room}
                            onChange={props.handleShare}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem
                    button
                    dense
                    disabled={props.streams.length === 0}
                >
                    <ListItemIcon>
                        <CallEndIcon />
                    </ListItemIcon>
                    <ListItemText primary="Hangup"/>
                </ListItem>
            </List>
            <Divider />
            <List dense>
                {props.streams.map((item) => {
                    return (
                        <ListItem key={item.uid}>
                            <Avatar>
                                <PersonIcon/>
                            </Avatar>
                            <ListItemText primary={`${item.from.name} - subscribe`}/>
                            <ListItemSecondaryAction>
                                <Switch
                                    checked={item.subscribed}
                                    onChange={() => {
                                        props.handleSubscribe(item.uid, item.subscribe);
                                    }}
                                    disabled={item.subscribed === 'subscribing'}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        </div>
    </Drawer>
);

Sidebar.propTypes = {
    streams: PropTypes.array.isRequired,
    room: PropTypes.string.isRequired,
    local: PropTypes.string.isRequired,
    mediaServer: PropTypes.bool.isRequired,
    drawerStatus: PropTypes.bool.isRequired,
    handleDrawerClose: PropTypes.func.isRequired,
    handleMediaServer: PropTypes.func.isRequired,
    handleShare: PropTypes.func.isRequired,
    handleSubscribe: PropTypes.func.isRequired
};

export default withStyles(style, { withTheme: true })(Sidebar);