import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        num_cols: PropTypes.number
    }

    instantiateBoard() {
        const { num_rows, num_cols } = this.props;
        const numTiles = num_rows * num_cols;
        let board_numbers = this.populateBoardNumbers(numTiles);
        this.shuffle(board_numbers);
        const board_2d = this.build2DBoard(num_rows, num_cols, board_numbers);

        this.setState({
            blank_tile_coordinate: this.locate_blank_tile_coordinate(board_2d)
        });

        return board_2d;
    }

    populateBoardNumbers(numTiles){
        let board_numbers = [];
        for(let i = 0; i < numTiles; i++){
            board_numbers.push(i);
        }
        return board_numbers;
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

    //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
        
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    }

    build2DBoard(num_rows, num_cols, board_numbers){
        console.log(board_numbers);
        let board = [];
        let index = 0;
        for(let row = 0; row < num_rows; row ++){
            let row = [];
            for(let col = 0; col < num_cols; col ++ ){
                row.push(board_numbers[index]);
                index++;
            }
            board.push(row);
        }
        return board;
    }

    updateCanvas() {
        const ctx = this.tileBoardRef.current.getContext('2d');

        const { num_rows, num_cols } = this.props;
        const { canvas_pixel_dimension, board } = this.state;
        const pixel_size = canvas_pixel_dimension / num_rows;
        const pixel_border_size = 1;

        for(let row = 0; row < num_rows; row ++){
            for(let col = 0; col < num_cols; col ++){
                const tile_value = board[row][col];
                this.generateCanvasTile(ctx, tile_value, pixel_size, pixel_border_size, row * pixel_size, col * pixel_size);
            }
        }
    }

    generateCanvasTile(canvas_ctx, tile_value, pixel_size, pixel_border_size, pixel_upper_left_row, pixel_upper_left_col) {
        canvas_ctx.fillStyle = 'black';
        canvas_ctx.fillRect(pixel_upper_left_row, pixel_upper_left_col, pixel_size, pixel_size);
        canvas_ctx.fillStyle = 'green';
        canvas_ctx.fillRect(pixel_upper_left_row + pixel_border_size, 
                            pixel_upper_left_col + pixel_border_size, 
                            pixel_size - pixel_border_size, 
                            pixel_size - pixel_border_size);
        canvas_ctx.font = "30px Arial";
        canvas_ctx.fillStyle = 'black';
        canvas_ctx.fillText(tile_value, pixel_upper_left_row + 3, pixel_upper_left_col + pixel_size - 3);
    }

    componentDidMount() {

        this.setState({
            board: this.instantiateBoard()
        })

        document.addEventListener("keydown", (e) => this._handleKeyDown(e));

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
            swap_vector = [-1, 0];
        }
        else if (key_direction === 'up'){
            swap_vector = [0, -1]; 
        }
        else if (key_direction === 'right') {
            swap_vector = [1, 0];
        }
        else if (key_direction === 'down') {
            swap_vector = [0, 1];
        }

        const { board, blank_tile_coordinate } = state;

        console.log(board, blank_tile_coordinate);

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
            <canvas ref={this.tileBoardRef} width={canvas_pixel_dimension} height={canvas_pixel_dimension}/>
        )
    }
}

export default TileBoard;