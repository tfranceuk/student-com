(function() {
  $(function() {
    var roomTypes = JSON.parse($('script[type="application/json"]#friends-json').text());
    console.log(roomTypes);
    var template = $('script[type="text/template"]#room-type').html();
    console.log(template);
    var container = $('#room-types-container-all');

    for (var k in roomTypes) {
      var friends = roomTypes[k].friends.sort();

      var bound = template
        .replace('{{name}}', k)
        .replace('{{friends}}', getFriendsString(friends));
      $(bound).appendTo(container);
    }

    function getFriendsString(friends) {
      switch (friends.length) {
        case 0: return '';
        case 1: return `${friends[0]} has stayed here`;
        case 2: return `${friends[0]} and ${friends[1]} have stayed here`;
        case 3: return `${friends[0]}, ${friends[1]}, and 1 other friend have stayed here`;
        case 4: return `${friends[0]}, ${friends[1]}, and ${friends.length-2} other friends have stayed here`;
      }
    }
  });
})();

