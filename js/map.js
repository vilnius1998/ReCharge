  var markers = [];
  var in_area = [];
  var autocomplete;
  var locations = [
    ['Mike\'s Charger', 40.763537, -73.972248, '767 5th Ave, New York, New York 10153', '347-994-0687'],
    ['John\'s Charger', 40.719875, -74.010513, '376 Greenwich Street, New York, NY, 10013', '347-349-2356'],
    ['Garry\'s Charger', 40.721227, -74.003358, '10 Wooster St, New York, NY, 10013', '347-334-0845'],
    ['Julian\'s Charger', 40.714463, -74.010980, '75 Park Place, New York, NY, 10007', '347-145-8437'],
    ['Connor\'s Charger', 39.943091, -75.159176, '1001 South Street, Philadelphia, PA, 19147-1910', '347-234-3234'],
    ['Wylie\'s Charger', 40.705169, -74.008024, '75 Wall St, New York, NY, 10005', '347-150-3999'],
    ['Jeff\'s Charger', 40.717123, -73.992020, '59 Allen Street, New York, NY, 10002', '347-627-9234'],
    ['Xavier\'s Charger', 40.707001, -74.016756, '70 Little W St, New York, NY, 10280', '347-389-1989'],
    ['Ronda\'s Charger', 40.698683, -73.991871, '75 Henry St, Brooklyn, NY, 11201', '347-023-0990'],
    ['Jason\'s Charger', 39.948257, -75.166668, '1500 Locust St Level R, Philadelphia, PA, 19102', '215-944-8437'],
    ['Lisa\'s Charger', 39.943091, -75.159176, '1001 South Street, Philadelphia, PA, 19147-1910', '215-627-3234'],
    ['Johnson\'s Charger', 39.963516, -75.167170, '1719 Spring Garden St, Philadelphia, PA, 19130', '215-333-2534'],
    ['Barb\'s Charger', 39.973902, -75.134882, '100 W. Oxford Street, Philadelphia, PA, 19122', '215-123-5363'],
    ['Kelly\'s Charger', 39.958041, -75.189108, '115 N. 33rd Street, Philadelphia, PA, 19104', '215-643-3453'],
    ['John\'s Charger', 39.946696, -75.117897, '200 North Broadway, Camden, NJ, 08102', '215-234-6345'],
    ['UPenn\'s Charger', 39.953956, -75.191829, '3386 Chestnut Street, Philadelphia, PA, 19104', '215-944-6304'],
    ['George\'s Charger', 39.983750, -75.155906, '2029 N Broad St, Philadelphia, PA, 19122', '215-344-0400'],
    ['Dean\'s Charger', 47.610386, -122.334187, '1415 6th Avenue, Seattle, WA, 98101', '206-940-0043'],
    ['Brandon\'s Charger', 47.803039, -122.366096, '922 Pine Street, Edmonds, WA, 98020', '425-772-8708'],
    ['Maksim\'s Charger', 47.822463, -122.332323, '19427 73rd Avenue West, Lynnwood, WA, 98036', '206-708-0899'],
    ['Karen\'s Charger', 47.622185, -122.341965, '400 Dexter Ave N, Seattle, WA, 98109', '206-650-7803'],
    ['Kennedy\'s Charger', 47.595425, -122.311708, '805 Rainier Ave S, Seattle, WA, 98144', '425-773-0825'],
    ['Dianna\'s Charger', 47.612407, -122.339427, '1913 4th Ave, Seattle, WA, 98101', '206-335-1243'],
    ['Hayden\'s Charger', 47.571405, -122.331140, '225 S Spokane St, Seattle, WA, 98134', '425-889-4555'],
    ['Tim\'s Charger', 40.249345, -84.133300, 'Deam Road, Sidney, Ohio, 45365', '314-234-3899'],
    ['Hailey\'s Charger', 38.276138, -87.714843, '7932 W Sr, Owensville, Indiana 47665', '244-443-0388'],
    ['Rick\'s Charger', 37.982308, -87.187500, 'W 650 N, Richland, Indiana 47634', '153-039-3288'],
    ['Carson\'s Charger', 33.738958, -93.691406, '557 Co Rd 185, Washington, Arkansas 71862', '125-349-0931'],
    ['John\'s Charger', 32.931240, -97.207031, '213 Talon Drive, Keller, Texas 76248', '125-234-0129'],
    ['Fred\'s Charger', 31.967075, -88.505859, '7917 County Rd, Quitman, Mississippi 39355', '399-234-1203'],
    ['William\'s Charger', 40.051165, -104.677734, '3621 County Road 41, Hudson, Colorado 80642', '309-488-1344'],
    ['Mitchell\'s Charger', 34.568097, -104.545898, 'Fort Sumner, New Mexico 88119', '388-308-3209'],
    ['Frank\'s Charger', 42.137339, -115.356445, 'Bruneau, Idaho 83604', '308-230-1287'],



  ];

  var geocoder = new google.maps.Geocoder();

  autocomplete = new google.maps.places.Autocomplete((document.getElementById('locator_text')));

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 39.833333,
      lng: -98.583333
    },
    zoom: 4,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  for (i = 0; i < locations.length; i++) {
    add_marker(locations);
  }

  google.maps.event.addDomListener(window, "resize", function() {
    centermap();
  });

  $('#locator').submit(function(e) {
    e.preventDefault();
    var address = $('input[type="text"]').val();
    var radiusmiles = parseInt($('select').val());
    var radiusmetric = radiusmiles / 0.000621371192;
    in_area = [];

    geocoder.geocode({
      'address': address
    }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {

        var searchedlocation = results[0].geometry.location;
        var circle = new google.maps.Circle({
          radius: radiusmetric,
          center: searchedlocation
        });
        map.setCenter(searchedlocation);
        map.fitBounds(circle.getBounds());

        for (i = 0; i < locations.length; i++) {
          var position = new google.maps.LatLng(locations[i][1], locations[i][2]);
          var distance = google.maps.geometry.spherical.computeDistanceBetween(searchedlocation, position);

          if (distance <= radiusmetric) {
            markers[i].setMap(map);
            in_area.push([locations[i][0], locations[i][3], locations[i][4], (distance * 0.000621371192).toFixed(2)]);
          } else {
            markers[i].setMap(null);
          }

        }
        resultstotal(in_area.length, radiusmiles, address, circle);
      }
    });

  });

  function centermap() {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
  }

  function add_marker(arraymarkers) {
    var latlng = new google.maps.LatLng(arraymarkers[i][1], arraymarkers[i][2]);
    var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      icon: 'http://chart.apis.google.com/chart?cht=d&chdp=mapsapi&chl=pin%27i%5c%27%5b%27-2%27f%5chv%27a%5c%5dh%5c%5do%5c0099FF%27fC%5c000000%27tC%5c000000%27eC%5cLauto%27f%5c&ext=.png'
    });
    markers[i] = marker;
  }

  function resultstotal(resultstotal, radius, search, circlearea) {
    $('main').empty().append('<p class="col">' + resultstotal + ' charging stations within ' + radius + 'mi of ' + search + '</p><ol class="col"></ol>');
    in_area.sort(function(a, b) {
      return a[3] - b[3];
    });
    for (i = 0; i < in_area.length; i++) {

      var dealername = in_area[i][0];
      var dealeraddress = in_area[i][1];
      var dealeremail = in_area[i][2];
      var distanceround = in_area[i][3];

      $('main ol').append('<li>' +
        '<h4>' + dealername + ' (' + distanceround + ' mi away)</h4>' +
        '<p>' + dealeraddress + '</p>' +
        '<a href="mailto:' + dealeremail + '">' + dealeremail + '</a>' +
        '</li>');
    }

    $('main, #map').addClass('active');

    $('html, body').animate({
      scrollTop: $("main").offset().top
    }, 500);
    $('main').on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function(e) {
      centermap();
      map.fitBounds(circlearea.getBounds());
    });

  }
