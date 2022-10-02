import { useEffect } from 'react';
import { useState } from 'react';
import shuffle from '../utils';
import { useCallback } from 'react';

export default function ColorGuess() {

	const [color, setColor] = useState('');
	const [choices, setChoices] = useState([]);
	const [answer, setAnswer] = useState(true);

	const generateColor = () => {
		const hexString = '0123456789ABCDEF';
		let hex = '#';
		for (let i = 0; i < 6; i++) {
			hex += hexString[Math.floor(Math.random() * hexString.length)];
		}

		return hex;
	};

    const resetGame = useCallback(() => {
        setAnswer(undefined)
		const correctColor = generateColor();
		setColor(correctColor);
		setChoices(shuffle([correctColor, generateColor(), generateColor()]));
    }, [])


	const selection = (choice) => {
		if (choice === color) {
			setAnswer(true);
            resetGame()
		} else {
			setAnswer(false);
		}
	};

	useEffect(() => {
        resetGame()
	}, [resetGame]);

	return (
		<>
			<div>
				<div className="guess" style={{ background: color }}></div>
                <div className = 'buttonDiv'>
				{choices.map((choice) => (
					<button
						className="button"
						key={choice}
						onClick={() => {
							selection(choice);
						}}
					>
						{choice}
					</button>
				))}
                </div>
				{answer === false ? <p className = 'tryAgain'>Try again...</p> : <p className = 'takeAGuess'>Take a guess</p>}
			</div>
		</>
	);
}
