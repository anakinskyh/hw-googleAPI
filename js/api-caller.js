console.log('load api-caller');

var url = 'https://kgsearch.googleapis.com/v1/entities:search';

$(document).ready(function() {
    $('#search_button').click(function() {
        var keyword = $('#keyword').val();

        if(keyword=='')
          return;

        console.log(keyword);

        var params = {
            'query': keyword,
            'limit': 10,
            'indent': 'true',
            'key': 'AIzaSyC4OJUZ8w10EiWIbIEpaKkIsYo8wd6AkLk'
        };

        $.ajax({
            datatype: 'json',
            url: url,
            data: params,
            success: success
        });

        // var template = $('#card-template').clone();
        // console.log(template);
        // template.style.display = 'inline-block';
        // template.id = '';

        $('#card-container').html('');

        function success(data) {
            console.log(data.itemListElement);
            $('#card-container').html('');
            for (var i = 0; i < data.itemListElement.length; i++) {
                // console.log(data.itemListElement[i].result);
                var item = data.itemListElement[i].result;

                $('#card-template').clone().appendTo('#card-container');
                $('#card-container div:last-child').css('display','inline-block');

                try {
                    var image_url = item.image.contentUrl;
                    console.log(image_url);
                } catch (err) {
                    var image_url = 'https://www.joomlashine.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png';
                    console.log('err');
                }
                var d = new Date();
                $('#card-container>div:last-child img').prop('src',image_url/*+'&a='+Math.random()*/);
                $('#card-container>div:last-child h1').text(item.name);
                $('#card-container>div:last-child p').text(item.detailedDescription.articleBody);
                // console.log(image_url);
            }
        }
    });
});
