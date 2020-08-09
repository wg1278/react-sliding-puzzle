import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TileBoard from './TileBoard';
import Score from './Score';

class Game extends Component {

    constructor(props){

        super(props);

        this.state = {
            won: false,
            curr_score: 0,
            best_score: 0
        }

        this.has_won = this.has_won.bind(this);
        this.update_score = this.update_score.bind(this);

    }

    static propTypes = {
        board_dimension: PropTypes.number
    }

    has_won() {

        const { curr_score, best_score } = this.state;
        
        let tmp_best_score;
        if (best_score == 0){
            tmp_best_score = curr_score;
        }
        else{
            tmp_best_score = Math.min(curr_score, best_score);
        }

        this.setState({
            won: true,
            best_score: tmp_best_score
        });
    }

    update_score() {
        const old_score = this.state.curr_score;
        this.setState({
            curr_score: old_score + 1
        });
    }

    render() {
        const { board_dimension } = this.props;
        const { curr_score, best_score } = this.state; 
        return (
            <div>
                <Score curr_score={curr_score} best_score={best_score}/>
                <TileBoard num_rows={board_dimension} num_cols={board_dimension} has_won_callback={this.has_won}
                            update_score_callback={this.update_score}></TileBoard>
            </div>
            
        )
    }
}

export default Game;
