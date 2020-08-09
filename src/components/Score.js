import React from 'react'
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

const Score = props => {
    return (
        <div>
            <Form.Row>
                <Form.Label>Current Game Moves Count</Form.Label>
                <Form.Control
                    readOnly
                    type="number"
                    placeholder="0"
                    value={props.curr_score}
                />
            </Form.Row>
            <Form.Row>
                <Form.Label>Finished Games Minimum Moves Count</Form.Label>
                <Form.Control
                    readOnly
                    type="number"
                    placeholder="0"
                    value={props.best_score}
                />
            </Form.Row>
        </div>
    )
}

Score.propTypes = {
    best_score: PropTypes.number,
    curr_score: PropTypes.number
}

export default Score;
