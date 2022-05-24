const listItems = document.querySelectorAll('.list-item');
const lists = document.querySelectorAll('.list');
const clicky = document.querySelector('#da-button');
const middleList = document.getElementById("2");
let draggedItem = null;

const cleanUpItemDragging = (item) => {
	item.addEventListener('dragstart', function () {
		draggedItem = item;
		setTimeout(function () {	// tiny delay needed I don't know why
			item.style.visibility = 'hidden';
		}, 0);
	});

	item.addEventListener('dragend', function () {
		draggedItem.style.visibility = 'initial'
		draggedItem.classList.remove("selected");
		setTimeout(function () {	// tiny delay needed I don't know why
			draggedItem = null;
		}, 0);
	});
};

const itemsFor = (list) => {
	return [...list.querySelectorAll('.list-item')];
};

const getYPositionOfCenter = (e) => {
	const rect = e.getBoundingClientRect();
	return (rect.top + (rect.height/2));
}

const cleanupDragForLists = () => {
	for (let j = 0; j < lists.length; j++){
		const list = lists[j]; 
	
		list.addEventListener('dragover', function (e) {
			e.preventDefault();
		})
		list.addEventListener('dragenter', function(e) {
			e.preventDefault(); 
			this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';

		})
		list.addEventListener('dragleave', function (e) {
			e.preventDefault();
			this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
	
		})
		list.addEventListener('drop', function (e) {
			mouseY = e.clientY;
			const listChildren = itemsFor(list);
			let firstItemLowerThanMouse;

			if(listChildren.length === 0) { 
				list.append(draggedItem);
			} else {
				firstItemLowerThanMouse = listChildren.find(item => (getYPositionOfCenter(item) - mouseY) >= 0);
				if(firstItemLowerThanMouse !== null) {
					console.log("YEY");
					// debugger;
					list.insertBefore(draggedItem, firstItemLowerThanMouse);
				} else {
					list.append(draggedItem);
				}
			}
			
			this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
		})
	}
};

const makeSelectable = (item) => {
	item.addEventListener('click', function () {
		item.classList.toggle("selected");
	});
}


const setupDragAndDrop = () => {
	cleanupDragForLists();

	for (let i = 0; i < listItems.length; i++) {
		const item = listItems[i];
		cleanUpItemDragging(item);
		makeSelectable(item);
	} 
};

setupDragAndDrop();




const createListItem = () => {
	const element = document.createElement('div');
	element.setAttribute("class", "list-item");
	element.setAttribute("draggable", "true");
	element.textContent = "REEEEEEEEEEEE";
	cleanUpItemDragging(element);
	makeSelectable(element);
	middleList.appendChild(element);
}

clicky.addEventListener('click', function (e) {
	e.preventDefault();
	createListItem();
})