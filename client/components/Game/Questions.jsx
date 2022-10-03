import React, { Component } from 'react';

class Questions extends Component{
    constructor(props){
        super(props);
        this.addToCorrectAnswers = props.addToCorrectAnswers;
        this.addToFailedQuestions = props.addToFailedQuestions;
        this.state = {}
        this.generateQuestion = this.generateQuestion.bind(this);
    }

    componentDidMount(){
        this.generateQuestion();
        this.answerInput = document.getElementById('answerInput');
        this.answerInput.addEventListener('keypress', (event)=>{
            if(event.key === 'Enter') this.isCorrectAnswer();
        });
    }

    generateQuestion(){
        let rangeValue;
        // Bug score in parent state is always 1 ahead of score in this function
        // current fix: score + 1
        console.log(this.props.state.score);
        switch(this.props.difficulty){
            case 'easy':
                rangeValue = this.props.state.score + 1;
                break;
            case 'med':
                rangeValue = this.props.state.score + 4;
                break;
            case 'hard':
                rangeValue = this.props.state.score+ 11;
                break;
            case 'god':
                rangeValue = (this.props.state.score + 6) * 10;
                break;
        }
        console.log(`RANGE_VAL: ${rangeValue}`);
        this.timer = document.getElementById('timer');
        const startTime = Number(this.timer.textContent);
        this.setState({
            // add 2 to negate products of 1 and 0, so range starts 2-10
            a: Math.floor(Math.random() * 8 + rangeValue) + 2,
            b: Math.floor(Math.random() * 8 + rangeValue) + 2,
            startTime: startTime,
        });
    }
    isCorrectAnswer(){
        // console.log(`Correct answer: ${this.state.a * this.state.b}`);
        // console.log(`Answer: ${this.answerInput.value}`);

        // Keep answer input type as string to avoid cheating
        if(this.answerInput.value == this.state.a * this.state.b){
            // Number - String uses to coerision to return difference as a number value
            const completeTime = this.state.startTime - this.timer.innerText;
            this.answerInput.value = '';
            this.addToCorrectAnswers(`${this.state.a} * ${this.state.b}`, completeTime);
            this.generateQuestion();
        }
        else{
            // Wrong answer animation
            this.answerInput.value = '';
            // !!! might cause unwanted rerendering !!!
            this.addToFailedQuestions(`${this.state.a} * ${this.state.b}`);
        }
    }

    render(){
        return (
            <div>
                <div id='question'>{ `${this.state.a} * ${this.state.b}` }</div>
                <div id='answer'>
                    <input id='answerInput'></input>
                </div>
            </div>
        )
    }
}

export default Questions;