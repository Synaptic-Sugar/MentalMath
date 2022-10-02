import React, { Component } from 'react';


class Timer extends Component{
    constructor(props){
        super(props);
        this.state = {
            timer: 60
        };
        this.setGameOver = props.setGameOver;
    }

    countDown(){
        if(this.state.timer <= 0) this.setGameOver();
        this.setState({
            ...this.state,
            timer: this.state.timer - 1
        });
    }
    componentDidMount(){
        this.timerID = setInterval( () => this.countDown(), 1000);
    }
    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    render(){
        return(
            <div>
                {this.state.timer}
            </div>
        )
    }
}

export default Timer;