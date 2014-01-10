(function()
{
	'use strict';	
	var snake = window['snake'];
	
	snake.setGestures = function()
	{
		var _params = snake.getParams();
		var _w = $$(window);
		
		_w.on('swipeLeft', function()
		{
			if(_params['status']=='stopped' || _params['status']=='paused' || _params['locked']==true)
				return false;
	
			if(_params['direction']!='right')
					_params['direction'] = 'left';
	
			_params['locked'] = true;
		});
		
		_w.on('swipeRight', function()
		{
			if(_params['status']=='stopped' || _params['status']=='paused' || _params['locked']==true)
				return false;
	
			if(_params['direction']!='left')
					_params['direction'] = 'right';
	
			_params['locked'] = true;
		});
		
		_w.on('swipeUp', function()
		{
			if(_params['status']=='stopped' || _params['status']=='paused' || _params['locked']==true)
				return false;
	
			if(_params['direction']!='down')
					_params['direction'] = 'up';
	
			_params['locked'] = true;
		});
		
		_w.on('swipeDown', function()
		{
			if(_params['status']=='stopped' || _params['status']=='paused' || _params['locked']==true)
				return false;
	
			if(_params['direction']!='up')
					_params['direction'] = 'down';
	
			_params['locked'] = true;
		});	
		
		_w.on('doubleTap', function()
		{
			if(_params['status']=='stopped' || _params['locked']==true)
				return false;				
	
			if(_params['status']=='paused')
				snake.resume();
			else
				snake.pause();
		});			
	};
})();