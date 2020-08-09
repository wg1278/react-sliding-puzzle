import React, { Component } from 'react';
import TileBoard from './TileBoard';
import Score from './Score';
import ConfigurationModal from './ConfigurationModal';
import PlayAgainModal from './PlayAgainModal';

class Game extends Component {

    constructor(props){

        super(props);

        this.state = {
            won: false,
            curr_score: 0,
            best_score: 0,
            show_config_modal: true,
            show_play_again_modal: false,
            reset_board: false,
            board_size: 4
        }

        this.has_won = this.has_won.bind(this);
        this.update_score = this.update_score.bind(this);
        this.config_modal_close_callback = this.config_modal_close_callback.bind(this);
        this.play_again_modal_close_callback = this.play_again_modal_close_callback.bind(this);
        this.play_again_modal_true_callback = this.play_again_modal_true_callback.bind(this);
        this.reset_board_callback = this.reset_board_callback.bind(this);
        this.update_board_size = this.update_board_size.bind(this);
    }

    has_won() {

        const { curr_score, best_score } = this.state;
        
        let tmp_best_score;
        if (best_score === 0){
            tmp_best_score = curr_score;
        }
        else{
            tmp_best_score = Math.min(curr_score, best_score);
        }

        this.setState({
            won: true,
            best_score: tmp_best_score,
            show_play_again_modal: true
        });
    }

    update_score() {
        const old_score = this.state.curr_score;
        this.setState({
            curr_score: old_score + 1
        });
    }

    reset_board_callback() {
        this.setState({
            reset_board: false
        });
    }

    config_modal_close_callback() {
        this.setState({
            show_config_modal: false,
            reset_board: true
        });
    }

    play_again_modal_close_callback() {
        this.setState({
            show_play_again_modal: false
        });
    }

    play_again_modal_true_callback() {
        this.setState({
            show_play_again_modal: false,
            won: false,
            curr_score: 0,
            reset_board: true
        });
    }

    update_board_size = (e) => {
        const new_board_size = parseInt(e.target.value);

        if (this.state.board_size !== new_board_size){
            this.setState({
                board_size: new_board_size,
                best_score: 0
            });
        }
    }

    render() {
        const { curr_score, best_score, show_config_modal, show_play_again_modal, reset_board, board_size } = this.state; 
        return (
            <div>
                <Score curr_score={curr_score} best_score={best_score}/>
                {reset_board && <TileBoard reset_board={reset_board} num_rows={board_size} 
                                           num_cols={board_size} has_won_callback={this.has_won} 
                                           reset_board_callback={this.reset_board_callback}
                                           update_score_callback={this.update_score}/>}
                <ConfigurationModal curr_board_size={board_size} show={show_config_modal} 
                                    close_callback={this.config_modal_close_callback}
                                    update_board_size_callback={this.update_board_size}/>
                <PlayAgainModal curr_board_size={board_size} show={show_play_again_modal} 
                                close_callback={this.play_again_modal_close_callback}
                                play_again_callback={this.play_again_modal_true_callback}
                                update_board_size_callback={this.update_board_size}/>
            </div>
        )
    }
}

export default Game;
