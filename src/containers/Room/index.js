import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from 'material-ui/styles';

import GridList  from 'material-ui/GridList';
// import ListSubheader from 'material-ui/List/ListSubheader';
import Paper from 'material-ui/Paper';

import { share } from '../LocalStream/actions';
import LocalStream from '../LocalStream';
import Stream from '../Streams';



const styles = theme => ({
    room: {
        width: 'calc(100% - 55px)',
        height: 'calc(100% - 55px)',
        marginTop: 55,
        position: 'relative'
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        height: '100%'
    },
    gridList: {
        width: '100%',
        height: '100%',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});

class Room extends React.Component {
    componentWillMount() {
        if (!this.props.name || !this.props.uid) {
            this.props.changePage();
        }
    }

    render() {
        const { classes, streams, user } = this.props;
        return (
            <div className={classes.room}>
                <LocalStream />
                <Paper elevation={2} className={classes.root}>
                    <GridList cellHeight={180} className={classes.gridList} cols={3}>
                        {
                            Object.values(streams).map((stream) => {
                                if (!stream.subscribe && !!stream.uid && stream.from.uid !== user.uid) {
                                    return (
                                        <Stream
                                            key={stream.uid}
                                            uid={stream.uid}
                                            name={stream.from.name}
                                        />
                                    )
                                }
                                return null;
                            })
                        }
                    </GridList>
                </Paper>
            </div>
        );
    }
}

Room.propTypes = {
    //classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    name: state.room.name,
    uid: state.room.uid,
    owner: state.room.owner,
    useMediaServer: state.room.useMediaServer,
    extra: state.room.extra,
    local: state.local,
    user: state.user,
    streams: state.streams
});

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/'),
    share
}, dispatch);

export default withStyles(styles) (
    connect(
            mapStateToProps,
            mapDispatchToProps
    )(Room)
);
