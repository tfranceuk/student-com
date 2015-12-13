(function() {
  function buildTemplates() {
    var roomTypes = JSON.parse($('script[type="application/json"]#friends-json').text());
    var templateString = $('script[type="text/template"]#room-type').html();
    var templates = [];
    for (var k in roomTypes) {
      var friends = roomTypes[k].friends.sort();

      var bound = templateString
        .replace('{{name}}', k)
        .replace('{{friends}}', getFriendsString(friends));
      var template = $(bound);
      if (!friends.length)
        $('p.friends', template).remove();
      templates.push({name: k, template: template});
    }

    attachFancybox(templates);

    return templates;

    function getFriendsString(friends) {
      switch (friends.length) {
        case 0: return '';
        case 1: return `${friends[0]} has stayed here`;
        case 2: return `${friends[0]} and ${friends[1]} have stayed here`;
        case 3: return `${friends[0]}, ${friends[1]}, and 1 other friend have stayed here`;
        case 4: return `${friends[0]}, ${friends[1]}, and ${friends.length-2} other friends have stayed here`;
      }
    }

    function attachFancybox(templates) {
      templates.forEach(x => {
        $('.images .fancybox', x.template).attr('rel', x.name).fancybox();
      });
    }
  }

  function appendTemplatesToContainerAll(templates) {
    var container = $('#room-types-container-all');
    templates.forEach(x => container.append(x.template.clone()));
  }


  $(function() {
    var templates = buildTemplates();
    appendTemplatesToContainerAll(templates);

    //refactor into function
    var select = $('#room-types-select');
    var i = 0;
    templates.forEach(x => {
      var option = $('<option>').attr('value', i++).text(x.name).appendTo(select);
    });
    $('option:first', select).attr('selected', 'selected');
    var current = templates[0].template.clone();
    select.change(function(e) {
      var next = templates[e.target.value*1].template.clone();

      current.on('transitionend', function() {
        console.log('transitionend');
        this.remove();
      });
      next.addClass('in active');
      setTimeout(() => next.removeClass('in'), 0);
      current.addClass('out');
      container.append(next);
      current = next;
    });
    var container = $('#room-types-container-one');
    current.addClass('active');
    container.append(current);
  });
})();

