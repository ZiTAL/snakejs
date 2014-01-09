(function()
{
    'use strict';

	var contains = function(value)
	{
		var i = this.length;
		while (i--)
		{
			if (this[i] === value)
				return true;
		}
		return false;
	};

	Object.defineProperty(Array.prototype, 'contains', {value: contains, enumerable: false});
})();