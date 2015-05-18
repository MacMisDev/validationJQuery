(function($){

    $.fn.validateText = function( options ){

        //Domyślne ustawienia
        var settings = $.extend({
            patternText : '^[a-z0-9_-]{3,16}$',
            patternEmail : '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$',
            entropy : 50
        }, options);

        //Znajdź input teksowy
        var input = $(this).find('input[type="text"]');
        //Znajdź input email
        var email = $(this).find('input[type="email"]');
        //Znajdź guzik submit
        var submit = $(this).find(':submit');
        //Znajdź input password
        var pass = $(this).find(':password');
        var form = $(this);

        submit.attr('disabled', 'disabled');

        console.log($(this));
        //$('#error').html(input.length);

        input.blur(function(){

            //Pobranie wartości pola
            var value = $(this).val();
            //Utworzenie regexu do sprawdzenia
            var regex = new RegExp(settings.patternText);

            if(!regex.test(value)){
                $(this).css({
                    borderColor : 'red'
                });

                submit.attr('disabled', 'disabled');
            }else{
                $(this).css({
                    borderColor : 'initial'
                });

                checkInputs(form);
            }

        });

        email.blur(function(){

            //Pobranie wartości pola
            var value = $(this).val();
            //Utworzenie regexu do sprawdzenia
            var regex = new RegExp(settings.patternEmail);

            if(!regex.test(value)){
                $(this).css({
                    borderColor : 'red'
                });

                submit.attr('disabled', 'disabled');
            }else{
                $(this).css({
                    borderColor : 'initial'
                });

                checkInputs(form);
            }

        });

        pass.blur(function(){

            //Pobranie wartości pola
            var value = $(this).val();

            if( countEntropy(value) < settings.entropy ){
                $(this).css({
                    borderColor : 'red'
                });

                submit.attr('disabled', 'disabled');
            }else{
                $(this).css({
                    borderColor : 'initial'
                });

                checkInputs(form);
            }

        });

        //Chaining
        return this;
    };

    //Metoda sprawdzająca walidację poszczególnych inputów.
    function checkInputs( myObj ){
        var check = true;
        var submit = myObj.find(':submit');

        console.log(myObj);

        //Dla każdego inputa zrób..
        myObj.find('input').each(function(){

            if($(this).css('borderColor') === 'rgb(255, 0, 0)' || $(this).val() === ''){
                check = false;
            }
        });

        if(check){
            submit.removeAttr('disabled');
        }
    }

    //http://sortris.blogspot.com/2011/06/obliczanie-entropii-hasa.html
    //Metoda slużąca do obliczania entropii
    function countEntropy( value ){
        var entropy = 0;

        if(value.match(/[0-9]+/g) !== null){
            entropy += 10;
        }
        if(value.match(/[a-z]+/g) !== null){
            entropy += 26;
        }
        if(value.match(/[A-Z]+/g) !== null){
            entropy += 26;
        }
        if(value.match(/[!"#$%&'()*+,-.:;<=>?@[\]^_`{|}~]+/g) !== null){
            entropy += 31;
        }
        //Obliczenie entropii względem długości hasła
        var entropyVal = (Math.log(entropy) / Math.LN2) * value.length;

        return entropyVal;
    }

    //Zabezpieczenie aliasu $
})(jQuery);
