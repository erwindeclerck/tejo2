"use strict";
jQuery(document).bind('leaflet.map', function (event, map, lMap) {


  const url = window.location.href;
  if (url.search('tejo-huis-jouw-buurt') < 0) {
    return;
  }

  let listtarget = jQuery('#locations');
  let field = jQuery('#form #postcode');
  // let tejolocations = [];


  var locations = [];


  async function getData(currentpc) {
    const url = "/jsonapi/group/tejo_huis";
    try {
      jQuery(listtarget).html("<img src=/themes/custom/b5tejothema/resources/spinner.gif>");
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const tejohuizenjson = await response.json();
      getlocations(currentpc, tejohuizenjson);
      //console.log(output);
    } catch (error) {
      console.error(error.message);
    }
  }

  function getlocations(pclocation, json) {
    //json met tejohuizen is ontvangen
    locations = [];
    for (var key in json.data) {
      let object = json.data[key];
      // console.log(object);
      let loc = {};
      loc.name = object.attributes.label;
      loc.addr = object.attributes.field_adres.address_line1;
      loc.post = object.attributes.field_adres.postal_code;
      loc.place = object.attributes.field_adres.locality;
      loc.lat = object.attributes.field_locatie.lat;
      loc.lon = object.attributes.field_locatie.lon;
      loc.routeuri =
        object.attributes.field_routebeschrijvingslink !== null
          ? object.attributes.field_routebeschrijvingslink.uri
          : "";
      loc.routetitle =
        object.attributes.field_routebeschrijvingslink !== null
          ? object.attributes.field_routebeschrijvingslink.title
          : "";
      locations.push(loc);
    }
    //locations bevat nu een array met tejohuizenobjecten
    const getDistance = (lat1, lon1, lat2, lon2) => {
      const radlat1 = (Math.PI * lat1) / 180;
      const radlat2 = (Math.PI * lat2) / 180;

      const theta = lon1 - lon2;
      const radtheta = (Math.PI * theta) / 180;

      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344;
      return dist;
    };
    for (let loc of locations) {
      loc.distance = getDistance(
        loc.lat,
        loc.lon,
        pclocation.lat,
        pclocation.lon
      );
    }
    //voor elk tejohuis is een property toegevoegd met de afstand naar pclocation
    locations.sort((a, b) => a.distance - b.distance);
    //de tejohuizeen zijn nu gerangschikt naar afstand
    console.log(pclocation, locations);

    var listing = "<ul>";
    for ( key in locations) {
      var obj = locations[key];
      var googlemap = "";
      if (obj.routeuri !== ""){
        googlemap = "<div class=goo><a href='" + obj.routeuri + "' target=_blank>" + obj.routetitle + "</a></div>";
      }
      listing +=
        "<li data-id=" +
        key +
        " data-lat=" +
        obj.lat +
        " data-lon=" +
        obj.lon +
        "><div class=nameaddress><span class=name>" +
        obj.name +
        "</span><br><span class=addr>" +
        obj.addr +
        "<br>" +
        obj.post +
        " " +
        obj.place +
        "</span></div>" +
        googlemap +
        "</li>";
    }
    listing +=
      "<li data-id=x data-lat=51.157833891  data-lon=4.1396312676664><div class=nameaddress>Alle Tejohuizen</div></li>";
    listing += "</ul>";

    jQuery(listtarget).html(listing);
    var lijst = jQuery("#locations ul li");
    var zoom = 14;
    lijst.each(
      function () {
        jQuery(this).click(
          function () {
            jQuery("#locations ul li").removeClass('tejorood');
            jQuery(this).addClass('tejorood');
            if (this.dataset.id === "x") {
              zoom = 8;
            } else {
              zoom = 14;
            }
            lMap.flyTo([this.dataset.lat, this.dataset.lon], zoom, {animate: true, duration: 1.5});
          }
        );
      }
    );


    // console.log(listing);
    return locations;
  }


  let currentpc = {lat: 51.215196, lon: 4.402068};
  getData(currentpc);





  field.inputmask('9999', {
    "oncomplete": function () {
      var postcode = parseInt(jQuery(this).val());
      const pclocation = pclocations.find(el => el.pc === postcode);
      if (pclocation === undefined) {
        field.css('color',"red");
        //getData(tejolocation);
      }else{
        console.log(pclocation);
        field.css('color',"rgb(0,0,255)");
        getData(pclocation);
      }
    }
  }).keyup(function () {
    if(field.css('color') == 'rgb(255, 0, 0)' ){
      field.val('').css('color','');
    }
    if(field.css('color') == 'rgb(0, 0, 255)' ){
    }
    if (!field.inputmask("isComplete")){
      field.css('color','');
    }
  });
  jQuery("#form #wis").click(function () {
    field.val('').css('color','').focus();
  });




});
