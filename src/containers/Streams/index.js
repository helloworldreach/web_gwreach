import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { GridListTile } from 'material-ui/GridList'


const styles = theme => ({
    container: {
        width: 200,
        height: 200,
        '&>video': {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        }
    }
});

const Stream = (props) => {
    const { classes, uid } = props;
    return (
        <GridListTile key={uid} cols={2} rows={1}>
            <div id={`stream-${uid}`} className={classes.container}/>
        </GridListTile>
    );
};

Stream.proptypes = {
    uid: PropTypes.string.isRequired,
    // name: PropTypes.string.isRequired,
    col: PropTypes.number
};

export default withStyles(styles)(Stream);
