/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
//GLOBAL VARS
var s_city = 0;
var s_station = 0;
var s_pump = 0;

var pictureSource; // picture source
var destinationType; // sets the format of returned value

var user_id;
var name;
var city_id;
var city_name;
var group_id;
var group_name;
var station1_id;
var station1_name;
var station2_id;
var station2_name;

var loaded_cities=false;
var loaded_stations=false;

var total_pics = 0;
var j =0 ;

$(document).ready(function(){

});




var app = {
    // Application Constructor
    initialize: function() {
        //initLoginEvents();
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');





        // function onSuccess(imageURI) {
        //     var image = document.getElementById('myImage');
        //     image.src = imageURI;
        // }

        // function onFail(message) {
        //     alert('Failed because: ' + message);
        // }


        // $(document).ajaxStart(function() {
        //     $.mobile.loading('show');
        // });

        // $(document).ajaxStop(function() {
        //     $.mobile.loading('hide');
        // });







    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function initLoginEvents(){

  $(".regular.slider").slick({
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    init: function(slick){
    /*slick.$slides.each(function(index, slide){
        //console.log();
        alert('slide #' + index + ' has been clicked!');
      });*/
      fix();

    }
  });

fix();

  setTimeout(function(){fix();
  },1000);
  setTimeout(function(){fix();
  },2000);

  $('.regular').on('click', '.slick-slide', function(){

  });
  $('.avatar-login').click(function(){
    showCarousel();
  });



}


function fix(){
/*  $('div.slick-slide').css('display','none');
  $('div.slick-slide.slick-active').css('width','112px');
  $('div.slick-slide.slick-active').css('display','inline-block');*/
}

function selectAvatar(index){
  hideCarousel();
  $('.avatar-login').attr('src','img/personaje'+index+'.png');

  $.ajax({
      url: 'http://www.ciancorp.com/primax/services/setAvatar.php',
      type: "post",
      cache: false,
      data: {
          "avatar": index,
          "username":name
      },
      //dataType: "json",
      success: function(response) {


      },
      beforeSend: function() {
      },
      complete: function() {
      }, //Hide spinner
      error: function(error) {

      }
  });




}


$(document).on("pagecontainershow", function() {
    ScaleContentToDevice();

    $(window).on("resize orientationchange", function() {
        ScaleContentToDevice();
    })
});

function showCarousel(){
  $('.carousel-wrapper').css('visibility','visible');
initLoginEvents();
    fix();
}

function hideCarousel(){
  $('.carousel-wrapper').css('visibility','hidden');
}

function ScaleContentToDevice() {
    scroll(0, 0);
    var content = $.mobile.getScreenHeight() - $(".ui-header").outerHeight() - $(".ui-footer").outerHeight() - $(".ui-content").outerHeight() + $(".ui-content").height();
    $(".ui-content").height(content);
}

function changePage() {



    //LOGIN VALIDATION
    $(window).trigger('resize');
    $.ajax({
        url: 'http://www.ciancorp.com/primax/services/login.php',
        type: "post",
        cache: false,
        data: {
            "user": $('#txt_cedula').val()
        },
        //dataType: "json",
        success: function(response) {

            if (response!='null') {
                var hora = hh_mm();
                var fecha = yyyy_mm_dd();
                $('.time-container').html(hora);
                $('.fecha-text').html(fecha);
                name = response.user_name;
                user_id = response.user_id;
                city_id = response.city_id;
                city_name = response.city_name;
                group_id = response.grupo_id;
                group_name = response.grupo_name;
                station1_id = response.estacion1_id;
                station1_name = response.estacion1_name;
                station2_id = response.estacion2_id;
                station2_name = response.estacion2_name;
                $('.username').html($('#txt_cedula').val());

                $('.avatar-login').attr('src','img/personaje'+response.avatar+'.png');
                $('#username_label').html(response.user_name);
                $('#group_label').html(response.grupo_name);
                //carga ciudades
                //$('#listaCities').append('<li class="list-item-lnk" data-id="'+city_id+'"> <a href="#"> '+city_name+'</a></li>');
                //$('#listaCities')

                $('.lv-stations').append('<li class="list-item-lnk" data-id="' + station1_id + '"><a href="#">' + station1_name + '</a></li>');
                $('.lv-stations').append('<li class="list-item-lnk" data-id="' + station2_id + '"><a href="#">' + station2_name + '</a></li>');
                $('#lv-stations').listview("refresh");


                $.mobile.changePage("#page2", {
                    transition: "slide"
                });
            } else {
                navigator.notification.alert("Error al hacer login.", function() {
                    null
                }, "ERROR", "OK");
            }

        },
        beforeSend: function() {
            $.mobile.loading('show');
        },
        complete: function() {
            $.mobile.loading('hide');
        }, //Hide spinner
        error: function(error) {
            $.mobile.loading('hide');
            navigator.notification.alert("Error en la conexion.", function() {
                null
            }, "ERROR", "OK");

        }
    });


}


function goHome() {
    if(goHomeButtonEnabled){
    var hora = hh_mm();
    var fecha = yyyy_mm_dd();
    $('.time-container').html(hora);
    $('.fecha-text').html(fecha);
    //name = response.nombre;
    //user_id = response.status;
    //$('.username').html(response.nombre);

    $.mobile.changePage("#page2", {
        transition: "slide"
    });
  }
}

function gotoCity() {
   /* $('#cities-screen .list-item-lnk').click(function() {
        //$.mobile.changePage("#station-screen");
        s_city = $(this).attr('data-id');
        gotoStation();
        //$('#cities-screen .list-item-lnk').unbind("click");
    });*/
    $.mobile.changePage("#cities-screen", {
        transition: "slide"
    });
}

function gotoStation() {
    // $('#station-screen .list-item-lnk').click(function() {
    //     alert($(this).attr('data-id'));
    //     s_station = $(this).attr('data-id');
    //     gotoIsland();
    // });
    $.mobile.changePage("#station-screen", {
        transition: "slide"
    });
}

function gotoIsland() {
    $('#islands-screen .list-item-lnk').click(function() {
        s_pump = $(this).attr('data-id');

        $.mobile.changePage("#message-screen1", {
            transition: "slide"
        });
        //$('#islands-screen .list-item-lnk').unbind("click");
    });
    $.mobile.changePage("#islands-screen", {
        transition: "slide"
    });
}

function jumPrint1(){
    $.mobile.changePage("#questions-screen", {
            transition: "slide"
    });
}





function hh_mm() {
    now = new Date();
    hour = "" + now.getHours();
    if (hour.length == 1) {
        hour = "0" + hour;
    }
    minute = "" + now.getMinutes();
    if (minute.length == 1) {
        minute = "0" + minute;
    }

    return hour + ":" + minute;
}

function yyyy_mm_dd() {
    now = new Date();
    year = "" + now.getFullYear();
    month = "" + (now.getMonth() + 1);
    if (month.length == 1) {
        month = "0" + month;
    }
    day = "" + now.getDate();
    if (day.length == 1) {
        day = "0" + day;
    }

    return day + "/" + month + "/" + year;
    //return year + "/" + month + "/" + day ;
}


function onPhotoDataSuccess(imageData) {
    // Uncomment to view the base64-encoded image data
    // console.log(imageData);

    // Get image handle
    //
    //var smallImage = document.getElementById('smallImage');

    // Unhide image elements
    //
    //smallImage.style.display = 'block';

    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    //
    //smallImage.src = "data:image/jpeg;base64," + imageData;

    //smallImage.src = imageData;


    $('.img-holder').append('<img class="pic_'+total_pics+'" src="'+imageData+'" />');
    total_pics++;
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
    // Uncomment to view the image file URI
    // console.log(imageURI);

    // Get image handle
    //
    var largeImage = document.getElementById('largeImage');

    // Unhide image elements
    //
    largeImage.style.display = 'block';

    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    //
    largeImage.src = imageURI;
}

// A button will call this function
//
function capturePhoto() {
    //alert(2);
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI
            //destinationType: destinationType.DATA_URL
    });
}

// A button will call this function
//
function capturePhotoEdit() {
    // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality: 50,
        allowEdit: true,
        destinationType: destinationType.FILE_URI
    });
}

// A button will call this function
//
function getPhoto(source) {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}

// Called if something bad happens.
//
function onFail(message) {
    //alert('Failed because: ' + message);
    null;
}


$(document).on("pagebeforeshow", "#questions-screen", function() {
    total_pics = 0;

    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
    $('.img-holder').html('');

    var btn_cam = document.getElementById('btn-camera');
    btn_cam.addEventListener('touchstart', function(e) {
        //alert(1);
        capturePhoto();
        //getPhoto();
        e.preventDefault()
    }, false);

    setTimeout(function(){
      sendButtonEnabled=true;
    },2000);

    $('#btn-send-form').click(function() {
      if(sendButtonEnabled){
        uploadPhoto();

      }
      $('#btn-send-form').unbind("click");
    });

});

var sendButtonEnabled=true;
var goHomeButtonEnabled=true;

function uploadPhoto() {


    if ((typeof $('input[name=question1]:checked').val() === 'undefined') || (typeof $('input[name=question2]:checked').val() === 'undefined') || (typeof $('input[name=question3]:checked').val() === 'undefined') || (typeof $('input[name=question4]:checked').val() === 'undefined') || (typeof $('input[name=question5]:checked').val() === 'undefined') || (typeof $('input[name=question6]:checked').val() === 'undefined') || (typeof $('input[name=question7]:checked').val() === 'undefined') || (typeof $('input[name=question8]:checked').val() === 'undefined') || (typeof $('input[name=question9]:checked').val() === 'undefined') || (typeof $('input[name=question10]:checked').val() === 'undefined')) {

        //alert('Es necesario llenar todos los campos.');
        navigator.notification.alert("Es necesario llenar todos los campos.", function() {
            null
        }, "ERROR", "OK");
        sendButtonEnabled=true;

        return;
    } else {

      sendButtonEnabled=false;
      //goHomeButtonEnabled=false;
      $.mobile.loading('show');




    var data = {
        user: user_id,
        ciudad: s_city,
        station: s_station,
        isla: s_pump,
        question_1 : $('input[name=question1]:checked').val(),
        question_2 : $('input[name=question2]:checked').val(),
        question_3 : $('input[name=question3]:checked').val(),
        question_4 : $('input[name=question4]:checked').val(),
        question_5 : $('input[name=question5]:checked').val(),
        question_6 : $('input[name=question6]:checked').val(),
        question_6_text : $('#txt_promocion').val(),
        question_7 : $('input[name=question7]:checked').val(),
        question_8 : $('input[name=question8]:checked').val(),
        question_9 : $('input[name=question9]:checked').val(),
        question_9_text : $('#txt_aspecto_promotor').val(),
        question_10 : $('input[name=question10]:checked').val(),
        question_10_text : $('#txt_calificacion').val(),
        image: 'false',
    };


        $.ajax({
            url: 'http://www.ciancorp.com/primax/services/saveRecord.php',
            type: "post",
            cache: false,
            data: data,
            //dataType: "json",
            success: function(response) {
               alert("response"+response.status);
              //  setTimeout(function(){
                //  goHomeButtonEnabled=true;
              //  },3000);
                $.mobile.loading('hide');
                //alert(JSON.stringify(response));

                j = 0;
                if(total_pics > 0) {
                while(j <= total_pics) {

                     //$('.img-holder img').each(function() {
                             alert($(this).attr('src'));
                             fileUpload($('.pic_'+j).attr('src'),response.status);
                     //});
                     j++;

                }
                 } else {
                     alert("No habia fotos");
                   setTimeout(function(){
                     sendButtonEnabled=true;
                   },4000);
                    win();
                 }
              //  win();
            },
            beforeSend: function() {
                //$.mobile.loading('show');
            },
            complete: function() {
                $.mobile.loading('hide');
                /*sendButtonEnabled=true;
                setTimeout(function(){
                  goHomeButtonEnabled=true;
                },3000);*/
            }, //Hide spinner
            error: function(error) {
              setTimeout(function(){
                //goHomeButtonEnabled=true;
              },3000);
                $.mobile.loading('hide');
                sendButtonEnabled=true;
                navigator.notification.alert("Error en la conexion.", function() {
                    null
                }, "ERROR", "OK");

            }
        });
}


}



/********** UPLOAD FILE **************/


function fileUpload(fileUrl, record_id) {
    
        alert("Entro al File Upload");

        $.mobile.changePage("#message-screen2", {
            transition: "slide"
        });

        alert(record_id);
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName=fileUrl.substr(fileUrl.lastIndexOf('/')+1);
        options.mimeType = "image/jpeg";

        options.chunkedMode = false;

        options.headers = {
            Connection: "close"
        }
        alert("Settings photo complete");
        //alert(JSON.stringify(data));
        options.params = {
            'record_id': record_id
        };
        //alert(JSON.stringify(options.params));
         alert("Voy a saveData.php");
        var uri = encodeURI("http://ciancorp.com/primax/services/saveData.php");
        $.mobile.loading('show');
        var ft = new FileTransfer();
        ft.upload(fileUrl, uri, win, fail, options);
        alter("hago el upload de la photo");
}





///////////////////////////////////////////////////


function fail(error) {
    //alert("An error has occurred: Code = " + error.code);
    //alert("upload error source " + error.source);
    //alert("upload error target " + error.target);
//alert(JSON.stringify(e));
    $.mobile.loading('hide');
    //alert(JSON.stringify(e));
    navigator.notification.alert("No se pudo realizar la transacción. :" + e, function() {
        null
    }, "ERROR", "OK");
    //alert('ERROR: No se pudo realizar la transacción.');


}

function win(e) {
//alert(JSON.stringify(e));
//alert('2');
//alert('w');
    $.mobile.loading('hide');

    $('#form_questions')[0].reset();
    //$('#smallImage').attr('src','');
    goHomeButtonEnabled=false;
    setTimeout(function(){
      goHomeButtonEnabled=true;
    },4000);

    $.mobile.changePage("#thanks-screen",{transition:"slide"});
}


// $(document).on("pagebeforeshow", "#thanks-screen", function() {

// document.addEventListener("backbutton", function(e){
//     alert($(".ui-page-active").attr("id"));
//     alert($.mobile.pageContainer.pagecontainer( 'getActivePage' ).attr( 'id' ));

//     if($(".ui-page-active").attr("id") == 'thanks-screen' ){
//         e.preventDefault();
//     }
// }, false);

// });
$(document).on("pagebeforeshow", "#thanks-screen", function() {
    //alert("Gracias Agente!");
});

$(document).on("pagebeforeshow", "#cities-screen", function() { 
    loaded_stations = false;
    if( loaded_cities ) return;
    loaded_cities = true;

    //alert(2);
    $.mobile.loading('show');
    $('.lv-stations').html('');
    $.post("http://www.ciancorp.com/primax/services/getCities.php")
        .done(function(submitResponse) {
            $.mobile.loading('hide');
            $.each(submitResponse, function(i, item) {
                $('#listaCities').append('<li class="list-item-lnk" data-id="' + item.id_city + '"><a href="#">' + item.name + '</a></li>').listview("refresh");
            });

            $('#cities-screen .list-item-lnk').click(function() {
                //$.mobile.changePage("#station-screen");
                console.log($(this).attr('data-id'));
                s_city = $(this).attr('data-id');
                console.log(s_city);
                gotoStation();
            });
        });



});










$(document).on("pagebeforeshow", "#station-screen", function() {
    if( loaded_stations ) return;
    loaded_stations = true;

    //alert(2);
    $.mobile.loading('show');
    $('.lv-stations').html('');
    $.post("http://www.ciancorp.com/primax/services/getStations.php", {
            'city': s_city
        })
        .done(function(submitResponse) {
            $.mobile.loading('hide');
            $.each(submitResponse, function(i, item) {
                $('.lv-stations').append('<li class="list-item-lnk" data-id="' + item.id_station + '"><a href="#">' + item.name + '</a></li>').listview("refresh");
            })

        });


    $('#station-screen ').on("click", ".list-item-lnk", function() {

        s_station = $(this).attr('data-id');
        //alert("llenar las preguntas"+s_station);
        gotoIsland();
    });


});
