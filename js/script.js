'use strict';



window.onload = function (e) {

	//controls
	const startBtn = document.getElementById('start-btn');
	const checkBtn = document.getElementById('check-btn');
	const refreshBtn = document.getElementById('refresh-btn');

	const sizeInp = document.getElementById('size-inp');
	sizeInp.getValue = function () {
		
		if(+(this.value) >= +(this.min) && +(this.value) <= +(this.max)) // min <= value <= max
			return this.value;
		return this.min;
	}

	const speedInp = document.getElementById('speed-inp');
	const speedDisplay = document.getElementsByClassName('speed-val')[0];
	speedDisplay.innerHTML = speedInp.value;
	
	//DOM elements
	const fieldWrap = document.getElementById('field-wrapper');
	const answersWrap = document.getElementById('answers-wrapper');

	//field elements;
	let field;

	displayEmptyField(fieldWrap, sizeInp.getValue());

	//event handlers
	speedInp.addEventListener('input', function() {
		speedDisplay.innerHTML = this.value;
	});

	sizeInp.addEventListener('input', () =>	displayEmptyField(fieldWrap, sizeInp.getValue()));

	refreshBtn.addEventListener('click', () => (location.reload()));

	startBtn.addEventListener('click', function () {
		field = generateFieldElements(sizeInp.getValue());

		disableControls(sizeInp, speedInp, startBtn);
		passValuesToField(fieldWrap, field);

		setTimeout(function(){
			enableControls(checkBtn);
			displayEmptyField(fieldWrap, sizeInp.getValue());
			displayAnswersVariants(answersWrap, field);
			
			let fieldElems = fieldWrap.getElementsByClassName('field-elem');
		
			for(let elem of fieldElems) {
				elem.addEventListener('dragstart', dragStart);
				elem.addEventListener('dragover', dragOver);
				elem.addEventListener('drop', dropFieldElem);
			}

			let answerElems = answersWrap.getElementsByClassName('answer-elem');

			for(let elem of answerElems) {
				elem.addEventListener('dragstart', dragStart);
				elem.addEventListener('dragover', dragOver);
			}


		}, speedInp.value * 1000); // calculate in milliseconds
	});

	checkBtn.addEventListener('click', function() {
		let answers = fieldWrap.getElementsByClassName('field-elem');
		let fieldIter = field[Symbol.iterator]();

		for(let answer of answers) {
			if(answer.getAttribute('data-value') != fieldIter.next().value.number) { // answer != field element
				answer.style.border = '3px dashed red';
			} else {
				answer.style.border = '3px dashed green';
			}
		}
	});

}