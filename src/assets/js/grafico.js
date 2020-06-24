var numero_de_solicitudes = 1;


//necesario para armar el grafico
var grafico = new Morris.Line(

  {
    // ID of the element in which to draw the chart.
    element: 'myfirstchart',
    // Chart data records -- each entry in this array corresponds to a point on
    // the chart.
    data: [ 
    

    
    ],
    // The name of the data record attribute that contains x-values.
    xkey: 'tiempo',
    // A list of names of data record attributes that contain y-values.
    ykeys: ['batteryState','sTemperatura','sHumedad','sVoltaje'],
    // Labels for the ykeys -- will be displayed when you hover over the
    // chart.
    labels: ['batteryState','sTemperatura','sHumedad','sVoltaje'],
    hideHover:'auto',
    pointSize:1,
    lineWidth: 5,
    xmax: 'auto',
    xLabels: 'tiempo',
    xLabelAngle: 45,
    yLabels:'hide',

    resize: true,
    ymax : 'auto[180]',
    ymin : 'auto[0]'    
  }
);

  //necesario para traer la informacion del servidor 

var time = new Date();
let filter_dia_1 = String(time.getFullYear()) + "-" + "0" + (parseInt(time.getMonth()) + 1) + "-" + time.getDate();
let filter_dia_2 = String(time.getFullYear()) + "-" + "0" + (parseInt(time.getMonth()) + 1) + "-" + time.getDate();
let filter_hora_1 = "00";
let filter_hora_2 = "23";
let filter_min_1="00";
let filter_min_2="59";



function getWelcome(){
  numero_de_solicitudes = numero_de_solicitudes + 1;
  var ajaxRequest = new XMLHttpRequest();
  ajaxRequest.onreadystatechange = function(){
  
    if(ajaxRequest.readyState == 4){
      //the request is completed, now check its status
      if(ajaxRequest.status == 200){
        //turn JSON into object
        
        console.log("Solicitud : request finished and response is ready");
        

        let jsonObj = JSON.parse(ajaxRequest.responseText);
        // console.log(ajaxRequest.responseText);
        let i;
        let size = -1;

        for (i in jsonObj){
          size++
        }

        /*
        console.log(size);

        console.log( jsonObj[Object.keys(jsonObj)[1]].batteryState );*/
      
          
        document.getElementById("battery").innerHTML = parseFloat(String(jsonObj[Object.keys(jsonObj)[size]].batteryState * 100 * 0.1755)).toFixed(2) + " %";
        document.getElementById("humedad").innerHTML = jsonObj[Object.keys(jsonObj)[size]].sHumedad + " %";
        document.getElementById("temperatura").innerHTML = jsonObj[Object.keys(jsonObj)[size]].sTemperatura + " ºC";
        document.getElementById("time").innerHTML = jsonObj[Object.keys(jsonObj)[size]].tiempo ;
        document.getElementById("battery-voltaje").innerHTML = "0" + ((( 8.36 / ( 100 ) * parseFloat( String(jsonObj[Object.keys(jsonObj)[size]].batteryState * 100 * 0.1755  )))).toFixed(2)) + " V";
        document.getElementById("label-date-1").innerHTML = String(time.getFullYear()) + "-" + "0" + (parseInt(time.getMonth()) + 1) + "-" + time.getDate()  ;
        document.getElementById("label-date-2").innerHTML = String(time.getFullYear()) + "-" + "0" + (parseInt(time.getMonth()) + 1) + "-" + time.getDate()  ;
        document.getElementById("filtro_actual").innerHTML = "<strong>Filtro actual:</strong> "+ "<i>"+filter_dia_1 + " "+ filter_hora_1 +":"+filter_min_1+"</i>"+" <strong>hasta</strong> " +"<i>"+ filter_dia_2 + " " + filter_hora_2 +":" + filter_min_2+"</i>";

        console.log("Numero de solicitudes:"+numero_de_solicitudes);
        
        let i1;
        let index = 0;
        let object_to_push = new Object();
        var object_prueba = [];
        var object_prueba_debbug = [];
       

        // Esto esta funcionando de maravilla
        for(i1 in jsonObj){
          
          index++

          // AND && OR ||
          if( ( parseInt( ( String(jsonObj[i1].tiempo).slice(8,10) ) ) >= parseInt(filter_dia_1.slice(8,10))  &&  parseInt(String(jsonObj[i1].tiempo).slice(11,13)) >= parseInt(filter_hora_1) ) && (  parseInt( ( String(jsonObj[i1].tiempo).slice(8,10) ) ) <= parseInt(filter_dia_2.slice(8,10)) && parseInt(String(jsonObj[i1].tiempo).slice(11,13)) <= parseInt(filter_hora_2 ) ) && !isNaN(Date.parse(jsonObj[i1].tiempo))){
            
            // object_to_push_debbug = {
            //  "tiempo" : jsonObj[i1].tiempo,
            //  "batteryState" : jsonObj[i1].batteryState ,
            //  "sHumedad" : jsonObj[i1].sHumedad,
            //  "sTemperatura" : jsonObj[i1].sTemperatura

            // }

            object_to_push = {
             "tiempo" : Date.parse(jsonObj[i1].tiempo),
             "batteryState" : jsonObj[i1].batteryState * 100 * 0.1755,
             "sHumedad" : jsonObj[i1].sHumedad,
             "sTemperatura" : jsonObj[i1].sTemperatura,  
             "sVoltaje" :  ((8.36/100) * jsonObj[i1].batteryState * 100 * 0.1755) 


            }

            object_prueba.push(object_to_push);
            //object_prueba_debbug.push(object_to_push_debbug);
          }


           
          
        }

        // var myJsonString = JSON.stringify(yourArray);
        // console.log(myJsonString);
        //console.log( "Objeto de prueba:" + ( jsonObj[Object.keys(jsonObj)[102]].tiempo.slice(11,13)) );
        //console.log(object_prueba_debbug);
        // console.log("llegue hasta este punto");
        // console.log(String(filter_dia_1).slice(8,10));
        // console.log(String(filter_dia_2).slice(8,10));

        grafico.setData(object_prueba);
      }
      else{
        console.log("Status error: " + ajaxRequest.status);
      }
    
    }else{
      console.log("Esperando Respuesta del servidor");
    }
  }
  
  ajaxRequest.open('GET', 'https://arduinoiot33.firebaseio.com/ARD-PA15062020.json');
  //let request = ajaxRequest.getResponseHeader();
  //console.log(request);
  ajaxRequest.send();
}

function setfilter(){
  filter_dia_1 = String(document.getElementById("date_range_1").value).slice(0,10) ;
  filter_dia_2 = String(document.getElementById("date_range_2").value).slice(0,10) ;
  
  filter_hora_1 = String(document.getElementById("hora_1").value).slice(0,2);
  filter_hora_2 = String(document.getElementById("hora_2").value).slice(0,2);

  filter_min_1 = String(document.getElementById("hora_1").value).slice(3,5);
  filter_min_2 = String(document.getElementById("hora_2").value).slice(3,5);

  if(filter_dia_1 == "" ){

    filter_dia_1 = String(time.getFullYear()) + "-" + "0" + (parseInt(time.getMonth()) + 1) + "-" + time.getDate()  ;
  }

  if(filter_dia_2 == "" ){

    filter_dia_2 = String(time.getFullYear()) + "-" + "0" + (parseInt(time.getMonth()) + 1) + "-" + time.getDate()  ;
  }


  if(filter_min_1 == "" ){

    filter_min_1 = "00";
  }

  if(filter_min_2 == "" ){

    filter_min_2 = "59" ;
  }
  
  if(filter_hora_1 == ""){
    filter_hora_1 = "00";
  }

  if(filter_hora_2 == ""){
    filter_hora_2 = "23";
  }
  getWelcome();
}

setInterval('getWelcome()',60000);
