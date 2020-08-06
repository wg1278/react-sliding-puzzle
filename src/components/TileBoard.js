import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TileBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            board_numbers: []
        };
    }
    
    static propTypes = {
        board_dimension: PropTypes.number
    }

    instantiateBoard() {

        

    }

    componentDidMount() {

        this.setState({

        })


    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default TileBoard;