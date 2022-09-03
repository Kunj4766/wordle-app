import React, { useCallback, useEffect, useState } from 'react';
import List from './List';
const main = () => {
    const [solution, setSolution] = useState('');
    const [gesses, setGesses] = useState(Array(6).fill(""));
    const [enteredKeys, setEnteredKeys] = useState("");
    const [count, setCount] = useState(0);
    const [res, setRes] = useState([]);
    const [reStart, setReStart] = useState(false);

    const handleGesses = useCallback(() => {
        const array = gesses.map((gess, i) => {
            if (enteredKeys.length <= 5 && i === count) {
                return enteredKeys.toUpperCase();
            } else {
                return gess;
            }
        });
        setGesses(array);
    }, [enteredKeys]);

    const handleKeyDown = useCallback((event) => {
        if (event.key === "Backspace") {
            setEnteredKeys(oldval => oldval.slice(0, -1));
        } else if (enteredKeys.length <= 4 && event.keyCode <= 90 && event.keyCode > 64) {
            setEnteredKeys(oldval => oldval + event.key);
        } else if (event.key === "Enter" && enteredKeys.length === 5) {
            if (enteredKeys.toUpperCase() == solution) {
                setCount(count + 1);
                setEnteredKeys("");
                setTimeout(() => {
                    alert("Congratulations You won the game");
                    setGesses(Array(6).fill(""));
                    setCount(0);
                    setReStart(!reStart);
                }, 500);
            } else {
                const inclu = res.some((five) => five.word === enteredKeys.toUpperCase())
                if (inclu) {
                    setCount(count + 1);
                    setEnteredKeys("");
                    if (count === 5) {
                        setTimeout(() => {
                            alert("You Lost the game! Try again");
                            setGesses(Array(6).fill(""));
                            setCount(0);
                            setReStart(!reStart);
                        }, 500);
                    }
                } else {
                    alert("Your entered word not exist on dictionary please try again")
                    setCount(count);
                }
            }
        }
    }, [enteredKeys, count]);

    console.log(enteredKeys, "__________", gesses, count, solution);

    useEffect(() => {
        const WordData = async () => {
            const data = await fetch('https://raw.githubusercontent.com/mongodb-developer/bash-wordle/main/words.json');
            const res = await data.json();
            setRes(res);
            const randomWord = res[Math.floor(Math.random() * res.length)];
            setSolution(randomWord.word)
        };
        WordData();
    }, [reStart])

    useEffect(() => {
        handleGesses();
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [handleGesses]);

    return (
        <List solution={solution} count={count} gesses={gesses} />
    )
};
export default main;