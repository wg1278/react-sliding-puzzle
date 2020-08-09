import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const PlayAgainModal = props => {
  
    return (
      <>
        <Modal
          show={props.show}
          onHide={props.close_callback}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Play Again?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Try to beat the 'Finished Games Minimum Moves Count'!
          </Modal.Body>

          <Form.Group>
            <Col>
                <Form.Label>The board size can be modified, but scores will be reset.</Form.Label>
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
              No, I'm done playing
            </Button>
            <Button variant="primary" onClick={props.play_again_callback}>Play again</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

PlayAgainModal.propTypes = {
    curr_board_size: PropTypes.number,
    show: PropTypes.bool,
    close_callback: PropTypes.func,
    play_again_callback: PropTypes.func,
    update_board_size_callback: PropTypes.func
}

export default PlayAgainModal;