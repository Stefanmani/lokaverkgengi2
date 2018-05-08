$(window).on ("load", function () {

   if ($(window).width() <= 980) {
    $(".here").addClass("col-12");
    $(".here").removeClass("col-6");
   }
  
   if ($(window).width() <= 500) {
    if($("#lbefni").hasClass("ccheck") == false) {
       $("#lbefni").addClass("ccheck");      
      $(".flokkar").html("<span class='col-4'>Merki</span><span class='col-4'>Gengi</span><span class='col-4'>Breyting</span>");
      $("#lbefni").html(" ");
      $("#arionefni").html(" ");
      aja("lb",1);
      aja("arion",1);
    }
   }
});
var villute = "<h2 class='villa'>Villa kom upp þegar reynt var að sækja gögnin, reyndu aftur síðar</h2>";
var hitml = 0;
var syna = function() {
              $("#listinn").removeClass("falid");
              $("#oor").html("<i id='oorinn' class='fas fa-angle-up'></i>");  
            };
var fela = function () {
              $("#listinn").addClass("falid");
              $("#oor").html("<i id='oorinn' class='fas fa-angle-down'></i>");      
            };

//myntubreytur
$("#oor").click(function() {
  if ( $("#listinn").hasClass("falid") == true) {
    syna();
  } else {
    fela();
  } 
});

/*
//Reikni punktar : In Progress
var lengd = $("#no1").val().length;
$("#no1").change(function() {
  if (lengd > 3) {
    var deilt = lengd/3;
    console.log(deilt)
  }
});
$("#no1").keypress(function(e) {
  if (lengd>3) {
  }
});
*/
/*
  $('html, body').animate ({
    scrollTop: $("#n0"+numer).offset().top - haed}, 'slow');*/

//myntuval f.m5
var gengid = 1;
var myntuvel = function(numer,gildi) {
  for (var z = 0; z<10;z++) {
    $("#n0"+z).removeClass("pratt");
  }
  $("#n0"+numer).addClass("pratt");
  var skr = gildi.results[numer].value;
  gengid =  skr;
};

var iskmyntuvel = function() {
   for (var z = 0; z<9;z++) {
    $("#n0"+z).removeClass("pratt");
  }
  $("#n09").addClass("pratt");
  gengid = 1;
};
//myntubreita f. m5
var urvinsla = function(gildi) {
  var magn = $("#no1").val()*gengid;
  for (var x = 0; x<gildi.results.length;x++){
    var marg = gildi.results[x].value;
    var tal = (magn/marg)*1000;
    var tal2 = (Math.round(tal))/1000;
    var tala = tal2.toLocaleString();
    $("#"+x+"g").html(tala);
  }
  $("#g").html(Math.round(magn).toLocaleString())
   if ($(window).width() <= 980) {
  $('html, body').animate ({
    scrollTop: $("#gjaldut").offset().top}, 'slow');}
};

//m5 upplýsingar
$.ajax({
  'url': 'https://apis.is/currency/m5',
  'type': 'GET',
  'dataType': 'json',
  'success': function(gildi) {  
   
$("#no2").click(function() {
  urvinsla(gildi);
  });
$("body").keypress(function(e) {
  if (e.which == 13) {
    urvinsla(gildi);
    }
  });
$("#n00").click(function() {
  myntuvel(0,gildi);
  });
$("#n01").click(function() {
  myntuvel(1,gildi);
  });
$("#n02").click(function() {
  myntuvel(2,gildi);
  });
$("#n03").click(function() {
  myntuvel(3,gildi);
  });
$("#n04").click(function() {
  myntuvel(4,gildi);
  });
$("#n05").click(function() {
  myntuvel(5,gildi);
  });
$("#n06").click(function() {
  myntuvel(6,gildi);
  });
$("#n07").click(function() {
  myntuvel(7,gildi);
  });
$("#n08").click(function() {
  myntuvel(8,gildi);
  });
$("#n09").click(function() {
  iskmyntuvel();
  });       
//M5 Error
},
'error': function() {  
  $(".error").html(villute)
  }
});
//Gengis upplýsingar
 var aja = function(banki,serial) {
  $.ajax({
    'url': 'https://apis.is/currency/' + banki,
    'type': 'GET',
    'dataType': 'json',
    'success': function(gildi) {
      var html  = [];
      for (var x=0;x<gildi.results.length;x++) {
        var merki = gildi.results[x].shortName;
        var nafn = gildi.results[x].longName;
        var gengi2 = gildi.results[x].value;
        var gengi1 = gengi2*100; 
        var gengi = (Math.round(gengi1))/100;
        var breytV1 = gildi.results[x].changeCur*100;
        var breytV = (Math.round(breytV1))/100;         
        var litur = "";
        if (breytV >= 0) {
          litur = "griinu";
        } else {
          litur = "redu";
        }
        if (serial == 0) {
          html.push("<div class='efni col-12 row'><span class='col-3'>"+ merki+"</span><span class='col-4'>"+nafn+"</span><span class='col-3 incon'>"+gengi+" ISK"+"</span><span class='col-2 incon "+ litur+"'>"+breytV+"</span></div>");
        } else {
          html.push("<div class='efni col-12 row'><span class='col-4'>"+ merki+"</span><span class='col-4 incon'>"+gengi+" ISK"+"</span><span class='col-4 incon "+ litur+"'>"+breytV+"</span></div>");
        }
        
        }
      $("#"+banki+"efni").html(html);
        },
    //LB Error
    'error': function() {
      if (banki = "lb") {
         $("#lbefni").html(villute);   
      } else {
         $("#arionefni").html(villute);
      }
    }
  }); 
};
aja("lb",0);
aja("arion",0);

$(window).resize ( function() {  
  if ($(window).width() <= 980) {
    if($(".here").hasClass("col-6") == true) {
    $(".here").addClass("col-12");
    $(".here").removeClass("col-6");
    }
  }
  else {
  if ($(".here").hasClass("col-12") == true ) {
    $(".here").removeClass("col-12");
    $(".here").addClass("col-6");   
    }
  }
  
  if ($(window).width() <= 500) {
    if($("#lbefni").hasClass("ccheck") == false) {
      $("#lbefni").addClass("ccheck");      
      $(".flokkar").html("<span class='col-4'>Merki</span><span class='col-4'>Gengi</span><span class='col-4'>Breyting</span>");
      $("#lbefni").html(" ");
      $("#arionefni").html(" ");
      aja("lb",1);
      aja("arion",1);
    }
  }
  else {
  if ($("#lbefni").hasClass("ccheck") == true ) {
    $("#lbefni").removeClass("ccheck");
    $(".flokkar").html("<span class='col-3'>Merki</span><span class='col-4'>Nafn</span><span class='col-3'>Gengi</span><span class='col-2'>Breyting</span>");
     $("#lbefni").html(" ");
      $("#arionefni").html(" ");
      aja("lb",0);
      aja("arion",0);
    }
  } 
}); 
/*
$('body').on('keydown', function (e) {
    console.log(e.keyCode);
});*/
$('body').on('keydown',function(e) {
  if (e.which == 38) {
   $('body').on('keydown',function(e) {
     if (e.which == 38) {
       $('body').on('keydown',function(e) {
         if (e.which == 40) {
           $('body').on('keydown',function(e) {
             if (e.which == 40) {
               $('body').on('keydown',function(e) {
                 if (e.which == 37) {
                   $('body').on('keydown',function(e) {
                     if (e.which == 39) {
                       $('body').on('keydown',function(e) {
                         if (e.which == 37) {
                           $('body').on('keydown',function(e) {
                             if (e.which == 39) {
                               $('body').on('keydown',function(e) {
                                if (e.which == 66) {
                                  $('body').on('keydown',function(e) {
                                    if (e.which == 65) {
                                      $(".non").removeClass("nonfalid");
                                      setTimeout(function() {
                                      $(".non").addClass("nonfalid");;
                                        }, 250);
                                  }
                                 });   
                                }
                              });  
                             }
                           });
                         }
                       });
                     }
                   });
                 }
               });
             }
           });
         }
       });
     }
   });
  }
});