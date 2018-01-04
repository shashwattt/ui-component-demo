$(document).ready(function () {

    $('#openPopup').on('click', function(){
        $('.overlay').css({
            "display":"flex",
            "opacity":"0"
        });

        $('.overlay').animate({
            opacity:100
        },3000);
    });


    $('#closePopup').on('click', hidePopup)

    $('form').submit(function(event){
        event.preventDefault();
        
        let inputs = $('form :input');
        let values = {};
        let tracks = inputs[1].value;
        let artist = inputs[0].value;
        if(artist=='Jack' && tracks==4){
                $.ajax({
                    url: "http://itunes.apple.com/search?term=jack&limit=4",
                    contentType: 'application/json',
                    success: function (response) {
                        hidePopup();
                        populateList(JSON.parse(response));
                        console.log(response);
                    }
                })

        }
    });

    $('#clear-result').on('click', function(){
        $('.search-flex').css({
            display:'flex'
        });
        $('.result').css({
            display:'none'
        });
        $('.result-list').html('');
    })

    function populateList(response){
        if(response && response.results && response.results.length > 0){
            response.results.forEach(item => {

                console.log(item);
                var img = $("<img>").attr({
                    class: 'display-image',
                    src : item.artworkUrl100
                })

                var artistName = $("<span>").html(item.artistName); 
                var trackName = $("<span>").html(item.trackName); 
                var descText = (item.longDescription.length > 150) ? item.longDescription.substring(0,150) + '...':item.longDescription;
                var desc = $("<span>").html(descText);  

                var contentDiv = $('<div>').attr({
                    class:'result-info'
                }).append(artistName).append(trackName).append(desc);

                var resultDiv = $('<div>').attr({
                    class:'result-list-item'
                }).append(img).append(contentDiv);

                $('.result-list').append(resultDiv);
            });

            $('.search-flex').css({
                display:'none'
            });
            $('.result').css({
                display:'block'
            });
        }else{
            console.log('No result')
        }
    }

    function hidePopup(){
        $('.overlay').css({
            "display":"none"
        });
    }
});