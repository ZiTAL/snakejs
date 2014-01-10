(function()
{
	'use strict';	
	var snake = window['snake'];
	
	snake.setGestures = function()
	{
		var _params = snake.getParams();
		var _w = window;
		
		Hammer(_w).on('swipeleft', function()
		{
			if(_params['status']=='stopped' || _params['status']=='paused' || _params['locked']==true)
				return false;
	
			if(_params['direction']!='right')
					_params['direction'] = 'left';
	
			_params['locked'] = true;
		});
		
		Hammer(_w).on('swiperight', function()
		{
			if(_params['status']=='stopped' || _params['status']=='paused' || _params['locked']==true)
				return false;
	
			if(_params['direction']!='left')
					_params['direction'] = 'right';
	
			_params['locked'] = true;
		});
		
		Hammer(_w).on('swipeup', function()
		{
			if(_params['status']=='stopped' || _params['status']=='paused' || _params['locked']==true)
				return false;
	
			if(_params['direction']!='down')
					_params['direction'] = 'up';
	
			_params['locked'] = true;
		});
		
		Hammer(_w).on('swipedown', function()
		{
			if(_params['status']=='stopped' || _params['status']=='paused' || _params['locked']==true)
				return false;
	
			if(_params['direction']!='up')
					_params['direction'] = 'down';
	
			_params['locked'] = true;
		});	
		
		Hammer(_w).on('doubletap', function()
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