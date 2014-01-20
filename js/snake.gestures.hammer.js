(function()
{
	'use strict';	
	var snake = window['snake'];
	var _params;
	
	snake.setGestures = function()
	{
		_params = snake.getParams();

		console.log(_params['swipe_velocity']);

		var hammertime = Hammer(window,
		{
			swipe_velocity: _params['swipe_velocity']
		});

		snake.setSwipe(hammertime, 'swipeleft', 'left');
		snake.setSwipe(hammertime, 'swiperight', 'right');
		snake.setSwipe(hammertime, 'swipeup', 'up');
		snake.setSwipe(hammertime, 'swipedown', 'down');
		
		hammertime.on('doubletap', function()
		{
			if(_params['status']=='stopped')
				return false;				
	
			if(_params['status']=='paused')
				snake.resume();
			else
				snake.pause();
		});			
	};

	snake.setSwipe = function(obj, swipe, direction)
	{
		obj.on(swipe, function()
		{
			if(_params['status']=='stopped' || _params['status']=='paused')
				return false;

			_params['direction'] = direction;
		});
	};
})();