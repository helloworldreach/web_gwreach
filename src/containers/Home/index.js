import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { entering } from '../Room/actions';

import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

let inputRef;
const styles = theme => ({
    home: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 64px)'
    },
    card: {
        minWidth: 350,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
    join: {
        margin: '0 auto'
    }
});

const join = (cb) => {
    console.log(inputRef.value);
    if (inputRef.value) {
        cb(inputRef.value);
    }
};

const Room = (props) => {
    const { classes } = props;

    return (
        <div
            className={classes.home}
        >
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title}>Jarway demo</Typography>
                    <Typography type="headline" component="h2">
                        Créer ou rejoindre une room
                    </Typography>
                    <TextField
                        label={'room'}
                        fullWidth
                        inputRef={(ref) => {
                            inputRef = ref;
                        }}
                        onKeyDown={(evt) => {
                            if (evt.key === 'Enter') {
                                evt.preventDefault();
                                join(props.entering);
                            }
                        }}
                    />
                </CardContent>
                <CardActions>
                    <Button
                        variant="raised"
                        color="primary"
                        className={classes.join}
                        onClick={() => {
                            join(props.entering);
                        }}
                    >
                        Entrée
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

Room.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({
    entering
}, dispatch);

export default withStyles(styles)(
    connect(
        null,
        mapDispatchToProps
    )(Room)
);
