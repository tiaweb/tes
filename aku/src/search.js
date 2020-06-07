$('.search').keyup(function() {
  var srchInput = $('.search').val();
  srchInput = srchInput.replace(/ /g, '|');
  if (srchInput[srchInput.length - 1] == '|') {
    srchInput = srchInput.replace(/\|/, '');
  }
  var regex = new RegExp('(?=[^\\s])' + srchInput, 'gi');
  var sorted = '';
  var results = [],
  sortedResultNames = [];
  $.getJSON('data.json', function(data) {
    $.each(data, function(key, val) { // index, obj
      if (val.name.search(regex) != -1) {
        results.push(val);
        sortedResultNames.push(val.name);
      } else {
        $.each(val.keywords, function(i, keyword) {
          if (keyword.search(regex) != -1) {
            results.push(val);
            sortedResultNames.push(val.name);
            return false;
          }
        });
      }
    });
    sortedResultNames = sortedResultNames.sort();
    $.each(sortedResultNames, function(i, nameVal) {
      $.each(results, function(key, val) {
        if (val.name == nameVal) {
          sorted += '<li><h2><a href="' + val.web + '">' +
                    val.name + '</a></h2>';
          sorted += '<p>' + val.description + '</p></li>';
        }
      });
    });
    $('.results').html(sorted);
  });
});
document.getElementById('home').addEventListener('click', function() {
  window.location.href = 'index.html';
});
