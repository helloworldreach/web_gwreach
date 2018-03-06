import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';

import { sharing, share } from './actions';
import Controls from './controls';

// import { GridListTile, GridListTileBar  } from 'material-ui/GridList';

const style = {
    card:  {
        position: 'absolute',
        width: 150 ,
        height: 150,
        top: -75,
        right: -75,
        zIndex: 10000,
        maxWidth: 150,
        maxHeight: 150,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '50%'
    },
    container: {
        borderRadius: '50%',
        height: '100%',
        width: '100%',
        '&>video': {
            height: '100%',
            width: '100%',
            borderRadius: '50% !important',
            objectFit: 'cover'
        }
    }
};

class LocalStream extends React.Component {

    componentDidMount() {
        this.props.sharing();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(nextProps.localUid && !nextProps.localSharing);
    }

    componentDidUpdate() {
        if (this.props.localSharing) {
            console.log(this.videoContainer);
            this.props.share(this.props.roomUid, this.videoContainer);
        }
    }

    render() {
        const { classes } = this.props;
        return (
          <Card className={classes.card} raised>
              <CardContent component={() => (
                  <div className={classes.container} ref={(div) => { this.videoContainer = div; }} />
              )} />
              <Controls />
          </Card>
        );
    }
}

const mapStateToProps = state => ({
    roomUid: state.room.uid,
    localSharing: state.local.sharing,
    localUid: state.local.uid
});

const mapDispatchToProps = dispatch => bindActionCreators({
    sharing,
    share
}, dispatch);

export default withStyles(style)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(LocalStream)
);