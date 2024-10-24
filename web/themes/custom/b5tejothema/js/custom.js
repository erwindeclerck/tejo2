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

//
// jQuery(document).bind('leaflet.map', function(event, map, lMap) {
//
//
//   function getlocations(){
//     let url = "/jsonapi/group/tejo_huis";
//     fetch(url)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((groups) => {
//
//         var lat, lon, name, addr;
//         let tejolocations = [];
//
// //        let groupsobj = groups.data;
//         for (var key in groups.data) {
//           var obj = groups.data[key];
//           name = obj.attributes.label;
//           addr =
//             obj.attributes.field_adres.address_line1 +
//             "<br>" +
//             obj.attributes.field_adres.postal_code +
//             " " +
//             obj.attributes.field_adres.locality;
//           lat = obj.attributes.field_locatie.lat;
//           lon = obj.attributes.field_locatie.lon;
//
//           var loc = {};
//           loc.name = name;
//           loc.addr = addr;
//           loc.lat = lat;
//           loc.lon = lon;
//           tejolocations.push(loc);
//         }
//         return tejolocations;
//       })
//       .catch((error) => console.error("Unable to fetch data:", error));
//
//   }
//
//
//   function drawlistingOLD2(locations,listtarget) {
//
//     var listing = "<ul>";
//
//     let url = "/jsonapi/group/tejo_huis";
//     fetch(url)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((groups) => {
//         let groupsobj = groups.data;
//         for (var key in groups.data) {
//           var obj = groups.data[key];
//           var name = obj.attributes.label;
//           var addr =
//             obj.attributes.field_adres.address_line1 +
//             "<br>" +
//             obj.attributes.field_adres.postal_code +
//             " " +
//             obj.attributes.field_adres.locality;
//           var lat = obj.attributes.field_locatie.lat;
//           var lon = obj.attributes.field_locatie.lon;
//           listing += "<li data-id=" + key + " data-lat=" + lat + " data-lon=" + lon + "><div class=name>" + name +"</div><div class=addr>"+ addr + "</li>";
//         }
//         listing += "<li data-id=x data-lat=51.157833891  data-lon=4.1396312676664>Alle Tejohuizen</li>";
//         listing += "</ul>";
//         jQuery(listtarget).html(listing);
//         var lijst = jQuery("#locations ul li");
//         var zoom = 14;
//         lijst.each(
//           function () {
//             jQuery(this).click(
//               function () {
//                 jQuery("#locations ul li").removeClass('tejorood');
//                 jQuery(this).addClass('tejorood');
//                 if (this.dataset.id === "x") {
//                   zoom = 8;
//                 } else {
//                   zoom = 14;
//                 }
//                 lMap.flyTo([this.dataset.lat, this.dataset.lon], zoom, {animate: true, duration: 1.5});
//               }
//             );
//           }
//         );
//
//       })
//       .catch((error) => console.error("Unable to fetch data:", error));
//   }
//
//
//
//
//   function drawlisting(locations,listtarget){
//     var listing = "<ul>";
//     for (var key in locations) {
//       var obj = locations[key];
//       var name = obj.name;
//       var addr = obj.addr;
//       var lat = obj.lat;
//       var lon = obj.lon;
//       listing += "<li data-id=" + key + " data-lat=" + lat + " data-lon=" + lon + "><div class=name>" + name +"</div><div class=addr>"+ addr + "</li>";
//     }
//     listing += "<li data-id=x data-lat=51.157833891  data-lon=4.1396312676664>Alle Tejohuizen</li>";
//     listing += "</ul>";
//     jQuery(listtarget).html(listing);
//     var lijst = jQuery("#locations ul li");
//     var zoom = 14;
//     lijst.each(
//       function () {
//         jQuery(this).click(
//           function () {
//             jQuery("#locations ul li").removeClass('tejorood');
//             jQuery(this).addClass('tejorood');
//             if (this.dataset.id === "x") {
//               zoom = 8;
//             } else {
//               zoom = 14;
//             }
//             lMap.flyTo([this.dataset.lat, this.dataset.lon], zoom, {animate: true, duration: 1.5});
//           }
//         );
//       }
//     );
//
//   }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//   //
//   // /**
//   //  *
//   //  * @param locations
//   //  * @param listtarget
//   //  */
//   // function drawlistingOLD(locations, listtarget) {
//   //   // var locations = getsortedlist(1861,locations);
//   //   var listing = "<ul>";
//   //   jQuery.each(locations, function (key, value) {
//   //     lat = value.lat;
//   //     lon = value.lon;
//   //     place = value.place;
//   //     listing += "<li data-id=" + key + " data-lat=" + lat + " data-lon=" + lon + ">" + place + "</li>";
//   //   });
//   //   listing += "<li data-id=x data-lat=51.157833891  data-lon=4.1396312676664>Alle Tejohuizen</li>";
//   //   listing += "</ul>";
//   //   jQuery(listtarget).html(listing);
//   //   var lijst = jQuery("#locations ul li");
//   //   var zoom = 14;
//   //   lijst.each(
//   //     function () {
//   //       jQuery(this).click(
//   //         function () {
//   //           jQuery("#locations ul li").removeClass('tejorood');
//   //           jQuery(this).addClass('tejorood');
//   //           if (this.dataset.id === "x") {
//   //             zoom = 8;
//   //           } else {
//   //             zoom = 14;
//   //           }
//   //           lMap.flyTo([this.dataset.lat, this.dataset.lon], zoom, {animate: true, duration: 1.5});
//   //         }
//   //       );
//   //     }
//   //   );
//   // }
//   //
//   //
//   /**
//    *
//    * @param pclocation
//    * @param locations
//    * @returns {*}
//    */
//   function getsortedlist(pclocation,locations){
//     const getDistance = (lat1, lon1, lat2, lon2) => {
//       const radlat1 = (Math.PI * lat1) / 180;
//       const radlat2 = (Math.PI * lat2) / 180;
//
//       const theta = lon1 - lon2;
//       const radtheta = (Math.PI * theta) / 180;
//
//       let dist =
//         Math.sin(radlat1) * Math.sin(radlat2) +
//         Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
//       dist = Math.acos(dist);
//       dist = (dist * 180) / Math.PI;
//       dist = dist * 60 * 1.1515;
//       dist = dist * 1.609344;
//       return dist;
//     };
//
//     for ( let loc of locations ) {
//       loc.distance = getDistance( loc.lat, loc.lon, pclocation.lat, pclocation.lon );
//     }
//     locations.sort( ( a, b ) => a.distance - b.distance );
//     return locations;
//   }
//
//
//
//
//
//
//   // jQuery.each(leafletset, function (key, value) {
//   //   if ((value.features[0].popup.value !== undefined) && (key.startsWith("leaflet-map-group"))) {
//   //     var loc = {};
//   //     loc.lat = value.features[0].lat;
//   //     loc.lon = value.features[0].lon;
//   //     loc.place = value.features[0].popup.value;
//   //     tejolocations.push(loc);
//   //   }
//   // });
//
//   //tejolocations = getlocations();
//
//
//
//   // let id = lMap._container.id;
//   let url = window.location.href;
//   if (url.search('tejo-huis-jouw-buurt') < 0 ){return;}
//
//   // var settingsElement = document.querySelector('script[type="application/json"][data-drupal-selector="drupal-settings-json"]');
//   // var drupalSettings = JSON.parse(settingsElement.textContent);
//   // var leafletset = drupalSettings.leaflet;
//   let listtarget = jQuery('#locations');
//   let field = jQuery('#form #postcode');
//   let tejolocations = [];
//
//
//
//   fetch("/jsonapi/group/tejo_huis")
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }
//       return res.json();
//     })
//     .then((groups) => {
//
//       var lat, lon, name, addr;
//      // let tejolocations = [];
//
//       for (var key in groups.data) {
//         var obj = groups.data[key];
//         name = obj.attributes.label;
//         addr =
//           obj.attributes.field_adres.address_line1 +
//           "<br>" +
//           obj.attributes.field_adres.postal_code +
//           " " +
//           obj.attributes.field_adres.locality;
//         lat = obj.attributes.field_locatie.lat;
//         lon = obj.attributes.field_locatie.lon;
//
//         var loc = {};
//         loc.name = name;
//         loc.addr = addr;
//         loc.lat = lat;
//         loc.lon = lon;
//         tejolocations.push(loc);
//       }
//       // return tejolocations;
//     })
//     .catch((error) => console.error("Unable to fetch data:", error));
//
//
//   drawlisting(tejolocations, listtarget);
//
//
//
//
//   field.inputmask('9999', {
//     "oncomplete": function () {
//       var postcode = parseInt(jQuery(this).val());
//       const pclocation = pclocations.find(el => el.pc === postcode);
//       if (pclocation === undefined) {
//         field.css('color',"red");
//         drawlisting(tejolocations, listtarget);
//       }else{
//         console.log(pclocation);
//         field.css('color',"green");
//         tejolocations = getsortedlist(pclocation,tejolocations);
//         drawlisting(tejolocations, listtarget);
//       }
//     }
//   }).keyup(function () {
//     if(field.css('color') == 'rgb(255, 0, 0)' ){
//       field.val('').css('color','');
//     }
//     if(field.css('color') == 'rgb(0, 255, 0)' ){
//       field.val('').css('color','');
//     }
//   });
//   jQuery("#form #wis").click(function () {
//     field.val('').css('color','').focus();
//   });
//
//
//
//
// });
//
