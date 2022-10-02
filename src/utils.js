export default function shuffle(arr) {
	const array = [...arr];

	for (let i = array.length - 1; i > 0; i--) {
		let randomPosition = Math.floor(Math.random() * (i + 1));
		let temp = array[i];

		array[i] = array[randomPosition];
		array[randomPosition] = temp;
	}
	return array;
}
