function myFunction(str)
      {  
       var x = document.getElementById(str); 
         if (x.type === "password") 
          {    
            x.type = "text";  
          }
        else
          {   
            x.type = "password"; 
          }
      }



    $(window).on('scroll', function() {
        if ($(window).scrollTop() >= 150) {
            $('#sticky-header').addClass('sticky-menu');
        } else {
            $('#sticky-header').removeClass('sticky-menu');
        }
    });
