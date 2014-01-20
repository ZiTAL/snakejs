(function()
{
	'use strict';	
	var snake = window['snake'];
	var _params = snake.getParams();
	
	snake.setGestures = function()
	{
		snake.setSwipe('swipeLeft', 'left', 'right');
		snake.setSwipe('swipeRight', 'right', 'left');
		snake.setSwipe('swipeUp', 'up', 'down');
		snake.setSwipe('swipeDown', 'down', 'up');		
		
		$$(window).on('doubleTap', function()
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
		$$(window).on(swipe, function()
		{
			if(_params['status']=='stopped' || _params['status']=='paused')
				return false;
	
			if(_params['direction']!=direction)
					_params['direction'] = not_direction;
		});
	};
})();