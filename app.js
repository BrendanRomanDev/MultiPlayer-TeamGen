//inputfields

const playerInput = document.querySelector('#nameInput');
const addPlayerBtn = document.querySelector('#addPlayerBtn');

const numPerTeamInput = document.querySelector('#numPerTeamDropDown');
const generateBtn = document.querySelector('#submitBtn');
const resetBtn = document.querySelector('#resetBtn');

///htmlElements
let newDiv = document.createElement('div');

/////////////////PROGRAM LOGIC//////////////////

let names = [];
let playerCount = names.length;

/////////////////ADDING NAMES//////////////////
const addPlayer = (name) => {
	const newh5 = document.createElement('h5');
	const newBtn = document.createElement('button');
	const userInputDiv = document.getElementById('user-input-div');
	userInputDiv.innerHTML = '';
	userInputDiv.appendChild(newDiv);
	const playerContainer = document.createElement('div');
	newDiv.appendChild(playerContainer);
	playerContainer.classList.add('player-item');
	playerContainer.appendChild(newh5);
	playerContainer.appendChild(newBtn);
	newBtn.innerText = '-';
	newBtn.classList.add('player-btn');
	newh5.innerText = name;
	newh5.classList.add('player-name-h5');
	const nameText = newh5.innerText;
	names.push(nameText);
	newh5.classList.add('player-name-h5');
	newBtn.addEventListener('click', () => {
		names.splice(names.indexOf(nameText), 1);
		playerContainer.remove();
	});
};

//add player name to names array & html list

playerInput.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		nameCheckAndAdd();
	}
});

addPlayerBtn.addEventListener('click', () => nameCheckAndAdd());

//Error if name field is blank, add if not.
const nameCheckAndAdd = () => {
	if (!playerInput.value) {
		alert('Player Name field cannot be blank');
	} else {
		addPlayer(playerInput.value);
		playerInput.value = '';
	}
};

/////////////////CALCULATIONS//////////////////
const maxPerTeamToNum = () => {
	let numPerTeam = numPerTeamInput.value;
	if (numPerTeam !== 'Select') {
		numPerTeam = +numPerTeam;
	} else {
		alert('Player count is not valid');
	}
	return numPerTeam;
};
/////////////////////////////////////////MAIN PROGRAMM/////////////////////////////////////////

//run Program on click of generate button
generateBtn.addEventListener('click', () => {
	resultDiv = document.querySelector('#result-div');
	resultDiv.innerHTML = '';
	shuffle(names);
	createShuffledList(names, maxPerTeamToNum());
	// console.log(names, maxPerTeamToNum());
});

//reset all on click of reset-button
resetBtn.addEventListener('click', () => {
	reset();
});

const reset = () => {
	names = [];
	const resultDiv = document.querySelector('#result-div');
	const userInputDiv = document.getElementById('user-input-div');
	userInputDiv.innerHTML = '';
	newDiv = document.createElement('div');
	resultDiv.innerHTML = '';
	const nameInfoMsg = document.createElement('h6');
	userInputDiv.appendChild(nameInfoMsg);
	nameInfoMsg.classList.add('text-muted', 'mt-3');
	nameInfoMsg.innerText = 'Player names will appear here...';
	const resultInfoMsg = document.createElement('h6');
	resultDiv.appendChild(resultInfoMsg);
	resultInfoMsg.classList.add('text-muted');
	resultInfoMsg.innerText = 'Player names will appear here...';
};

const shuffle = (nameArray) => {
	for (let i = nameArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		temp = nameArray[j];
		nameArray[j] = nameArray[i];
		nameArray[i] = temp;
	}
	return nameArray;
};

const createShuffledList = (nameArray, maxPerTeam) => {
	const resultDiv = document.querySelector('#result-div');
	/// figure out how to divide the players, and what players remain.
	const numOfTeams = Math.floor(nameArray.length / maxPerTeam);
	const remainingPlayers = nameArray.length % maxPerTeam;
	// console.log(numOfTeams, remainingPlayers);
	let j = 0;

	for (let i = 0; i < numOfTeams; i++) {
		// create title with team name
		const teamTitle = document.createElement('h5');
		const newUl = document.createElement('ul');
		resultDiv.appendChild(teamTitle);
		teamTitle.classList.add('team-title');
		teamTitle.innerText = `Team ${i + 1}`;
		//create a new array out of the original name array, contianing only the relevant # of players
		const teamArr = nameArray.slice(j, j + maxPerTeam);
		// iterate the starting position of the split, by the number of players per team...
		j += maxPerTeam;
		console.log(`team ${i + 1}`, teamArr);
		//CREATE A SUB-LIST containing the team.
		resultDiv.appendChild(newUl);
		for (let name of teamArr) {
			const newLi = document.createElement('li');
			newUl.appendChild(newLi);
			newLi.classList.add('player-result-list');
			newLi.innerText = name;
		}
	}
	if (remainingPlayers !== 0) {
		const teamTitle = document.createElement('h5');
		const newUl = document.createElement('ul');
		resultDiv.appendChild(teamTitle);
		teamTitle.classList.add('team-title');
		if (remainingPlayers > 1) {
			teamTitle.innerText = 'Round Robin Players';
		} else teamTitle.innerText = 'Round Robin Player';
		const remainingPlayerArr = nameArray.slice(remainingPlayers * -1);
		resultDiv.appendChild(newUl);
		console.log(remainingPlayerArr);
		for (let name of remainingPlayerArr) {
			const newLi = document.createElement('li');
			newUl.appendChild(newLi);
			newLi.classList.add('player-result-list');
			newLi.innerText = name;
		}
	}
};

///next steps///
// COMPLETED // add an ability to run it back & refresh √
// replace your alerts with some other error...
//  ---- when you dont have a # selected and hit generate, it still submits after the error.
// generate teams should reset the result Div first.
// what happens if players per team exceeds players entered?

//make it look nice : )
// need to format the text as it comes in
///can we add different columns to prevent overflow?
