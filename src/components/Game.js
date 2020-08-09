import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TileBoard from './TileBoard';

class Game extends Component {

    constructor(props){

        super(props);

        this.state = {
            won: false
        }

        this.has_won = this.has_won.bind(this);

    }

    static propTypes = {
        board_dimension: PropTypes.number
    }

    has_won() {
        this.setState({
            won: true
        });
    }

    render() {
        const { board_dimension } = this.props;
        return (
            <div>
                {this.state.won && 'YAY'}
                <TileBoard num_rows={board_dimension} num_cols={board_dimension} has_won_callback={this.has_won}></TileBoard>
            </div>
            
        )
    }
}

export default Game;
