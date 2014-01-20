(function()
{
	'use strict';

	var _instance;
	
	var _params =
	{
		'direction': 'right',
		'locked': false,
		'add_tail': false,
		'status': 'running',
		'score': 0
	};

	var _snake_position;

	var _snake_size;
	var _container_size;
	var _speed;
	var _swipe_velocity;

	var _body;
	var _game;

	var _self;

	var snake =
	{
		setParams: function(public_params)
		{
			_self = this;
			_body = document.getElementsByTagName('body')[0];

			// get params from localstorage
			var tmp_public_params = JSON.parse(localStorage.getItem('snake_public_params'));
			if(tmp_public_params!=null)
				public_params = tmp_public_params;

			localStorage.setItem('snake_public_params', JSON.stringify(public_params));

			// set container size
			_container_size = public_params['container_size'];

			// set speed
			_speed = public_params['speed'];

			// snake size
			_snake_size = public_params['snake_size'];

			// swipe velocity
			_swipe_velocity = public_params['swipe_velocity'];			
			console.log(_swipe_velocity);

			_snake_position = [];

			// build snake's tail
			for(var i=0;i<public_params['snake_size'];i++)
				_snake_position.push(public_params['snake_size']-i);

		},
		main: function()
		{
			_self.createContainer('info');
			_game.className = 'main';

			var p = document.createElement('p');
			
			var img = document.createElement('img');
			img.setAttribute('src', 'img/snake.png');
			
			var input = document.createElement('input');
			input.value = 'start';
			input.setAttribute('type', 'button');
			input.addEventListener('click', function()
			{
				_self.start();
			}, false);
			p.appendChild(img);
			var br = document.createElement('br');
			p.appendChild(br);
			p.appendChild(input);
			_game.appendChild(p);

			var p = document.createElement('p');
			var input = document.createElement('input');
			input.value = 'config';
			input.setAttribute('type', 'button');
			input.addEventListener('click', function()
			{
				_self.config();
			}, false);
			p.appendChild(input);			
			_game.appendChild(p);			

			var p = document.createElement('p');
			var input = document.createElement('input');
			input.value = 'instructions';
			input.setAttribute('type', 'button');
			input.addEventListener('click', function()
			{
				_self.instructions();
			}, false);
			p.appendChild(input);
			_game.appendChild(p);

			var p = document.createElement('p');
			var input = document.createElement('input');
			input.value = 'about';
			input.setAttribute('type', 'button');
			input.addEventListener('click', function()
			{
				_self.about();
			}, false);
			p.appendChild(input);			
			_game.appendChild(p);
		},
		config: function()
		{
			_self.createContainer('info');
			_game.className = 'main';

			var form = document.createElement('form');
			form.setAttribute('method', 'post');
			form.addEventListener('submit', function(e)
			{
				e.preventDefault();
				var inputs = this.getElementsByTagName('input');
				var public_params = {};
				for(var i=0;i<inputs.length;i++)
				{
					if(inputs[i].getAttribute('type')=='text')
					{
						if(inputs[i].getAttribute('name')=='swipe_velocity')
							public_params[inputs[i].getAttribute('name')] = parseFloat(inputs[i].value);
						else
							public_params[inputs[i].getAttribute('name')] = parseInt(inputs[i].value);
					}
				}

				if((parseInt(public_params['snake_size'])>=parseInt(public_params['container_size']))
				   	|| (public_params['snake_size']<1)
					|| (parseInt(public_params['container_size'])<10 || parseInt(public_params['container_size'])>30)
					|| (parseInt(public_params['_speed'])<50 || parseInt(public_params['speed'])>500)
					|| (public_params['container_size']==null || public_params['snake_size']==null || public_params['speed']==null)
					|| (parseFloat(public_params['swipe_velocity'])<0.1 || parseFloat(public_params['swipe_velocity'])>2)
				)
				{
					window.alert('Respect the max and minimum params madafaka!');
				}
				else
				{
					localStorage.setItem('snake_public_params', JSON.stringify(public_params));
					_self.setParams();
					window.location.href = window.location.href;
				}
			}, false);

			

			var p = document.createElement('p');
			var span = document.createElement('span');
			span.appendChild(document.createTextNode('snake size (min 1, max[container_size]: '));
			var input = document.createElement('input');
			input.value = _snake_size;
			input.setAttribute('type', 'text');
			input.setAttribute('name', 'snake_size');
			input.setAttribute('size', '2');
			input.setAttribute('maxlength', '2');			
			p.appendChild(span);
			var br = document.createElement('br');
			p.appendChild(br);
			p.appendChild(input);
			var br = document.createElement('br');
			p.appendChild(br);			

			var span = document.createElement('span');
			span.appendChild(document.createTextNode('container size (min 10, max 30): '));
			var input = document.createElement('input');
			input.value = _container_size;
			input.setAttribute('type', 'text');
			input.setAttribute('name', 'container_size');
			input.setAttribute('size', '2');	
			input.setAttribute('maxlength', '2');
			p.appendChild(span);
			var br = document.createElement('br');
			p.appendChild(br);			
			p.appendChild(input);
			var br = document.createElement('br');
			p.appendChild(br);

			var span = document.createElement('span');
			span.appendChild(document.createTextNode('speed (min 50, max 500): '));
			var input = document.createElement('input');
			input.value = _speed;
			input.setAttribute('type', 'text');
			input.setAttribute('name', 'speed');
			input.setAttribute('size', '3');			
			input.setAttribute('maxlength', '3');
			p.appendChild(span);
			var br = document.createElement('br');
			p.appendChild(br);
			p.appendChild(input);
			var br = document.createElement('br');
			p.appendChild(br);			

			var span = document.createElement('span');
			span.appendChild(document.createTextNode('swipe speed (default: 0.7, min: 0.1, max: 2.0): '));
			var input = document.createElement('input');
			input.value = _swipe_velocity;
			input.setAttribute('type', 'text');
			input.setAttribute('name', 'swipe_velocity');
			input.setAttribute('size', '4');			
			input.setAttribute('maxlength', '4');
			p.appendChild(span);
			var br = document.createElement('br');
			p.appendChild(br);
			p.appendChild(input);
			var br = document.createElement('br');
			p.appendChild(br);			

			var input = document.createElement('input');
			input.value = 'save';
			input.setAttribute('type', 'submit');
			p.appendChild(input);
			var br = document.createElement('br');
			p.appendChild(br);			

			var input = document.createElement('input');
			input.value = 'back';
			input.setAttribute('type', 'button');
			input.addEventListener('click', function()
			{
				window.location.href = window.location.href;
			}, false);

			p.appendChild(input);
			form.appendChild(p);					

			_game.appendChild(form);
		},
		instructions: function()
		{
			_self.createContainer('info');
			_game.className = 'main';
			
			var p = document.createElement('p');
			var span = document.createElement('span');
			span.appendChild(document.createTextNode('Mobile controls:'));
			var br = document.createElement('br');
			p.appendChild(span);
			p.appendChild(br);
			var br = document.createElement('br');
			p.appendChild(br);
			var span = document.createElement('span');
			span.appendChild(document.createTextNode('Pause/Resume: Double tap'));			
			p.appendChild(span);
			var br = document.createElement('br');
			p.appendChild(br);
			var span = document.createElement('span');
			span.appendChild(document.createTextNode('Move: Swipe up,down,left,right'));			
			p.appendChild(span);		
			
			var br = document.createElement('br');
			p.appendChild(br);
			var br = document.createElement('br');
			p.appendChild(br);
			var br = document.createElement('br');
			p.appendChild(br);

			var span = document.createElement('span');
			span.appendChild(document.createTextNode('Desktop controls:'));
			var br = document.createElement('br');
			p.appendChild(span);
			p.appendChild(br);
			var br = document.createElement('br');
			p.appendChild(br);
			var span = document.createElement('span');
			span.appendChild(document.createTextNode('Pause/Resume: Space'));			
			p.appendChild(span);
			var br = document.createElement('br');
			p.appendChild(br);
			var span = document.createElement('span');
			span.appendChild(document.createTextNode('Move: Arrow up,down,left,right'));			
			p.appendChild(span);		
			var br = document.createElement('br');
			p.appendChild(br);			

			var input = document.createElement('input');
			input.value = 'back';
			input.setAttribute('type', 'button');
			input.addEventListener('click', function()
			{
				window.location.href = window.location.href;
			}, false);
			p.appendChild(input);
			_game.appendChild(p);
		},
		about: function()
		{
			_self.createContainer('info');
			_game.className = 'about';
			var p = document.createElement('p');

			var img = document.createElement('img');
			img.setAttribute('src', 'img/avatar.png');

			p.appendChild(img);
			_game.appendChild(p);

			var p = document.createElement('p');

			var a = document.createElement('a');
			a.setAttribute('href', 'https://github.com/ZiTAL/snakejs');
			a.appendChild(document.createTextNode('https://github.com/ZiTAL/snakejs'));			
			a.addEventListener('click', function(e)
			{
				e.preventDefault();
				window.open(this.href);
			}, false);			

			p.appendChild(a);
			_game.appendChild(p);

			var p = document.createElement('p');

			var input = document.createElement('input');
			input.value = 'back';
			input.setAttribute('type', 'button');
			input.addEventListener('click', function()
			{
				window.location.href = window.location.href;
			}, false);

			p.appendChild(input);
			_game.appendChild(p);
			
		},
		start: function()
		{
			// empty body
			_self.empty(_game);
			_params['status'] = 'running';
			_params['score'] = 0;

			window.setTimeout(function()
			{
				_self.createGame();
				_self.createScore();
				_self.setEvents();
				_self.createFruit();
				if(typeof _self['setGestures'] == 'function')
					_self.setGestures();
				_self.loop();				
			}, 300);
		},
		pause: function()
		{
			_params['status'] = 'paused';
			window.clearTimeout(_instance);
		},
		resume: function()
		{
			_params['status'] = 'running';
			_self.loop();			
		},
		stop: function()
		{
			window.clearTimeout(_instance);
			_params['status'] = 'stopped';

			_self.createContainer('info');
			_game.className = 'main';
			
			var max_score = localStorage.getItem('snake_max_score');
			if(max_score==null)
				max_score = 0;
			if(parseInt(max_score)<parseInt(_params['score']))
				localStorage.setItem('snake_max_score', parseInt(_params['score']));
			
			var p = document.createElement('p');
			p.appendChild(document.createTextNode('GAME OVER'));
			
			var br = document.createElement('br');
			p.appendChild(br);			
			var br = document.createElement('br');
			p.appendChild(br);			
			
			p.appendChild(document.createTextNode('Actual score: '+_params['score']));
			var br = document.createElement('br');
			p.appendChild(br);
			
			p.appendChild(document.createTextNode('Max score: '+max_score));
			var br = document.createElement('br');
			p.appendChild(br);			
			
			var input = document.createElement('input');
			input.value = 'reset';
			input.setAttribute('type', 'button');
			input.addEventListener('click', function()
			{
				localStorage.setItem('snake_max_score', parseInt('0'));
				_self.stop();
			}, false);			
			p.appendChild(input);			
			var br = document.createElement('br');
			p.appendChild(br);			
			
			var input = document.createElement('input');
			input.value = 'back';
			input.setAttribute('type', 'button');
			input.addEventListener('click', function()
			{
				window.location.href = window.location.href;
			}, false);

			p.appendChild(input);			
			_game.appendChild(p);
		},
		
		move: function(position)
		{	
			var before = _game.getElementsByTagName('div')[_snake_position[0]];

			var p;
			if(position=='left')
				p = _snake_position[0] - 1;
			else if(position=='right')
				p = _snake_position[0] + 1;
			else if(position=='up')
				p = _snake_position[0] - _container_size;
			else if(position=='down')
				p = _snake_position[0] + _container_size;
			
			var after = _game.getElementsByTagName('div')[p];
			
			if(typeof after=='undefined')
			{
				_self.stop();
				return false;
			}
			else if(position=='left' || position=='right')
			{
				if(before.getAttribute('data-row')!=after.getAttribute('data-row'))
				{
					_self.stop();
					return false;
				}
			}
			
			for(var i=1;i<_snake_position.length;i++)
			{
				var tmp = _game.getElementsByTagName('div')[_snake_position[i]];
				if(tmp.getAttribute('data-i')==after.getAttribute('data-i'))
				{
					_self.stop();
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

			_params['locked'] = false;
			_self.paint();
			_instance = window.setTimeout(function()
			{
				_self.move(_params['direction']);
				var fruit = document.getElementById('fruit');
				if(fruit!=null)
				{
					var fruit_i = fruit.getAttribute('data-i');
					if(_snake_position[0]==fruit_i)
					{
						_self.createFruit();
						_self.addScore(10);
						_params['add_tail'] = true;
					}
					_self.loop();					
				}
			}, _speed);
		},
		
		paint: function()
		{
			var b = _game.getElementsByTagName('div');
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
			_self.deleteFruit();
			var min = 0;
			var max = _container_size * _container_size;
			var blocks = document.getElementsByClassName('block');
			var l = blocks.length;
			do
			{
				var p = _self.getRandom(min, max);
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
			var f = document.getElementById('fruit');
			if(f!=null)
				f.removeAttribute('id');
		},
		
		addScore: function(num)
		{
			_params['score'] += num;
			var count = document.getElementById('count');
			count.removeChild(count.firstChild);
			count.appendChild(document.createTextNode(_params['score']));
		},
		
		getRandom: function (min, max)
		{
			return Math.floor(Math.random() * (max - min)) + min;
		},		

		// create 
		createGame: function()
		{
			_self.createContainer('game');
			_self.createBlocks();				
		},
		
		createContainer: function(type)
		{
			_body = document.getElementsByTagName('body')[0];
			_self.empty(_body);

			var size;
			
			// get window size
			var window_size = _self.getWindowSize();

			if(window_size['width']>window_size['height'])
				size = window_size['height'];
			else
				size = window_size['width'];
			// remove border size
			size = size - 2 - 40;

			// _container_size multiple
			if(_container_size!=null)
			{
				while(size%_container_size!=0)
					size--;
			}

			// create div
			_game = document.createElement('div');
			_game.setAttribute('id', type);
			_game.style.width = size+"px";
			_game.style.height = size+"px";
			
			// add to body
			_body.appendChild(_game);			
		},
		
		createBlocks: function()
		{			
			var container = document.getElementById('game');
			// remove border
			var size = container.offsetWidth - 2;
			size = size / _container_size;
			
			var row = 0;
			var col = 0;
			var size2 = _container_size*_container_size;
			for(var i=0; i<size2; i++)
			{		
				var div = document.createElement('div');
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
			var w = window,
				d = document,
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
			span.appendChild(document.createTextNode('score: '));
			div.appendChild(span);
			var span = document.createElement('span');
			span.setAttribute('id', 'count'); 
			span.appendChild(document.createTextNode('0'));
			div.appendChild(span);			
			document.getElementsByTagName('body')[0].appendChild(div);
		},
		
		getParams: function()
		{
			return _params;
		},

		empty: function(item)
		{
			while(item.hasChildNodes())
				item.removeChild(item.firstChild);
		},
		
		setEvents: function()
		{
			window.addEventListener('keydown', function(e)
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
						_self.resume();
					else
						_self.pause();
				}

				_params['locked'] = true;
				
			}, false);			
		}
	};

	window['snake'] = snake;
})();