import React, { Component } from 'react';


class Timer extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.timerID = setInterval(this.props.countDown, 1000);
    }
    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    render(){
        return(
            <div id='timer'>
                {this.props.time}
            </div>
        )
    }
}

export default Timer;