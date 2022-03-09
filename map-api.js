let x=0;
function initMap() {
    var input = document.getElementById('PickupLocationInput');
    var input1 = document.getElementById('DropoffLocationInput');
    var autocomplete = new google.maps.places.Autocomplete(input);
    var autocomplete1 = new google.maps.places.Autocomplete(input1);
    google.maps.event.addListener(autocomplete, 'place_changed' ,  function() {
     locationChangeHandler(autocomplete,autocomplete1);
  
     if (document.getElementById('Price') != null) {
        document.getElementById('Price').value="Calculer";
    }  
     PriceCalculator();
    }

    );
    google.maps.event.addListener(autocomplete1, 'place_changed' ,  function() {
        locationChangeHandler(autocomplete,autocomplete1);
        if (document.getElementById('Price') != null) {
            document.getElementById('Price').value="Calculer";
        }  
              PriceCalculator();

       }
       );


}


initMap();
function locationChangeHandler(autoc,autoc1){

        var place = autoc.getPlace();
        var place1 = autoc1.getPlace();
        if(place && place1){
        console.log(place.name);
        console.log(place.geometry.location.lat());
        console.log(place.geometry.location.lng());
    
        console.log(place1.name);
        console.log(place1.geometry.location.lat());
        console.log(place1.geometry.location.lng());

        var distance = google.maps.geometry.spherical.computeDistanceBetween(place.geometry.location, place1.geometry.location);       
        console.log(distance);
        console.log(distance/1000);
        if (document.getElementById('Price') != null) {
            document.getElementById('Price').value="Calculer";
        }        x =((Math.ceil(((distance/1000).toFixed(3))*10)/10)*1.6).toFixed(2);
    }
        
   
}
    
function calcul(){
    if (document.getElementById('Price') != null) {
    document.getElementById('Price').value=x+" CHF";
}
}


function PriceCalculator (){
    
    let kilometrage=document.getElementById('Kilometrage').value;
        if(kilometrage==="" || dateText==="")
        {return ;};
    kilometrage=parseFloat(kilometrage);
    let d=new Date(dateText);
		
		let price=6.60;
       
		
         console.log(d.getDay());
		if(d.getHours()>=6 && d.getHours()<20 && d.getDay()!=0)
		{       
				price=price+(10*3.20);}
	   
        else
        {
            price=price+(10*4.00);
        }
		
}
