import React from 'react'
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

const Score = props => {
    return (
        <div>
            <Form.Label>Current Moves</Form.Label>
            <Form.Control
                readOnly
                type="number"
                placeholder="0"
                value={props.curr_score}
            />
            <Form.Label>Best Moves</Form.Label>
            <Form.Control
                readOnly
                type="number"
                placeholder="0"
                value={props.best_score}
            />
        </div>
    )
}

Score.propTypes = {
    best_score: PropTypes.number,
    curr_score: PropTypes.number
}

export default Score;
