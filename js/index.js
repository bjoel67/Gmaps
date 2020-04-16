window.onload=()=>{

}
//var map;
var markers=[];
var infowindow;
function initMap() {
  // var nellore = {lat: 14.419583 , lng:79.968362 };
  //  var india={lat: 20.5937,lng:78.9629 };
   var losAngeles = {
    lat: 34.063380, 
    lng: -118.358080
    };
      map = new google.maps.Map(document.getElementById('map'), 
    {
     // center: nellore,
     center:losAngeles, 
      zoom: 12,
      mapTypeId: 'roadmap',
    });
  //     var map = new ol.Map({
  //   target: 'Gap',
  //   layers: [
  //      new ol.layer.Tile({
  //       source: new ol.source.OSM()

  //     })
  //   ],
  //   view: new ol.View({
  //     center:ol.proj.fromLonLat([79.960116, 14.429173]),
  //     //center: ol.proj.fromLonLat([79.980, 14.445]),
  //     zoom: 15   
  //   })
  // });
  infowindow = new google.maps.InfoWindow();  
   searchStores();
   }

function searchStores()
{
  var foundStores = [];
  var zipCode = document.getElementById('zip-code').value;
  if(zipCode){
      stores.map((store)=>
      {
        var postal = store['address']['postalCode'].substring(0, 5);
        console.log(postal);
        if(postal == zipCode)
        {
            foundStores.push(store);
        }
    }) 
    console.log("inList");
  }else {
      foundStores = stores;
      console.log("Miss");
   }
  //clearLocations();
  displayStores(foundStores);
  showStoresMarkets(foundStores);
  setOnClickListener();
}

// function clearLocations(){
//   infoWindow.close();
//   for (var i = 0; i < markers.length; i++) {
//     markers[i].setMap(null);
//   }
//   markers.length = 0;
// }
function setOnClickListener()
{
var storeElements=document.querySelectorAll('.store-container');
storeElements.forEach(function(elem, index)
{
  elem.addEventListener('click', function()
  {
    new google.maps.event.trigger(markers[index], 'click');
  });
 });
console.log("setOnClickListener()");
}


  function displayStores(stores)
  {

    var storesHtml='';  
    stores.map((stores,index)=>
      {
          var address=stores['addressLines'];
         var phonenumber=stores['phoneNumber'];
        //  console.log(address,phonenumber);
        storesHtml+=`<div class="store-container">
                        <div class="store-info-container">
                          <div class="store-address">
                          <span>${address[0]}</span>
                          <span>${address[1]}</span>
                          </div>
                          <div class="store-phone-number">${phonenumber}</div>
                          </div>
                          <div class="store-number-container">          
                            <div class="store-number"> ${index+1} </div>
                            </div> 
                            </div> `
         document.querySelector('.stores-list').innerHTML = storesHtml;  
      })
   //showStoresMarkets(stores);
   console.log("displayStores(stores)");
  }

 function showStoresMarkets(stores)
{
  var bounds = new google.maps.LatLngBounds();
  stores.map((store,index)=>
  {
     var latlng=new google.maps.LatLng(
      store["coordinates"]["latitude"],
      store["coordinates"]["longitude"]);     
     var name=store["name"];
    var address=store["addressLines"][0];
    var status=store["openStatusText"];
    var pn=store["phoneNumber"];
    var zip=store["address"]["postalCode"];
    bounds.extend(latlng);
    createMarker(latlng,name,address,status,pn,index+1,zip);
  })

  map.fitBounds(bounds); 
console.log("showStoresMarkets(stores)");
}

 function createMarker(latlng,name,address,status,pn,index,zip)
 {
  var html=`
  <div class="store-info-window">
  <div class="store-info-name"> ${name}</div>
  <div class="store-info-status">${status}</div>
  <div class="store-info-address">
  <div class="circle"><i class="fas fa-location-arrow"></i></div>
  ${address}&nbsp;<br />${zip}</div>
  <div class="store-info-phonenumber">
  <div class="circle"><i class="fas fa-phone-alt"></i></div>
  ${pn}</div>
  </div>
  `; 
  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    label: index.toString()
    });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(html);
    infowindow.open(map, marker);
  });
  markers.push(marker);
  console.log("createMarker(latlng,name,address,status,pn,index)");
}







  // "https://maps.googleapis.com/maps/api/js?key=AIzaSyAkGzDXrq2R7ERiI_NE694A-SrLwkwWHn4&callback=initMap"
  // "https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i18!2i189296!3i120452!4i256!2m3!1e0!2sm!3i506222680!3m17!2sen-IN!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy 50OjMzfHMuZTpsfHAudjpvZmYscy50OjF8cy5lOmcuZnxwLmM6I2ZmZDZlMmU2LHMudDoxfHMuZTpnLnN8cC5jOiNmZmNkZGJlMCxzLnQ6MXxzLmU6bC50LmZ8cC5jOiNmZjc0OTJhOCxzLnQ6MjB8cy5lOmwudC5mfHAubDoyNSxzLnQ6MjF8cy5lOmx8cC52Om9mZixzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZDZlMmU2LHMudDo4MXxzLmU6Zy5zfHAuYzojZmZjZGRiZTAscy50OjgyfHMuZTpnLmZ8cC5jOiNmZmRhZTZlYixzLnQ6ODJ8cy5lOmwudC5mfHAuYzojZmY3NDkyYTgscy50OjEzMTR8cC52Om9mZixzLnQ6MnxzLmU6Zy5mfHAuYzojZmZkNmUyZTYscy50OjJ8cy5lOmwudC5mfHAuYzojZmY1ODhjYTQscy50OjJ8cy5lOmwuaXxwLnM6LTEwMCxzLnQ6NDB8cy5lOmcuZnxwLmM6I2ZmY2FlN2E4LHMudDo0MHxzLmU6Zy5zfHAuYzojZmZiYWU2YTEscy50OjM5fHMuZTpnLmZ8cC5jOiNmZmM2ZThiMyxzLnQ6Mzl8cy5lOmcuc3xwLmM6I2ZmYmFlNmExLHMudDozfHMuZTpsLnQuZnxwLmM6I2ZmNDE2MjZiLHMudDozfHMuZTpsLml8cC5zOi00NXxwLmw6MTB8cC52Om9mZixzLnQ6NDl8cy5lOmcuZnxwLmM6I2ZmZjdmZGZmLHMudDo0OXxzLmU6Zy5zfHAuYzojZmZiZWNlZDQscy50OjUwfHMuZTpnLmZ8cC5jOiNmZmVlZjNmNSxzLnQ6NTB8cy5lOmcuc3xwLmM6I2ZmY2RkYmUwLHMudDo1MXxzLmU6Zy5mfHAuYzojZmZlZGYzZjUscy50OjUxfHMuZTpnLnN8cC5jOiNmZmNkZGJlMCxzLnQ6NTF8cy5lOmx8cC52Om9mZixzLnQ6NHxzLmU6bC5pfHAuczotNzAscy50OjY1fHMuZTpsLnQuZnxwLmM6I2ZmNTg4Y2E0LHMudDo2NnxzLmU6bC50LmZ8cC5jOiNmZjAwOGNiNSxzLnQ6MTA1OXxzLmU6Zy5mfHAuczotMTAwfHAubDotNSxzLnQ6NnxzLmU6Zy5mfHAuYzojZmZhNmNiZTM!4e0&amp;client=gme-ubertechnologies1&amp;token=53314"
  // "https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i18!2i189295!3i120452!4i256!2m3!1e0!2sm!3i506222680!3m17!2sen-IN!3sUS!5e18!12m4!1e68!2m2!1sset!2sRoadmap!12m3!1e37!2m1!1ssmartmaps!12m4!1e26!2m2!1sstyles!2zcy 50OjMzfHMuZTpsfHAudjpvZmYscy50OjF8cy5lOmcuZnxwLmM6I2ZmZDZlMmU2LHMudDoxfHMuZTpnLnN8cC5jOiNmZmNkZGJlMCxzLnQ6MXxzLmU6bC50LmZ8cC5jOiNmZjc0OTJhOCxzLnQ6MjB8cy5lOmwudC5mfHAubDoyNSxzLnQ6MjF8cy5lOmx8cC52Om9mZixzLnQ6ODF8cy5lOmcuZnxwLmM6I2ZmZDZlMmU2LHMudDo4MXxzLmU6Zy5zfHAuYzojZmZjZGRiZTAscy50OjgyfHMuZTpnLmZ8cC5jOiNmZmRhZTZlYixzLnQ6ODJ8cy5lOmwudC5mfHAuYzojZmY3NDkyYTgscy50OjEzMTR8cC52Om9mZixzLnQ6MnxzLmU6Zy5mfHAuYzojZmZkNmUyZTYscy50OjJ8cy5lOmwudC5mfHAuYzojZmY1ODhjYTQscy50OjJ8cy5lOmwuaXxwLnM6LTEwMCxzLnQ6NDB8cy5lOmcuZnxwLmM6I2ZmY2FlN2E4LHMudDo0MHxzLmU6Zy5zfHAuYzojZmZiYWU2YTEscy50OjM5fHMuZTpnLmZ8cC5jOiNmZmM2ZThiMyxzLnQ6Mzl8cy5lOmcuc3xwLmM6I2ZmYmFlNmExLHMudDozfHMuZTpsLnQuZnxwLmM6I2ZmNDE2MjZiLHMudDozfHMuZTpsLml8cC5zOi00NXxwLmw6MTB8cC52Om9mZixzLnQ6NDl8cy5lOmcuZnxwLmM6I2ZmZjdmZGZmLHMudDo0OXxzLmU6Zy5zfHAuYzojZmZiZWNlZDQscy50OjUwfHMuZTpnLmZ8cC5jOiNmZmVlZjNmNSxzLnQ6NTB8cy5lOmcuc3xwLmM6I2ZmY2RkYmUwLHMudDo1MXxzLmU6Zy5mfHAuYzojZmZlZGYzZjUscy50OjUxfHMuZTpnLnN8cC5jOiNmZmNkZGJlMCxzLnQ6NTF8cy5lOmx8cC52Om9mZixzLnQ6NHxzLmU6bC5pfHAuczotNzAscy50OjY1fHMuZTpsLnQuZnxwLmM6I2ZmNTg4Y2E0LHMudDo2NnxzLmU6bC50LmZ8cC5jOiNmZjAwOGNiNSxzLnQ6MTA1OXxzLmU6Zy5mfHAuczotMTAwfHAubDotNSxzLnQ6NnxzLmU6Zy5mfHAuYzojZmZhNmNiZTM!4e0&amp;client=gme-ubertechnologies1&amp;token=29700"
