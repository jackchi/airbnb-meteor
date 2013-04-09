/* Airbnb Listings Client-Side Methods*/
Meteor.startup(function() {

});

function getListings(place) {
  Meteor.http.call("GET", "https://airbnb.p.mashape.com/s",
                  { params : {location: place},
                  headers : {"X-Mashape-Authorization":"ffnGO1suGtJEjqgz4n7ykeuCbDP1hexv"}},
                  loadListings
                );
}

var loadListings = function (error, result){
  if(result.statusCode == 200){
      Session.set("listings", result.data);
      var availRooms = numListings(Session.get("listings").results_count);
      $('#listings').html(availRooms + " rentals available.");
      console.log("Status: "+result.statusCode);
      //console.log("Content: "+result.content);
      //console.log(result.data.results_count);
    }
  else
    console.log("Error: " + error);
};

function numListings (listings){
  var n = listings.split(" ");
  return parseInt(n[n.length-2]);
}


Template.where.events ({
  'click #find': function(event){
    event.preventDefault();
    var place = $('#location').val();
    getListings(place);
  }
});

Template.rooms.rooms = function() {
  return Session.get("listings").results;
}

Template.body.hasRooms = function() {
  if (Session.get("listings")) {
    return true;
  }
}
