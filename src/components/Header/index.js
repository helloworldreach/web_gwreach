import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const drawerWidth = 240;

const styles = theme => ({
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    noButton: {
        marginLeft: 20
    },
    hide: {
        display: 'none',
    },
    appBar: {
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'appBarShift-left': {
        marginLeft: drawerWidth,
    },
});

const Header = (props) => (
    <AppBar
        className={classNames(props.classes.appBar, {
            [props.classes.appBarShift]: props.drawerStatus,
            [props.classes[`appBarShift-left`]]: props.drawerStatus,
        })}
    >
        <Toolbar disableGutters={!props.drawerStatus}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={props.openDrawer}
                className={classNames(props.classes.menuButton, {
                    [props.classes.hide]: props.drawerStatus || props.location.pathname === '/'
                })}
            >
                <MenuIcon />
            </IconButton>
            <Typography
                variant="title"
                color="inherit"
                noWrap
                className={classNames({
                    [props.classes.noButton]: props.drawerStatus || props.location.pathname === '/'
                })}
            >
                Démonstrateur Janus/Reach gateway
            </Typography>
        </Toolbar>
    </AppBar>
);

Header.propTypes = {
    location: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    drawerStatus: PropTypes.bool.isRequired,
    openDrawer: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);
