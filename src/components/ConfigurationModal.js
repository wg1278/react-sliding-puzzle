import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ConfigurationModal = props => {
  
    return (
      <>
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
            Sort the Tiles. Rows shall be ascending-sorted left to right and columns shall be ascending-sorted top to bottom.
          </Modal.Body>
          <Modal.Body>
            Move the zero tile with the arrow keys to swap tiles and move toward the game's end state!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.close_callback}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

ConfigurationModal.propTypes = {
    show: PropTypes.bool,
    close_callback: PropTypes.func
}

export default ConfigurationModal;
