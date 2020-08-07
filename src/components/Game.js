import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TileBoard from './TileBoard';

class Game extends Component {

    constructor(props){

        super(props);

        this.state = {
            won: false
        }

    }

    static propTypes = {
        board_dimension: PropTypes.number
    }

    render() {
        const { board_dimension } = this.props;
        return (
            <TileBoard num_rows={board_dimension} num_cols={board_dimension} ></TileBoard>
        )
    }
}

export default Game;
