'use strict';


function generateFieldElements(size) {
	size = size ** 2;//total elements number
	let numbers = new Set(); 

	while(numbers.size < size) { //gen unique numbers
		let number = Math.floor(Math.random() * 100) + 1;
		numbers.add(number);
	}

	let elems = [];
	for(let num of numbers) { //gen elements with color
		let elem = {
			number: num,
			color: [
				Math.floor(Math.random() * 255),
				Math.floor(Math.random() * 255),
				Math.floor(Math.random() * 255)
			]
		}
		elems.push(elem);
	}

	return elems;
}

function disableControls(...controls) {
	for(let control of controls){
		control.disabled = true;
	}
}

function enableControls(...controls) {
	for(let control of controls){
		control.disabled = false;
	}	
}

function shuffleArr(arr) {
	let copyArr = arr.slice();
    for (let i = copyArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copyArr[i], copyArr[j]] = [copyArr[j], copyArr[i]];
    }

    return copyArr;
}


function displayEmptyField(wrapper, size) {
	wrapper.innerHTML = '';//delete prev field
	
	for(let i = 0; i < size; i++){
		let htmlRow  = document.createElement('p');
		htmlRow.setAttribute('class', 'field-row');

		for(let j = 0; j < size; j++){
			let htmlElem = document.createElement('span');
			htmlElem.setAttribute('class', 'field-elem element');
			htmlElem.setAttribute('draggable', true);
			htmlRow.appendChild(htmlElem);
		}
		wrapper.appendChild(htmlRow);
	}
}

function passValuesToField(wrapper, values) {
	let htmlElems = wrapper.getElementsByClassName('field-elem');
	let valsIter = values[Symbol.iterator]();

	for(let elem of htmlElems){
		let iterValue = valsIter.next().value;
		elem.innerHTML = iterValue.number;
		elem.style.backgroundColor = 
			`rgb(${iterValue.color[0]}, ${iterValue.color[1]}, ${iterValue.color[2]})`;
	}
}

function displayAnswersVariants(wrapper, field) {
	for(let elem of shuffleArr(field)) { 
		let answerCard = document.createElement('p');

		answerCard.setAttribute('class', 'answer-elem element');
		answerCard.setAttribute('data-value', elem.number);
		answerCard.setAttribute('draggable', true);
		answerCard.innerHTML = elem.number;
		answerCard.style.backgroundColor = 
			`rgb(${elem.color[0]}, ${elem.color[1]}, ${elem.color[2]})`;
			
		wrapper.appendChild(answerCard);
	}
}