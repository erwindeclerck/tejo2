"use strict";
jQuery(" a").each(function () {
  //this part works when url matches
  if (this.href === window.location.href) {
    jQuery(this).addClass("active-link");
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


function wrap(selector, wrapper) {
  el = document.querySelector(selector);
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}

// example: wrapping an anchor with class "wrap_me" into a new div element
wrap(document.querySelector('a.wrap_me'), document.createElement('div'));
