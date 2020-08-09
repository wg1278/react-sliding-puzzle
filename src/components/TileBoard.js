import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './../App.css';

class TileBoard extends Component {

    constructor(props) {
        super(props);
        this.tileBoardRef = React.createRef();
        this.state = {
            board: [],
            blank_tile_coordinate: [-1, -1],
            canvas_pixel_dimension: 300
        };
    }
    
    static propTypes = {
        num_rows: PropTypes.number,
        num_cols: PropTypes.number,
        has_won_callback: PropTypes.func,
        update_score_callback: PropTypes.func
    }

    instantiateBoard() {
        const { num_rows, num_cols } = this.props;
        const board_2d = this.build2DBoard(num_rows, num_cols);
        this.shuffle_2d(board_2d);

        this.setState({
            blank_tile_coordinate: this.locate_blank_tile_coordinate(board_2d)
        });

        return board_2d;
    }

    locate_blank_tile_coordinate = (board) => {
        for(let row = 0; row < board.length; row ++){
            for(let col = 0; col < board[row].length; col ++){
                if(board[row][col] === 0){
                    return [row, col];
                }
            }
        }
        return [-1, -1];
    }

    shuffle_2d(board) {

        const num_rows = board.length;
        const num_cols = board[0].length;

        const swap_vectors = [[0, -1], [-1, 0], [0, 1], [1, 0]];
        const num_shuffles = num_rows * num_cols * num_rows * num_cols;

        let curr_row = 0;
        let curr_col = 0;
        for(let shuffle_num = 0; shuffle_num < num_shuffles; shuffle_num ++){

            let vector_idx = Math.floor(4 * Math.random());
            while(!this.is_in_bounds(num_rows, num_cols, [curr_row, curr_col], swap_vectors[vector_idx])) {
                vector_idx = Math.floor(4 * Math.random());
            }
            let next_row = curr_row + swap_vectors[vector_idx][0];
            let next_col = curr_col + swap_vectors[vector_idx][1];

            let tmp_val = board[curr_row][curr_col];
            board[curr_row][curr_col] = board[next_row][next_col];
            board[next_row][next_col] = tmp_val;

            curr_row = next_row;
            curr_col = next_col;
        }
    }

    get_next_coordinate(curr_row, curr_col, swap_vector){
        return (curr_row + swap_vector[0], curr_col + swap_vector[1]);
    }

    build2DBoard(num_rows, num_cols){
        let board = [];
        let curr_num = 0;
        for(let row = 0; row < num_rows; row ++){
            let curr_row = [];
            for(let col = 0; col < num_cols; col ++ ){
                curr_row.push(curr_num);
                curr_num++;
            }
            board.push(curr_row);
        }
        return board;
    }

    updateCanvas() {
        const ctx = this.tileBoardRef.current.getContext('2d');

        const { num_rows, num_cols } = this.props;
        const { canvas_pixel_dimension, board } = this.state;
        const pixel_size = canvas_pixel_dimension / num_rows;
        const pixel_border_size = 1;

        console.log(board);
        ctx.clearRect(0, 0, this.tileBoardRef.current.width, this.tileBoardRef.current.height);
        for(let row = 0; row < num_rows; row ++){
            for(let col = 0; col < num_cols; col ++){
                const tile_value = board[row][col];
                console.log(tile_value);
                this.generateCanvasTile(ctx, tile_value, pixel_size, pixel_border_size, row * pixel_size, col * pixel_size);
            }
        }

    }
    

    has_won(board){
        let curr_num = 0;
        for(let row = 0; row < board.length; row ++){
            for(let col = 0; col < board[row].length; col ++){
                if(board[row][col] !== curr_num){
                    return false;
                }
                curr_num++;
            }
        }
        return true;
    }

    generateCanvasTile(canvas_ctx, tile_value, pixel_size, pixel_border_size, pixel_upper_left_row, pixel_upper_left_col) {
        canvas_ctx.fillStyle = 'black';
        canvas_ctx.fillRect(pixel_upper_left_col, pixel_upper_left_row, pixel_size, pixel_size);
        canvas_ctx.fillStyle = 'green';
        canvas_ctx.fillRect(pixel_upper_left_col + pixel_border_size, 
                            pixel_upper_left_row + pixel_border_size, 
                            pixel_size - pixel_border_size, 
                            pixel_size - pixel_border_size);
        canvas_ctx.font = "20px Arial";
        canvas_ctx.fillStyle = 'black';
        canvas_ctx.fillText(tile_value, pixel_upper_left_col + 3, pixel_upper_left_row + pixel_size - 3);
    }

    componentDidMount() {

        this.setState({
            board: this.instantiateBoard()
        })

        document.addEventListener("keydown", this._handleKeyDown);

    }

    _handleKeyDown = (e) => {
        switch (e.keyCode) {
            case 37:
                this.swap(this.state, 'left');
                break;
            case 38:
                this.swap(this.state, 'up');
                break;
            case 39:
                this.swap(this.state, 'right');
                break;
            case 40:
                this.swap(this.state, 'down');
                break;
            default:
                console.log('wrong key');
                break;
        }
    }

    swap = (state, key_direction) => {

        console.log(key_direction);
        
        let swap_vector;

        if (key_direction === 'left'){
            swap_vector = [0, -1];
        }
        else if (key_direction === 'up'){
            swap_vector = [-1, 0]; 
        }
        else if (key_direction === 'right') {
            swap_vector = [0, 1];
        }
        else if (key_direction === 'down') {
            swap_vector = [1, 0];
        }

        const { board, blank_tile_coordinate } = state;

        const num_rows = board.length;
        const num_cols = board[0].length;

        if(!this.is_in_bounds(num_rows, num_cols, blank_tile_coordinate, swap_vector)){
            return;
        }

        let board_copy = this.copy_2d_board(board);

        const new_blank_row = blank_tile_coordinate[0] + swap_vector[0];
        const new_blank_col = blank_tile_coordinate[1] + swap_vector[1];

        const val_to_Swap_with_blank = board_copy[new_blank_row][new_blank_col];
        board_copy[new_blank_row][new_blank_col] = 0;
        board_copy[blank_tile_coordinate[0]][blank_tile_coordinate[1]] = val_to_Swap_with_blank;

        console.log(board_copy);

        if(this.has_won(board_copy)){
            document.removeEventListener("keydown", this._handleKeyDown);
            this.props.has_won_callback();
        }

        this.props.update_score_callback();

        this.setState({
            blank_tile_coordinate: [new_blank_row, new_blank_col],
            board: board_copy
        });
    }

    copy_2d_board = (board) => {

        let board_copy = [];

        for(let row = 0; row < board.length; row ++){
            let tmp_row = [];
            for(let col = 0; col < board[row].length; col ++){
                tmp_row.push(board[row][col]);
            }
            board_copy.push(tmp_row);
        }

        return board_copy;
    }

    is_in_bounds = (num_rows, num_cols, blank_tile_coordinate, swap_vector) => {

        const new_row = blank_tile_coordinate[0] + swap_vector[0];
        const new_col = blank_tile_coordinate[1] + swap_vector[1];

        return new_row >= 0 && new_row < num_rows && new_col >= 0 && new_col < num_cols;
    }

    componentDidUpdate(){
        this.updateCanvas();
    }

    render() {

        const { canvas_pixel_dimension } = this.state;
        return (
            <canvas id="myCanvas" ref={this.tileBoardRef} width={canvas_pixel_dimension} height={canvas_pixel_dimension}/>
        )
    }
}

export default TileBoard;