import React, { useState, useRef } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[0]);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [quizEnd, setQuizEnd] = useState(false);

    const option1 = useRef(null);
    const option2 = useRef(null);
    const option3 = useRef(null);
    const option4 = useRef(null);

    const optionArray = [option1, option2, option3, option4];

    const checkAns = (e, ans) => {
        if (!lock) {
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setScore(score + 1);
            } else {
                e.target.classList.add("wrong");
                optionArray[question.ans - 1].current.classList.add("correct");
            }
            setLock(true);
        }
    };

    const nextQuestion = () => {
        if (index < data.length - 1) {
            setIndex(index + 1);
            setQuestion(data[index + 1]);
            setLock(false);
            optionArray.forEach((opt) => {
                opt.current.classList.remove("correct", "wrong");
            });
        } else {
            setQuizEnd(true);
        }
    };

    const resetQuiz = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setQuizEnd(false);
        optionArray.forEach((opt) => {
            opt.current.classList.remove("correct", "wrong");
        });
    };

    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
            {!quizEnd ? (
                <>
                    <h2>{index + 1}. {question.question}</h2>
                    <ul>
                        <li ref={option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
                        <li ref={option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
                        <li ref={option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
                        <li ref={option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
                    </ul>
                    <button onClick={nextQuestion}>Next</button>
                    <div className='index'>{index + 1} of {data.length} questions</div>
                </>
            ) : (
                <div className="results">
                    <h2>Your Score: {score} / {data.length}</h2>
                    <button onClick={resetQuiz}>Reset Quiz</button>
                </div>
            )}
        </div>
    );
};

export default Quiz;
