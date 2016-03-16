(function(){

	function isValidEmailAddress(emailAddress) {

        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    };

    function infoMsg(msg){

    	$("#info")
        	.css({color:"lightgreen"})
        	.html(msg);

    	setTimeout(function(){

        	$("#info").empty();
        },3000);
    }

    function errMsg(msg){

    	$("#info")
        	.css({color:"red"})
        	.html(msg);

    	setTimeout(function(){

        	$("#info").empty();

        },3000);
    }

    $("input[type=text],textarea").focus(function(){

		$(this)
			.css("border-color","#aaa");
	});

	$("#contact").click(function(){

		$(".overlay").show();
	});

	$("#contact-form").click(function(event){

		event.stopPropagation();		
	})

	$("#contact-form").parent().click(function(event){

		$(".overlay").hide();
	})

	$("#send").click(function(){

		if(!$("#name").val()){

			errMsg("Name field is required!");

			$("#name")
				.css("border-color","red");
		}
        else if(!$("#email").val()){

            errMsg("Email field is required!");

            $("#email")
				.css("border-color","red");
        }
        else if(!isValidEmailAddress($("#email").val())){

        	errMsg("Invalid email address!");

        	$("#email")
				.css("border-color","red");
        }
        else if(!$("#subject").val()){

            errMsg("Subject field is required!");

            $("#subject")
				.css("border-color","red");
        }
        else if(!$("#message").val()){

        	errMsg("Message field is required!");

        	$("#message")
				.css("border-color","red");
        }
		else
            $.ajax({

                url: "http://formspree.io/pitsolu@gmail.com",
                method: "POST",
                data: {
                        "name":$("#name").val(),
                        "_replyto":$("#email").val(),
                        "_subject":$("#subject").val(),
                        "message":$("#message").val()
                    },
                dataType: "json"
            })
            .success(function(){

                $("#name").val("");
                $("#email").val("");
                $("#subject").val("");
                $("#message").val("");

            	infoMsg("Thank you. Your message has been sent.");
            })
            .fail(function(){

                errMsg("Something went wrong!!!");
            });
	})

})();