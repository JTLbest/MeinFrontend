var FRISBEE = FRISBEE || {};

(function() { 
  // Controller Init
	FRISBEE.controller = {
		init: function () {
			// Initialize router
			FRISBEE.router.init();
      FRISBEE.pullToRefresh();
		}
	};
  
  // Router
	FRISBEE.router = {
		init: function () {
	  		routie({
			    '/schedule': function() {
			    	FRISBEE.page.schedule();
				},
			    '/pools': function() {
			    	FRISBEE.page.pools();
			  },
			    '/ranking': function() {
			    	FRISBEE.page.ranking();
			  },
			    '/game/:id': function(id) {
			    	FRISBEE.page.game(id);
			  },
			    '/game/:id/:score1/:score2': function(id, score1, score2) {
			    	FRISBEE.page.verstuur(id, score1, score2);
			  },
          '*': function() {
			    	FRISBEE.page.schedule();
			  },
        
			});
		},
    
		change: function () {
      var route = window.location.hash.slice(2),
          sections = qwery('article'),
          section = qwery('[data-route=' + route + ']')[0];
          
      var navs = qwery('nav ul li'),
          nav = qwery('[id=' + route + ']')[0];

      // Show active navigation, hide all other
      if (nav) {
        for (var i=0; i < navs.length; i++){
          navs[i].classList.remove('active');
        }
        nav.classList.add('active');
      }
      
      // Show active section, hide all other
      if (section) {
        for (var i=0; i < sections.length; i++){
          sections[i].classList.remove('active');
        }
        section.classList.add('active');
      }
      
      if (!section) {
        // Zoek positie van '/'
        var leegMaken = route.slice(route.indexOf('/'))
        route = route.replace(leegMaken, " ");

        section = qwery('[data-route=' + route + ']')[0];
        
        for (var i=0; i < sections.length; i++){
          sections[i].classList.remove('active');
        }
        
        section.classList.add('active');
      }    
      
      // Default route
      if (!route) {
        sections[0].classList.add('active');
        navs[0].classList.add('active');
      }
		}
	};
  
  // Pages
	FRISBEE.page = {
    schedule: function () {
      FRISBEE.feedback.show();
      reqwest({
        url: 'https://api.leaguevine.com/v1/games/?tournament_id=19389&order_by=%5Bstart_time%5D&fields=%5Bid%2Cteam_1_score%2Cteam_2_score%2Cteam_1%2Cteam_2%2Cstart_time%2Cpool%2Cwinner_id%5D&limit=200', 
        type: 'json',
        method: 'get',
        success: function(data) {
          var directives = {
            objects: { 
              startTime: {
                text: function() {
                  var startTime = new Date(this.start_time);
                  return(startTime.toFormat('DDD HH:MI P'));
                }
              },
              link: {
                href: function() {
                  return('#/game/' + this.id);
                }
              }
            }
          }
          console.log(data);
          Transparency.render(qwery('[data-route=schedule]')[0], data, directives);
          FRISBEE.feedback.hide();
        }
      });
      FRISBEE.router.change();
    },
    
    pools: function () {
      FRISBEE.feedback.show();
      reqwest({
        url: 'https://api.leaguevine.com/v1/pools/?tournament_id=19389&order_by=%5Bid%5D', 
        type: 'json',
        method: 'get',
        success: function(data) {
          console.log(data);
          Transparency.render(qwery('[data-route=pools]')[0], data);
          FRISBEE.feedback.hide();
        }
      });
      FRISBEE.router.change();
    },
    
    game: function (id) {
      FRISBEE.feedback.show();
      reqwest({
        url: 'https://api.leaguevine.com/v1/games/' + id + '/?tournament_id=19389&order_by=%5Bstart_time%5D&fields=%5Bid%2Cteam_1_score%2Cteam_2_score%2Cteam_1%2Cteam_2%2Cstart_time%2Cpool%2Cwinner_id%5D&limit=200', 
        type: 'json',
        method: 'get',
        success: function(data) {
          console.log(data);
          Transparency.render(qwery('[data-route=game]')[0], data);
          FRISBEE.feedback.hide();
        }
      });
      FRISBEE.router.change();
    },
    
    ranking: function () {
      FRISBEE.feedback.show();
      reqwest({
        url: 'https://api.leaguevine.com/v1/stats/ultimate/team_stats_per_tournament/?tournament_ids=%5B19389%5D&order_by=%5B-wins%5D', 
        type: 'json',
        method: 'get',
        success: function(data) {
          console.log(data);
          Transparency.render(qwery('[data-route=ranking]')[0], data);
          FRISBEE.feedback.hide();
        }
      });
      FRISBEE.router.change();
    },
    
    verstuur: function (id, score1, score2) {
      console.log(id);
      console.log(score1);
      console.log(score2);      
    }
	};
  
  //feedback object
  FRISBEE.feedback = {
		show: function() {
			qwery('[id="feedback"]')[0].classList.add('active');
	  }, 
    hide: function() {
      qwery('[id="feedback"]')[0].classList.remove('active');
    }
	};
  
  FRISBEE.pullToRefresh = {
    // do stuff
  };
  
	// DOM ready
	domready(function () {
		FRISBEE.controller.init();
	});
})();