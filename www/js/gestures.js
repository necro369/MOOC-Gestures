var app = {
	inicio: function(){
		this.iniciaBotones();
		this.iniciaFastClick();
		this.iniciaHammer();
	},
	
	iniciaFastClick: function(){
		FastClick.attach(document.body);
	},
	
	iniciaBotones: function(){
		var btnClaro = document.querySelector('#claro');
		var btnOscuro = document.querySelector('#oscuro');
		
		btnClaro.addEventListener('click', this.ponloClaro, false);
		btnOscuro.addEventListener('click', this.ponloOscuro, false);
	},
	
	iniciaHammer: function(){
		var zona = document.getElementById('zona-gestos');
		var hammertime = new Hammer(zona);
		
		hammertime.get('pinch').set({ enable:true });
		hammertime.get('rotate').set({ enable:true });
		
		zona.addEventListener('webkitAnimationEnd', function(e){
			zona.className='';
		});
		
		/*
		// Sin animación
		hammertime.on('tap', function(ev){
			zona.className='tapcolor';
			setTimeout(function(){ zona.className=''; }, 100);
		});
		*/
		
		// Con animación
		hammertime.on('tap', function(ev){
			zona.className='tap';
		});
		
		hammertime.on('doubletap', function(ev){
			zona.className='doubletap';
		});
		
		hammertime.on('press', function(ev){
			zona.className='press';
		});
		
		hammertime.on('swipe', function(ev){
			var clase = undefined;
			direccion = ev.direction;
			
			if(direccion == 4) clase = 'swipe-derecha';
			if(direccion == 2) clase = 'swipe-izquierda';
			
			zona.className = clase;
		});
		
		hammertime.on('rotate', function(ev){
			var umbral = 25;
			if(ev.distance > umbral) zona.className = 'rotate';
		});
	},
	
	ponloClaro: function(){
		document.body.className = 'claro';
	},
	
	ponloOscuro: function(){
		document.body.className = 'oscuro';
	}
};

if('addEventListener' in document){
	document.addEventListener('DOMContentLoaded', function(){
		app.inicio();
	}, false);
}