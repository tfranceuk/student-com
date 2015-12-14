(function($, Handlebars) {

  //============================
  //setup page on document ready
  //============================
  $(function() {
    //build array of jquery elements from binding friends.json data to a template
    var templates = buildTemplates();

    //append a clone of each template to the room types desktop content area
    initialiseDesktopContainer(templates);

    //initialise the room types mobile content area,
    // and attach listeners to react to user selection and animations
    initialiseMobileContainer(templates);
  });

  //------------------
  //delegate functions
  //------------------
  function buildTemplates() {
    //get and parse friends.json
    var roomTypes = JSON.parse($('script[type="application/json"]#friends-json').text());
    //get room type view template
    var templateString = $('script[type="text/template"]#room-type').html();
    //use of handlebars for templating and rendering
    var template = Handlebars.compile(templateString);

    //for each room type, build template, and push onto array
    var templates = [];
    for (var k in roomTypes) {
      //sort alphabetically
      var friends = roomTypes[k].friends.sort();

      //bind data to template
      // var bound = templateString
      //   .replace('{{name}}', k)
      //   .replace('{{friends}}', getFriendsString(friends));
      var bound = template({name: k, friends: getFriendsString(friends), images: roomTypes[k].images});
      var element = $(bound);

      //remove friends element from template, if no friends
      if (!friends.length)
        $('p.friends', element).remove();

      //push onto array
      templates.push({name: k, template: element});
    }

    //attach fancybox behaviour to images in templates
    attachFancybox(templates);

    return templates;

    //function to return correct friends string, as per requirements
    function getFriendsString(friends) {
      switch (friends.length) {
        case 0: return '';
        case 1: return `${friends[0]} has stayed here`;
        case 2: return `${friends[0]} and ${friends[1]} have stayed here`;
        case 3: return `${friends[0]}, ${friends[1]}, and 1 other friend have stayed here`;
        default: return `${friends[0]}, ${friends[1]}, and ${friends.length-2} other friends have stayed here`;
      }
    }

    function attachFancybox(templates) {
      templates.forEach(x => {
        $('.images .fancybox', x.template).attr('rel', x.name).fancybox();
      });
    }
  }

  function initialiseDesktopContainer(templates) {
    //find container
    var container = $('#room-types-container-all');
    //append a clone of each template to container
    templates.forEach(x => container.append(x.template.clone()));
  }

  function initialiseMobileContainer(templates) {
    //find select input, and append each option to it
    var select = $('#room-types-select');
    var i = 0;
    templates.forEach(x => {
      var option = $('<option>').attr('value', i++).text(x.name).appendTo(select);
    });
    //pre-select first option
    $('option:first', select).attr('selected', 'selected');

    //track current room type
    var current = templates[0].template.clone();
    //on room type selection change, show selected room type
    select.change(function(e) {
      //find next template from array, and clone
      var next = templates[e.target.value*1].template.clone();

      //setup transitionend event to remove old from DOM
      current.on('transitionend', function() {
        this.remove();
      });
      //apply classes for css transition
      next.addClass('in active');
      //set timeout so that DOM is updated with correct starter classes,
      // before removing 'in' to cause transition
      setTimeout(() => next.removeClass('in'), 0);
      //add class to outgoing element to cause transition
      current.addClass('out');
      //append next to DOM
      container.append(next);
      //track new selection ready for outgoing on next selection change
      current = next;
    });
    //find container
    var container = $('#room-types-container-one');
    //apply active class to current element
    current.addClass('active');
    //append to DOM
    container.append(current);
  }
})($, Handlebars);

