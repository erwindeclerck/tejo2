"use strict";
jQuery(" a").each(function () {
  //this part works when url matches
  if (this.href === window.location.href) {
    jQuery(this).addClass("active-link");
    jQuery(this).addClass("dronken-link");
  }
});


/* searchbutton animation see also headerfooter.scss */

jQuery(".search-block-form").addClass("hidden");
jQuery("nav.menu--main ul li:last-child").click(function(event){
  jQuery(".region-nav-main .container nav").addClass("dimmed");
  jQuery(".search-block-form").removeClass("hidden");
  jQuery(".search-block-form input[type=search]").focus();
  jQuery(".form-type-search").addClass("sbox");
});
jQuery(".search-block-form input").blur(function(event){
  jQuery(".region-nav-main .container nav").removeClass("dimmed");
  jQuery(".search-block-form").addClass("hidden");
  jQuery(".form-type-search").removeClass("sbox");
});

/*
function wrap(selector, wrapper) {
  var el;
  el = document.querySelector(selector);
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}

// example: wrapping an anchor with class "wrap_me" into a new div element
wrap(document.querySelector('a.wrap_me'), document.createElement('div'));
*/


jQuery(document).bind('leaflet.map', function(event, map, lMap) {
  //map id
  var id = lMap._container.id;
  var url = window.location.href;
  var settingsElement = document.querySelector('script[type="application/json"][data-drupal-selector="drupal-settings-json"]');
  var drupalSettings = JSON.parse(settingsElement.textContent);
  var leafletset = drupalSettings.leaflet;
  var length = drupalSettings.leaflet[ id ].features.length;
  var target =  jQuery('#printer');
  var lat, lon, name, li;
  var listing = "<ul>";
  jQuery.each(leafletset,function(key,value){
    lat = value.features[0].lat;
    lon = value.features[0].lon;
    name = value.features[0].popup.value;
    if(name !== undefined){
      listing += "<li data-id=" + key +" data-lat=" + lat + " data-lon=" + lon + ">" + name + "</li>";
    }
  });
  listing += "<li data-id=x data-lat=51.157833891  data-lon=4.1396312676664>Reset</li>";
  listing += "</ul>";
  jQuery(target).html(listing);
  var lijst = jQuery("#printer ul li");
  var zoom = 14;
  lijst.each(
    function(){
      jQuery(this).hover(
        function(){
          jQuery(this).css('text-decoration','underline');
          jQuery(this).css('cursor','hand');
          if(this.dataset.id === "x"){
            zoom = 8;
          }else{
            zoom = 14;
          }
          lMap.flyTo([this.dataset.lat,this.dataset.lon],zoom,{animate:true,duration:1.5});
        },
      function(){
        jQuery(this).css('text-decoration','none');
        jQuery(this).css('cursor','pointer');
      }
      );
    }
  );


});
