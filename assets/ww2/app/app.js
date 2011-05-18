document.fromMarker = false;
// This creates a GeoReview object in the global namespace
// that contains the entire application
Ext.regApplication({
  // this is defined by us in which we put global variables
  
  // the application name
  name: "GeoReview",
  tabletStartupScreen: "/mobi/resources/images/tablet_startup_screen.png",
  phoneStartupScreen: "/mobi/resources/images/phone_startup_screen.png",
  icon: "/mobi/resources/images/icon_app.png",

  // this function is called by Sencha Touch to startup the
  // application
  realLaunch: function() {  
    GeoReview.views.viewport = new this.views.Viewport();
  },
  
    mainLaunch: function(){
        if (!device || !this.launched) { return true; }
		this.realLaunch();
	},
	
    launch: function() {
        if (typeof device == undefined){
            this.launched=true;
    		this.mainLaunch();  
        }else{
       		this.realLaunch();    
        }
    },  
  re: new RegExp("(.+)\\?(.+)"),
  position: {},
  callback: null,
  getPosition: function(position){
    GeoReview.position.lat = position.coords.latitude;
    GeoReview.position.lng = position.coords.longitude;
    GeoReview.callback();
  },
  resetMsgBox: function() {
    Ext.Msg = new Ext.MessageBox();
    Ext.Msg.on({
      hide: function(component) { component.destroy(); },
      destroy: function(component) { GeoReview.resetMsgBox(); }
    });
  },
    
    getPath: function(){
        if (document.phonegap) return 'resources/images';
        else return '/mobi/resources/images';
    },
    
    getUrlImage: function(image){
        switch (image){
            case 'mavigex':
                return GeoReview.getPath()+"/mavigex.png";
            case 'star':
                return GeoReview.getPath()+"/star.png";
            case 'star_empty':
                return GeoReview.getPath()+"/star_empty.png";
            case 'loading':
                return GeoReview.getPath()+"/loading.gif";
            default:
                return '';
        }
    }
});


// Monkey patching sencha to make Maps touch event work
// see http://www.sencha.com/forum/showthread.php?129126-Google-Maps-Listener-on-click
Ext.gesture.Manager.onMouseEventOld = Ext.gesture.Manager.onMouseEvent;
Ext.gesture.Manager.onMouseEvent = function(e) {
	var target = e.target;

	while (target) {
		if (Ext.fly(target) && Ext.fly(target).hasCls('x-map')) {
			return;
		}

		target = target.parentNode;
	}

	this.onMouseEventOld.apply(this, arguments);
};

