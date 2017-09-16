
$(".add_tag").click(function() {
	$(this).siblings(".tag_input").toggle();
	// $(this).css( "display", "true" );
	// $(this).parent().append("<input type=\"text\" class=\"tag_input\">");
})

$(".tag_input").on('keyup', function (e) {
	var tag_input_val = $(this).val();
    if (e.keyCode == 13) {
        $(this).parent().append("<li>" + tag_input_val + "</li>");
    }
});

$("#cancel-receipt").click(function() {
	$("#add-receipt").click();
	$("#merchant").val('');
	$("#amount").val('');
})

$("#save-receipt")

// 