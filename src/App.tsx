import { useState } from 'react';
import { FaClipboard, FaArrowRight } from 'react-icons/fa'

const App = () => {
	const [password, setPassword] = useState('');

	const [passLen, setPassLen] = useState(0);
	const [strong, setStrong] = useState(0);

	const [includeUpper, setIncludeUpper] = useState(false);
	const [includeLower, setIncludeLower] = useState(false);
	const [includeNumber, setIncludeNumber] = useState(false);
	const [includeSymbol, setIncludeSymbol] = useState(false);

	function handleLower() {
		setIncludeLower(!includeLower);
		updatePassword();
	}

	function handleUpper() {
		setIncludeUpper(!includeUpper);
		updatePassword();
	}

	function handleNumber() {
		setIncludeNumber(!includeNumber);
		updatePassword();
	}

	function handleSymbol() {
		setIncludeSymbol(!includeSymbol);
		updatePassword();
	}

	function updatePassword() {
		let newPass = '';
		let newStrong = 0;
		let allowedChar = '';

		if (includeLower) {
			allowedChar += 'abcdefghijklmnopqrstuvwxyz'
			newStrong += 5;
		}
		if (includeUpper) {
			allowedChar += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
			newStrong += 5;
		}
		if (includeNumber) {
			allowedChar += '012345678901234567890'
			newStrong += 5;
		}
		if (includeSymbol) {
			allowedChar += '!@#$%^&*()_+{}:">?<~`/.,]['
			newStrong += 5;
		}

		if (allowedChar.length === 0) {
			setPassword("Select a include");
			return;
		}

		for (let i = 0; i < passLen; i++) {
			newPass += allowedChar[Math.floor(Math.random() * allowedChar.length)];
			newStrong += 1;
		}

		setStrong(newStrong);
		setPassword(newPass);
	}

	function handleClipboard(e: any) {
		const popUp = document.getElementById("popUp");
		if (!popUp) return;

		e.target.style.color = 'white';
		popUp.style.scale = '1';
		navigator.clipboard.writeText(password);
		setTimeout(() => {
			e.target.style.color = '#a4ffaf';
			popUp.style.scale = '0';
		}, 3000);
	}

	function formatStrong(value: number) {
		if (value >= 38) {
			return 'STRONG';
		} else if (value >= 20) {
			return 'MEDIUM';
		} else {
			return 'WEAK';
		}
	}

	return (
		<div className="flex flex-col items-center justify-center gap-5 text-white font-mono w-96">
			<h3 className="text-gray font-bold">Password Generator</h3>

			<div className="bg-secondary w-full p-6 py-3 text-x flex justify-between items-center">
				<span className='font-mono'>{(password) ? password : "Password"}</span>
				<div className='relative'>
					<span className='bg-darkestSecondary absolute -top-10 -left-6 p-0.5 transition-all duration-200' id='popUp'>Copied!</span>
					<button className='text-primary transition-colors duration-150 hover:text-white' onClick={handleClipboard}>
						<FaClipboard />
					</button>
				</div>
			</div>

			<div className='bg-secondary p-6 w-full'>
				<form>
					<label className='flex justify-between'><span>Character Length</span> <span className='text-primary text-xl'>{passLen}</span></label> <br />
					<input onChange={(e) => { setPassLen(Number(e.target.value)); updatePassword() }} className='w-full range' type="range" min={1} max={27} defaultValue={0} /> <br />

					<div className='flex flex-col gap-2 mt-10'>
						<input className="checkbox" type="checkbox" id='upper' onChange={handleUpper} />
						<label htmlFor='upper' className='label'>Include Uppercase Letters</label> <br />
						<input className="checkbox" type="checkbox" id='lower' onChange={handleLower} />
						<label htmlFor='lower' className='label'>Include Lowercase Letters</label> <br />
						<input className="checkbox" type="checkbox" id='number' onChange={handleNumber} />
						<label htmlFor='number' className='label'>Include Numbers</label> <br />
						<input className="checkbox" type="checkbox" id='symbol' onChange={handleSymbol} />
						<label htmlFor='symbol' className='label'>Include Symbols</label> <br />
					</div>

				</form>
				<div className='flex justify-between bg-darkerSecondary p-3 items-center'>
					<span className='text-gray'>STRENGTH</span>
					<span>{formatStrong(strong)}</span>
				</div>
				<button onClick={updatePassword} className='flex items-center gap-3 w-full justify-center bg-primary text-secondary p-3 mt-5 hover:bg-secondary hover:text-primary border-2 transition-colors duration-200'>
					Generate <FaArrowRight />
				</button>
			</div>
		</div>
	);
}

export default App;