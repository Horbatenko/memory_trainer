'use strict';

let dragElement;

function dragStart(e) {
	dragElement = this;
}

function dragOver(e) {
	e.preventDefault();
}

function dropFieldElem(e) {
	e.preventDefault();

	//swap content and color
	[this.innerHTML, dragElement.innerHTML] = [dragElement.innerHTML, this.innerHTML];
	[this.style.backgroundColor, dragElement.style.backgroundColor] = 
		[dragElement.style.backgroundColor, this.style.backgroundColor];

	//swap data attributes
	let oldTargetData = Number(this.getAttribute('data-value')) || null;
	this.setAttribute('data-value', dragElement.getAttribute('data-value'));
	dragElement.setAttribute('data-value', oldTargetData);

	//remove if dragged on empty element or from answers buffer
	if(oldTargetData == null && !dragElement.classList.contains('field-elem')){
		dragElement.remove();
	}

}