import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
          <Modal.Footer>
            <Button variant="secondary" onClick={props.close_callback}>
              Close
            </Button>
            <Button variant="primary" onClick={props.play_again_callback}>Play Again</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

PlayAgainModal.propTypes = {
    show: PropTypes.bool,
    close_callback: PropTypes.func,
    play_again_callback: PropTypes.func
}

export default PlayAgainModal;