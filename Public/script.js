$(document).ready(function(){
console.log("load function");
    onClick();
    onLoad();
    // scrollFunction();
 

});
function onLoad(){
    $('.company_container').empty();
        console.log("On Load: empty company containers");
        $.ajax({
            method: "GET",
            url: "/Company_Name_All", //url is /routename
            dataType: 'json',
            headers: {
                'Content-Type':'application/json',
                'Access-Control-Allow-Headers':'*'
            },
            success: function(data) { 
                for(var i = 0; i < data.length; i++){
                    var myHtml = 
                        "<div class='card' div class id='companycard'>"+
                        "<img src ='"+data[i].LOG_URL+"' id = 'logo_url'>"+
                        "<h4 id='company_name'>"+data[i].Company_Name+"</h4>"+ 
                        "<h1 id= 'link_name'> <a href= '"+data[i].Website+"'>"+data[i].Website+" </a> </h1>"+
                        "</div>"                    
                    $('.company_container').append(myHtml)
                }
            },
            error: function(xhr, status, error) { 
                console.log("ERROR: ", error) 
            }

        })

    $('.position_container').empty();
         console.log("On Load: empty position containers");
        $.ajax({
            method: "GET",
            url: "/Position_All", //url is /routename
            dataType: 'json',
            headers: {
                'Content-Type':'application/json',
                'Access-Control-Allow-Headers':'*'
            },
            success: function(data) { 
               for(var i = 0; i < data.length; i++){
                    var myHtml =
                        "<div class='card' div class id='position_card'>"+
                        "<img src ='"+data[i].LOG_URL+"' id = 'logo_url'>"+ 
                        "<h4 id = 'company_name'>"+data[i].Company_Name+ "</h4>"+ 
                        "<h4 id ='position'>"+data[i].Position+"</h4>"+
                        "<h4 id='position_source'> <a href='"+data[i].Position_Source+"'> link to apply: <br> <br>"+data[i].Position_Source+"</a href> </h4>"+
                        "</div>"
                    $('.position_container').append(myHtml)
                }
            },
            error: function(xhr, status, error) { 
                console.log("ERROR: ", error) 
            }

        })
    // $('#input_co').click(function(){
        // $('.NTID_D_con').empty();
        //     console.log("empty NTID_D_con on click");

        $.ajax({
            method: "GET",
            url: "/Company_Name_All",
            dataType: 'json',
            headers: {
                'Content-Type':'application/json',
                'Access-Control-Allow-Headers':'*'
            },
            success: function(data) { 

                for(var i = 0; i < data.length; i++){
                    var myHtml =
                        "<option value='"+data[i].Company_ID+"''>"+data[i].Company_Name+"</option>"
 
                        $('#input_co').append(myHtml);



                        // console.log(myHtml);
                        // var wadeElm = $('.NTD');
                        // console.log(wadeElm[i].value);
                        // //console.log(.val());
                        
                  
                }
                
            },
            error: function(xhr, status, error) { 
                console.log("ERROR: ", error) 
            }
        })
        $.ajax({
            method: "GET",
            url: "/NTID_Name_ALL",
            dataType: 'json',
            headers: {
                'Content-Type':'application/json',
                'Access-Control-Allow-Headers':'*'
            },
            success: function(data) { 

                for(var i = 0; i < data.length; i++){
                    var myHtml =
                        "<option value='"+data[i].NTID+"''>"+data[i].Title+"</option>"
 
                        $('#NTID_D_i').append(myHtml);



                        // console.log(myHtml);
                        // var wadeElm = $('.NTD');
                        // console.log(wadeElm[i].value);
                        // //console.log(.val());
                        
                  
                }
                
            },
            error: function(xhr, status, error) { 
                console.log("ERROR: ", error) 
            }
        })

};
function onClick(){

    $('#cosearchbtn').click(function(){
        $('.company_container').empty();
            console.log("empty company container on click");
        console.log($('#searchinput').val());
        var searchinput = $('#searchinput').val();
        console.log(searchinput);
        $.ajax({
            method: "GET",
            url: "/Company_Name_Search?Company_Name="+searchinput, //url is /routename
            dataType: 'json',
            headers: {
                'Content-Type':'application/json',
                'Access-Control-Allow-Headers':'*'
            },
            success: function(data) { 
                console.log(data);                
                var resultnum = data.length;
                console.log(resultnum);
                $('#results').html(resultnum+" result(s)")
                for(var i = 0; i < data.length; i++){
                    
                    var myHtml = 
                        "<div class='card' div class id='companycard'>"+
                        "<img src ='"+data[i].LOG_URL+"' id = 'logo_url'>"+
                        "<h4 id='company_name'>"+data[i].Company_Name+"</h4>"+ 
                        "<h1 id= 'link_name'> <a href= '"+data[i].Website+"'>"+data[i].Website+" </a> </h1>"+
                        "</div>"
                    $('.company_container').append(myHtml)
                }
            },
            error: function(xhr, status, error) { 
                console.log("ERROR: ", error) 
            }
        })
    })
    $('#posearchbtn').click(function(){
        $('.position_container').empty();
            console.log("empty position_container on click");
        console.log("typed data is "+$('#searchinput').val());
        var searchinput = $('#searchinput').val();
        console.log("input data into function is "+searchinput);
        $.ajax({
            method: "GET",
            url: "/Position_Search?Position="+searchinput, //url is /routename
            dataType: 'json',
            headers: {
                'Content-Type':'application/json',
                'Access-Control-Allow-Headers':'*'
            },
            success: function(data) { 
                console.log(data);
                var resultnum = data.length;
                console.log(resultnum);
                 $('#results').html(resultnum+" result(s)")
                for(var i = 0; i < data.length; i++){

                    var myHtml =
                        "<div class='card' div class id='position_card'>"+
                        "<img src ='"+data[i].LOG_URL+"' id = 'logo_url'>"+ 
                        "<h4 id = 'company_name'>"+data[i].Company_Name+ "</h4>"+ 
                        "<h4 id ='position'>"+data[i].Position+"</h4>"+
                        "<h4 id='position_source'> <a href='"+data[i].Position_Source+"'> link to apply: <br> <br>"+data[i].Position_Source+"</a href> </h4>"+
                        "</div>"
                    $('.position_container').append(myHtml)
                }
            },
            error: function(xhr, status, error) { 
                console.log("ERROR: ", error) 
            }
        })
    })


    $('#submitform').click(function(){
        console.log($('#input_co').val());
        console.log($('#input_pos').val());
        console.log($('#NTID_D_i').val());
        console.log($('#input_website').val());
        

        var passJSON = {         
            "CID_D_i":Number($('#input_co').val()),
            "pos_input_i":$('#input_pos').val(),
            "pos_web_input_i":$('#input_website').val(),
            "NTID_D_i":Number($('#NTID_D_i').val())

        };
        console.log(passJSON," from varpassJSON");
        $.post("/New_Pos", passJSON ,function(data, status){
            console.log(data);
        });
        // $.ajax({
        //     method: "POST",
        //     url: "/New_Pos", //url is /routename
        //     dataType: 'json',
        //     headers: {
        //         'Content-Type':'application/json',
        //         'Access-Control-Allow-Headers':'*'
        //     },
        //     data: wadesJSON,
        //     success: function(data) { 
        //         console.log("success script.js")
        //     },
        //     error: function(xhr, status, error) { 
        //         console.log("ERROR: ", error) 
        //     }
        // })
    })
}
// window.onscroll = function() {scrollFunction()};

// function scrollFunction() {
//     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//         document.getElementById("myBtn").style.display = "block";
//     } else {
//         document.getElementById("myBtn").style.display = "none";
//     }
// }

// // When the user clicks on the button, scroll to the top of the document
// function topFunction() {
//     document.body.scrollTop = 0; // For Safari
//     document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
// } 