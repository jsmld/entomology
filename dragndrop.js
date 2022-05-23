const list_items = document.querySelectorAll('.list-item');
const lists = document.querySelectorAll('.list');
const clicky = document.querySelector('#da-button');

let draggedItem = null;

const dragItUpFor = (item) => {
	item.addEventListener('dragstart', function () {
		console.log("Start");
		draggedItem = item;
		setTimeout(function () {
			item.style.display = 'none';
		}, 0);
	});

	item.addEventListener('dragend', function () {
		console.log("End");
		setTimeout(function () {
			draggedItem.style.display = 'block';
			draggedItem = null;
		}, 0)
	});
};
 
// initial setup
for (let i = 0; i < list_items.length; i++) {
	const item = list_items[i];

	dragItUpFor(item);


	for (let j = 0; j < lists.length; j ++){
		const list = lists[j]; 

		list.addEventListener('dragover', function (e) {
			e.preventDefault();
		})
		list.addEventListener('drapenter', function(e) {
			e.preventDefault(); 
			this.backgroundColor = 'rgba(0, 0, 0, 0.2)';

		})
		list.addEventListener('dragleave', function (e) {
			e.preventDefault();
			this.backgroundColor = 'rgba(0, 0, 0, 0.1)';

		})
		list.addEventListener('drop', function (e) {
			this.append(draggedItem);
			this.backgroundColor = 'rgba(0, 0, 0, 0.1)';

		})
	}
} 


clicky.addEventListener('click', function (e) {
	e.preventDefault();
	console.log("gidday");
	const element = document.createElement('div');
	element.setAttribute("class", "list-item");
	element.setAttribute("draggable", "true");
	element.textContent = "REEEEEEEEEEEE";
	dragItUpFor(element);
	document.getElementById("2").appendChild(element);
})