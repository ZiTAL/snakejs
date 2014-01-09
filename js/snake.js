(function(_window, _document)
{
	'use strict';	

	var _instance;
	var _container_size = 10;
	var _params =
	{
		'direction': 'right',
		'locked': false,
		'add_tail': false,
		'status': 'running',
		'score': 0
	};
	var _snake_position = [0+3, 0+2, 0+1];

	var snake =
	{
		start: function()
		{
			var self = this;
			_window.setTimeout(function()
			{
				self.createGame();
				self.createScore();
				self.setEvents();
				self.createFruit();
				if(typeof self['setGestures'] == 'function')
					self.setGestures();
				self.loop();				
			}, 300);
		},
		pause: function()
		{
			_params['status'] = 'paused';
			_window.clearTimeout(_instance);
		},
		resume: function()
		{
			var self = this;

			_params['status'] = 'running';
			self.loop();			
		},
		stop: function()
		{
			var self = this;
			_params['status'] = 'stopped';
			_window.alert('GAME OVER');
		},
		
		move: function(position)
		{
			var self = this;
			
			var before = _document.getElementById('game').getElementsByTagName('div')[_snake_position[0]];

			var p;
			if(position=='left')
				p = _snake_position[0] - 1;
			else if(position=='right')
				p = _snake_position[0] + 1;
			else if(position=='up')
				p = _snake_position[0] - _container_size;
			else if(position=='down')
				p = _snake_position[0] + _container_size;
			
			var after = _document.getElementById('game').getElementsByTagName('div')[p];
			
			if(typeof after=='undefined')
			{
				self.stop();
				return false;
			}
			else if(position=='left' || position=='right')
			{
				if(before.getAttribute('data-row')!=after.getAttribute('data-row'))
				{
					self.stop();
					return false;
				}
			}
			
			_snake_position.splice(0, 0, p);
			if(_params['add_tail']==false)
				_snake_position.pop();
			_params['add_tail'] = false;			
		},
		
		loop: function()
		{
			if(_params['status']=='stopped')
				return false;

			var self = this;
			_params['locked'] = false;
			self.paint();
			_instance = _window.setTimeout(function()
			{
				self.move(_params['direction']);
				var fruit_i = _document.getElementById('fruit').getAttribute('data-i');
				if(_snake_position[0]==fruit_i)
				{
					self.createFruit();
					self.addScore(10);
					_params['add_tail'] = true;
				}
				self.loop();
			}, 200);
		},
		
		paint: function()
		{
			var b = _document.getElementById('game').getElementsByTagName('div');
			var l = b.length;
			for(var j=0;j<l;j++)
			{
				var i = parseInt(b[j].getAttribute('data-i'));
				if(_snake_position.contains(i))
					b[j].className = 'block snake';
				else
					b[j].className = 'block';
			}
		},
		
		createFruit: function()
		{
			var self = this;
			self.deleteFruit();
			var min = 0;
			var max = _container_size * _container_size;
			var blocks = _document.getElementsByClassName('block');
			var l = blocks.length;
			do
			{
				var p = self.getRandom(min, max);
				if(blocks[p].className=='block snake')
					p = undefined;
			}
			while(typeof p=='undefined')

			for(var i=0;i<l;i++)
			{
				if(i==p)
				{
					blocks[i].setAttribute('id', 'fruit');
					break;
				}
			}
		},
		
		deleteFruit: function()
		{
			var f = _document.getElementById('fruit');
			if(f!=null)
				f.removeAttribute('id');
		},
		
		addScore: function(num)
		{
			_params['score'] += num;
			var count = _document.getElementById('count');
			count.removeChild(count.firstChild);
			count.appendChild(_document.createTextNode(_params['score']));
		},
		
		getRandom: function (min, max)
		{
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},		

		// create 
		createGame: function()
		{
			var self = this;
			self.createContainer();
			self.createBlocks();				
		},
		
		createContainer: function()
		{
			var self = this;
			var size;
			
			// get window size
			var window_size = self.getWindowSize();

			if(window_size['width']>window_size['height'])
				size = window_size['height'];
			else
				size = window_size['width'];
			// remove border size
			size = size - 2 - 40;

			// _container_size multiple
			while(size%_container_size!=0)
				size--;
			
			// create div
			var div = _document.createElement('div');
			div.setAttribute('id', 'game');
			div.style.width = size+"px";
			div.style.height = size+"px";
			
			// add to body
			_document.getElementsByTagName('body')[0].appendChild(div);			
		},
		
		createBlocks: function()
		{			
			var container = _document.getElementById('game');
			// remove border
			var size = container.offsetWidth - 2;
			size = size / _container_size;
			
			var row = 0;
			var col = 0;
			var size2 = _container_size*_container_size;
			for(var i=0; i<size2; i++)
			{		
				var div = _document.createElement('div');
				div.className = 'block';
				div.style.width = size+"px";
				div.style.height = size+"px";
				div.setAttribute('data-row', row);
				div.setAttribute('data-col', col);
				div.setAttribute('data-i', i);
				
				container.appendChild(div);
				
				col++;
				if(col>_container_size-1)
				{
					col = 0;
					row++;
				}
			}
		},
		
		getWindowSize: function()
		{
			var w = _window,
				d = _document,
				e = d.documentElement,
				g = d.getElementsByTagName('body')[0],
				x = w.innerWidth || e.clientWidth || g.clientWidth,
				y = w.innerHeight|| e.clientHeight|| g.clientHeight;		
			var size =
			{
				'width': x,
				'height': y
			};
			return size;
		},
		
		createScore: function()
		{
			var div = document.createElement('div');
			div.setAttribute('id', 'score');
			var span = document.createElement('span');
			span.appendChild(_document.createTextNode('score: '));
			div.appendChild(span);
			var span = document.createElement('span');
			span.setAttribute('id', 'count'); 
			span.appendChild(_document.createTextNode('0'));
			div.appendChild(span);			
			_document.getElementsByTagName('body')[0].appendChild(div);
		},
		
		getParams: function()
		{
			return _params;
		},
		
		setEvents: function()
		{
			var self = this;

			_window.addEventListener('keydown', function(e)
			{	
				if(_params['locked']==false)
				{
					if(e.keyCode=='37')
					{
						if(_params['direction']!='right')
								_params['direction'] = 'left';
					}
					else if(e.keyCode=='39')
					{
						if(_params['direction']!='left')
								_params['direction'] = 'right';
					}
					else if(e.keyCode=='38')
					{
						if(_params['direction']!='down')
							_params['direction'] = 'up';
					}
					else if(e.keyCode=='40')
					{
						if(_params['direction']!='up')
							_params['direction'] = 'down';
					}					
				}

				if(e.keyCode=='32')
				{
					if(_params['status']=='stopped')
						return false;

					if(_params['status']=='paused')
						self.resume();
					else
						self.pause();
				}

				_params['locked'] = true;
				
			}, false);			
		}
	};

	_window['snake'] = snake;
})(window, document);