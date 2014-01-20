(function()
{
	'use strict';	
	var snake = window['snake'];
	var _params = snake.getParams();
	
	snake.setGestures = function()
	{
		snake.setSwipe('swipeleft', 'left', 'right');
		snake.setSwipe('swiperight', 'right', 'left');
		snake.setSwipe('swipeup', 'up', 'down');
		snake.setSwipe('swipedown', 'down', 'up');
		
		Hammer(window).on('doubletap', function()
		{
			if(_params['status']=='stopped')
				return false;				
	
			if(_params['status']=='paused')
				snake.resume();
			else
				snake.pause();
		});			
	};

	snake.setSwipe = function(swipe, direction, not_direction)
	{
		Hammer(window).on(swipe,
		{
			swipe_velocity: _params['swipe_velocity']
		}, function()
		{
			if(_params['status']=='stopped' || _params['status']=='paused')
				return false;
	
			if(_params['direction']!=not_direction)
					_params['direction'] = direction;
		});
	};
})();