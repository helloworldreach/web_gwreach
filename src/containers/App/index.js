import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from 'material-ui/styles';

import Reboot from 'material-ui/Reboot';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { toggleMediaServer } from '../Room/actions';
import { share, unShare } from '../LocalStream/actions';
import { subscribe } from '../Streams/actions';


const drawerWidth = 240;
const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        zIndex: 1,
        overflow: 'hidden'
    },
    hide: {
        display: 'none',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    content: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
    'content-left': {
        marginLeft: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: 0,
    }
});


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleMediaServer = () => {
        this.props.toggleMediaServer(this.props.roomUid)
    };

    handleShare = (evt, checked) => {
        if (this.props.roomUid) {
            checked ? this.props.share(this.props.roomUid) : this.props.unShare();
        }
    };

    handleSubscribe = (uid, subscribed) => {
        subscribed ? console.log(`UnSubscribe from ${uid}`) : this.props.subscribe(uid);
    };

    render() {
        const {
            classes, location,
            children,
            roomUid, mediaServer,
            streams,
            localUid, muted
        } = this.props;

        const { open } = this.state;

        return (
            <div className={classes.root}>
                <Reboot />
                <div className={classes.appFrame}>
                    <Header
                        location={location}
                        drawerStatus={open}
                        openDrawer={this.handleDrawerOpen}
                    />
                    <Sidebar
                        drawerStatus={open}
                        mediaServer={mediaServer}
                        room={roomUid}
                        local={localUid}
                        audio={muted}
                        streams={Object.values(streams)}
                        handleDrawerClose={this.handleDrawerClose}
                        handleMediaServer={this.handleMediaServer}
                        handleShare={this.handleShare}
                        handleSubscribe={this.handleSubscribe}
                    />

                    <main
                        className={classNames(classes.content, classes['content-left'], {
                            [classes.contentShift]: open,
                            [classes['contentShift-left']]: open,
                        })}
                    >
                        {children}
                    </main>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired
};

const mapStateToProps = state => ({
    location: state.router.location,
    roomUid: state.room.uid,
    mediaServer: state.room.useMediaServer,
    streams: state.streams,
    localUid: state.local.uid,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleMediaServer,
    share, unShare,
    subscribe
}, dispatch);

export default withStyles(styles)(
    withRouter(
        connect(
            mapStateToProps,
            mapDispatchToProps
        )(App)
    )
);