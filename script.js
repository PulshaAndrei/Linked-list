function List(){
	this.size = 0;
	this.start = null;
	this.end = null; 
};

function Node(value,prev,next) {
	this.value=value;
	this.next=next;
	this.prev=prev;
};

List.prototype.head = function() {
	return this.start;
};

List.prototype.tail = function() {
	return this.end;
};

List.prototype.append = function(elem) {
	var new_elem = new Node(elem, this.end, null);
	if (this.start == null) {
		this.start = new_elem;
		this.end = new_elem;
	}
	else this.end.next = new_elem;
	this.end = new_elem;
	this.size++;
	return this;
};

List.prototype.at = function (index) {
	if (index >= this.size || index < 0) throw("Error index!");
	var temp = this.start;
	for (var i = 0; i < index; i++) {
		temp = temp.next;
	};
	return temp;
};

List.prototype.deleteAt = function(index) {
	var temp = this.at(index);
	if (temp.next != null) temp.next.prev = temp.prev;
	else this.end = temp.prev;
	if (temp.prev != null) temp.prev.next = temp.next; 
	else this.start = temp.next;
	this.size--;
	return this;
};

List.prototype.insertAt = function(index, elem) {
	var temp = new Node(null, null, this.start);
	if (index != 0) temp = this.at(index-1);
	var new_elem = new Node(elem, temp, temp.next);
	if (temp.next != null) temp.next.prev = new_elem;
	else this.end = new_elem;
	temp.next = new_elem;
	if (temp.prev == null) this.start = new_elem;
	this.size++;
	return this;
};

List.prototype.reverse = function () {
	var new_list = new List();
	var right = this.end;
	var left = this.start;	
	new_list.append(right.value);
	while (left != right) {
		right = right.prev;
		new_list.append(right.value);
	};
	return new_list;
};

List.prototype.indexOF = function (value) {
	var temp = this.start;
	for (var i = 0; i < this.size-1 && temp.value != value; i++) {
		temp = temp.next;
	};
	if (temp.value == value) return i;
	else return -1;
};


List.prototype.each = function (func) {
	var temp = this.start;
	var new_list = new List();
	for (var i = 0; i < this.size; i++) {
		new_list.append(func(temp.value));
		temp = temp.next;
	};
	return new_list;
};

//Test
/*
List.prototype.print = function() {
	var temp = this.start;
	while (temp != null) {	
		console.log(temp.value);	
		temp = temp.next;
	}
};


function times2(x) {
	return x*2
};

var list = new List();
list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.print();
list.deleteAt(0);
list.print();
list.insertAt(3,44);
list.print();
console.log(list.indexOF(44));
list.reverse().print();
list.each(times2).print();
*/