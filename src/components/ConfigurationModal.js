import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const ConfigurationModal = props => {
  
    return (
        <Modal
          show={props.show}
          onHide={props.close_callback}
          backdrop="static"
          keyboard={false}
        >
        <Modal.Header>
            <Modal.Title>Sliding Puzzle Game Rules</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Sort the tiles. Rows shall be ascending-sorted left to right and columns shall be ascending-sorted top to bottom.
        </Modal.Body>
        <Modal.Body>
        Move the zero tile with the arrow keys to swap tiles and move toward the game's end state!
        </Modal.Body>

        <Form.Group>
            <Col>
                <Form.Label>Board Size (e.g. 4 = 4 x 4 board)</Form.Label>
            </Col>
            <Col>
                <Form.Control as="select" defaultValue={props.curr_board_size} custom={true} onChange={e => props.update_board_size_callback(e)}>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>    
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                </Form.Control>
            </Col>
        </Form.Group>

        <Modal.Footer>
            <Button variant="secondary" onClick={props.close_callback}>
                Play game
            </Button>
        </Modal.Footer>
        </Modal>
    );
}

ConfigurationModal.propTypes = {
    curr_board_size: PropTypes.number,
    show: PropTypes.bool,
    close_callback: PropTypes.func,
    update_board_size_callback: PropTypes.func
}

export default ConfigurationModal;
