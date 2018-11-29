/*
Method Name: Array.prototype.sortnum()
Usage: yourArray.sortnum('merge'|'bubble'|'insertion'|'selection' , [true|false]);
Description: Expansion for Array.prototype, with a sorting algoritms set
focused on numeric one-dimensional array operations. This method will modify the original array.
NOT SUITABLE FOR NON NUMERICAL ARRAYS! 
Implemented sorting methods: Merge sort, Bubble sort, Selection sort and Insertion sort
Version: 1.0.2
Author: c0lx1
Author URI: http://www.colxi.info/
*/
/*
    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
*/

// sortnumFilterNaN (bool): Enable/disable array contents validation, in each
// sortnum() call. 
// usage : yourArray.sortnumFilterNaN = true;
// When enabled, sortnum() will iterate over the array and remove null
// and NaN keys, for unexpected sorting behaviours. Enable it if 
// you don't trust the array source. 
Array.prototype.sortnumFilterNaN = false;


// sortnum() operates over the array with the choosen sorting method. This function
// will modify the original array, and return as output a copy of it.
// Accepted parameters :
// - method : 	'merge'|'bubble'|'insertion'|'selection'
//				Will determine the sorting method to be used. Any other
//				input, will be ignored, and original array returned.
// - _filterNaN:[true|false] 
//				Key filtering validation can be enabled single time
//				via this optional argument. If unset, will apply this.sortnumFilterNaN.
Array.prototype.sortnum = function(method,_filterNaN){
	// ---- VAR DECLARATIONS ----
	
	var size = this.length;
	var temp;
	var temp2;
	
	// ---- ARRAY ITEMS VALIDATION (if requested/setted) ----
	
	_filterNaN = (_filterNaN == null)? this.sortnumFilterNaN : _filterNaN;
	if(_filterNaN){
		// iterate and remove all NaN element and empty keys.
		for(var i= 0; i < this.length; i++){
			if(typeof this[i] !== "number"){
				this.splice(i,1) ;
				size--;
				i--;
			};
		};
	};
	
	// ---- SORTING METHOD SELECTOR  ----
	
	if(method == "merge"){
		// Merge sort Algoritm implementation (recursive function)
		// +info : http://en.wikipedia.org/wiki/Merge_sort
		if (size < 2) return this;
		var middle 	= parseInt(size / 2);
		var left 	= this.slice(0, middle).sortnum("merge",false);		//do recursion
		var right  	= this.slice(middle, size).sortnum("merge",false);  // do recursion
		this.length = 0;	// clear original array cheat
		while (left.length && right.length) {
			if (left[0] <= right[0]) this.push(left.shift());
			else this.push(right.shift());
		}
		while (left.length)  this.push(left.shift());
		while (right.length) this.push(right.shift());
		return this;
	}
	
	else if(method == "bubble"){
		// Bubble sort Algoritm implementation
		// +info : http://en.wikipedia.org/wiki/Bubble_sort
		var action = true;
		while(action){
			action = false;
			for(var i=0 ; i < size -1; i++){
				if(this[i+1] < this[i]){
					temp 		= this[i];
					this[i] 	= this[i+1];
					this[i+1] 	= temp;
					action 		= true;
				};
			};
		};
		return this;
	}
	
	else if(method == "insertion"){
		// Insertion sort Algoritm implementation
		// +info : http://en.wikipedia.org/wiki/Insertion_sort
		for (var i = 1; i < size; i++){
			temp 	= this[i];
			var j 	= i - 1;
			while (j >= 0 && this[j] > temp){
				this[j+1] = this[j];
				j--;
			};
			this[j+1] = temp;
		};
		return this;
	}
	
	else if(method = "selection"){
		// Insertion sort Algoritm implementation
		// +info : http://en.wikipedia.org/wiki/Selection_sort
		for (var i = 0; i < size; i++){
			temp = i;
			for (var j = i+1; j < size; j++) {
				if (this[j] < this[temp]) temp = j;
			}
			temp2 = this[temp];
			this[temp] = this[i];
			this[i] = temp2;
		};
		return this;
	};
	
	// return original array if requested method is not implementeed
	return this;	
};