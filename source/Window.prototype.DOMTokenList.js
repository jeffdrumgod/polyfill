// Window.prototype.DOMTokenList
(function () {
	function getStringTokenIndex(list, token) {
		if (validator.test(token)) {
			return ArrayPrototype.indexOf.call(list, token);
		} else {
			throw new Error('InvalidCharacterError: DOM Exception 5');
		}
	}

	var DOMTokenList = window.DOMTokenList = Window.prototype.DOMTokenList = function DOMTokenList() {
		throw new Error('Illegal constructor');
	},
	validator = /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/,
	ArrayPrototype = Array.prototype;

	DOMTokenList.prototype = {
		constructor: DOMTokenList,
		length: ArrayPrototype.length,
		item: function item(index) {
			return this[parseFloat(index)];
		},
		contains: function contains() {
			var
			token = String(arguments[0]),
			index = getStringTokenIndex(this, token);

			return index !== -1;
		},
		add: function add() {
			var
			token = String(arguments[0]),
			index = getStringTokenIndex(this, token);

			if (index === -1) {
				ArrayPrototype.push.call(this, token);

				this._element.setAttribute('class', this.toString());
			}
		},
		remove: function remove() {
			var
			token = String(arguments[0]),
			index = getStringTokenIndex(this, token);

			if (index !== -1) {
				ArrayPrototype.splice.call(this, index, 1);

				this._element.setAttribute('class', this.toString());
			}
		},
		toggle: function toggle() {
			var
			token = String(arguments[0]),
			index = getStringTokenIndex(this, token),
			hasnt = index === -1;

			if (hasnt) {
				ArrayPrototype.push.call(this, token);
			} else {
				ArrayPrototype.splice.call(this, index, 1);
			}

			this._element.setAttribute('class', this.toString());

			return hasnt;
		},
		toString: function () {
			return ArrayPrototype.join.call(this, ' ');
		}
	};
})();