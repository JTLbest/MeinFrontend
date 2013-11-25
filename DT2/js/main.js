var FRISBEE = FRISBEE || {};

(function() {  
  // Controller Init
	FRISBEE.controller = {
		init: function () {
			// Initialize router
			FRISBEE.router.init();
		}
	};
  
  // Router
	FRISBEE.router = {
		init: function () {
	  		routie({
			    '/schedule': function() {
			    	FRISBEE.page.render('schedule');
				},
			    '/game': function() {
			    	FRISBEE.page.render('game');
			  },
			    '/ranking': function() {
			    	FRISBEE.page.render('ranking');
			  },
			    '*': function() {
			    	FRISBEE.page.render('schedule');
			  }
			});
		},
    
		change: function () {
      var route = window.location.hash.slice(2),
          sections = qwery('article'),
          section = qwery('[data-route=' + route + ']')[0],
          li = qwery('[id=' + route + ']')[0],
          lis = qwery('li');
      
      if (li){
        for (var i=0; i < lis.length; i++){
          lis[i].classList.remove('current');
        }
        lis.classList.add('current');
      }
      
      if (!route) {
        lis[0].classList.add('current');
      }
      
      // Show active section, hide all other
      if (section) {
        for (var i=0; i < sections.length; i++){
          sections[i].classList.remove('active');
        }
        section.classList.add('active');
      }
      
      // Default route
      if (!route) {
        sections[0].classList.add('active');
      }
		}
	};
  
  // Pages
	FRISBEE.page = {
		render: function (route) {
			switch (route){
				case 'schedule':
        majaX({url:'https://api.leaguevine.com/v1/games/'}, function(result) {
          Transparency.render(qwery('[data-route='+route+']')[0], result);
        });
				break;

				case 'game':
        majaX({url:'https://api.leaguevine.com/v1/game_scores/'}, function(result) {
          Transparency.render(qwery('[data-route='+route+']')[0], result);
        });
				break;

				case 'ranking':
        majaX({url:'https://api.leaguevine.com/v1/teams/'}, function(result) {
          Transparency.render(qwery('[data-route='+route+']')[0], result);
        });
				break;

				default :
        majaX({url:'https://api.leaguevine.com/v1/teams/'}, function(result) {
          Transparency.render(qwery('[data-route='+route+']')[0], result);
        });
			}
			FRISBEE.router.change();
		}
	}
  
	// DOM ready
	domready(function () {
		FRISBEE.controller.init();
	});
})();