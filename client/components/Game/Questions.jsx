import React, { Component } from 'react';

class Questions extends Component{
    constructor(props){
        super(props);
        this.score = props.score;
        this.state = {}
        this.incrementScore = props.incrementScore;
        this.generateQuestion = this.generateQuestion.bind(this);
    }

    componentDidMount(){
        this.generateQuestion();
        this.answerInput = document.getElementById('answerInput');
        this.answerInput.addEventListener('keypress', (event)=>{
            if(event.key === 'Enter') this.isCorrectAnswer();
        })
    }
    generateQuestion(){
        this.setState({
            a: Math.floor(Math.random()*(this.score + 20)),
            b: Math.floor(Math.random()*(this.score + 20)),
        });
    }
    isCorrectAnswer(){
        // console.log(`Correct answer: ${this.state.a * this.state.b}`);
        // console.log(`Answer: ${this.answerInput.value}`)
        // Keep answer input type as string to avoid cheating
        if(this.answerInput.value == this.state.a * this.state.b){
            this.answerInput.value = '';
            this.incrementScore();
            this.generateQuestion();
        }
        else{
            // Wrong answer animation
            this.answerInput.value = '';
        }
    }

    render(){
        console.log(`A: ${this.state.a}, B: ${this.state.b}`);
        return (
            <div>
                {(this.state.a !== undefined && this.state.b !== undefined && <div id='question'>{`What is ${this.state.a} * ${this.state.b}`}</div>)}
                <div id='answer'>
                    <input id='answerInput'></input>
                </div>
            </div>
        )
    }
}

export default Questions;