import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import VolumeUpIcon from 'material-ui-icons/VolumeUp';
import VolumeOffIcon from 'material-ui-icons/VolumeOff';
import { CardActions } from 'material-ui/Card';
import {mute, unMute} from './actions';

const style = {
    actions: {
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
};

const Controls = (props) => {
    return (
        <CardActions className={props.classes.actions}>
            <Button
                fab
                mini
                color="secondary"
                onClick={() => {
                    props.muted.audio ?
                        props.unMute(props.localUid) :
                        props.mute(props.localUid)
                }}
            >
                {props.muted.audio ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </Button>
        </CardActions>
    );
};

const mapStateToProps = state => ({
    muted: state.local.muted,
    localUid: state.local.uid
});

const mapDispatchToProps = dispatch => bindActionCreators({
    mute,
    unMute
}, dispatch);

export default withStyles(style)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Controls)
);