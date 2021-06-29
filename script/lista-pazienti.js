$(document).ready(function(){ 

    // var xhr;
    // new autoComplete({
    //     selector: 'input[name="q"]',
    //     source: function(term, response){
    //         try { xhr.abort(); } catch(e){}
    //         xhr = $.getJSON('https://localhost:44366/riepilogo/getpatientname', { q: term }, function(data){ 
    //             response(data);
    //             console.log(data);
    //         });
    //     }
    // });

    var xhr;
    new autoComplete({
        selector: 'input[name="q"]',
        source: function(term, response){
            try { xhr.abort(); } catch(e){}
            xhr = $.getJSON('https://localhost:44366/riepilogo/getpatientname', 
            { q: term },
            function(data){ 
                response(data); 
            });
        }
    });

});