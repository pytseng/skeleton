// const api = "http://ec2-52-15-200-86.us-east-2.compute.amazonaws.com:8080";
const api = "http://localhost:8080";


var get_receipts = function(){


    $.getJSON(api+"/receipts", function(receipts){
        for(var i=0; i < receipts.length; i++) {
            var receipt = receipts[i];
            $(`<div class="row receipt">
                <div class="col-sm-2 time">${receipt.created}</div>
                <div class="col-sm-3 merchant">${receipt.merchantName}</div>
                <div class="col-sm-1 amount">${receipt.value}</div>
                <div class="col-sm-6 tags">
                    <span class="tagValue"></span>
                    <button class="add_tag">add tag</button>
                    <input type="text" class="tag_input">
                </div>
               </div>`).appendTo($("#receiptList"));
        }

    }).done(function(){
        $(".add_tag").click(function() {
            $(this).siblings(".tag_input").toggle();
            // $(this).css( "display", "true" );
            // $(this).parent().append("<input type=\"text\" class=\"tag_input\">");
        })

        $(".tag_input").on('keyup', function (e) {
            var tag_input_val = $(this).val();
            if (e.keyCode == 13) {
                $(this).parent().append("<span>" + tag_input_val + "</span>");
            }
        });
    })
}

var get_netid = function() {
    $.ajax({
        // dataType: "json",
        url: api+"/netid"
        // data: data,
        // success: success
    }).done(function(data) {
        console.log(data);
    });
}

var add_receipt = function() {
    $("#save-receipt").click(function() {
        var merchant = $("#merchant").val();
        var amount = $("#amount").val();
        $.ajax({
            type: "POST",
            url: api + "/receipts",
            data: JSON.stringify({"merchant":merchant, "amount":amount}),
            contentType: "application/json",
            dataType: "text"
        }).done(function() {
            $.getJSON(api+"/receipts", function(receipts){
                var latest_receipt_idx = receipts.length - 1
                var receipt = receipts[latest_receipt_idx];
                $(`<div class="row receipt">
                    <div class="col-sm-2 time">${receipt.created}</div>
                    <div class="col-sm-3 merchant">${receipt.merchantName}</div>
                    <div class="col-sm-1 amount">${receipt.value}</div>
                    <div class="col-sm-6 tags">
                        <span class="tagValue"></span>
                        <button class="add_tag">add tag</button>
                        <input type="text" class="tag_input">
                    </div>
                </div>`).appendTo($("#receiptList"));
            }).done(function(){
                $(".add_tag").last().click(function() {
                    $(this).siblings(".tag_input").toggle();
                })

                $(".tag_input").last().on('keyup', function (e) {
                    var tag_input_val = $(this).val();
                    if (e.keyCode == 13) {
                        $(this).parent().append("<span>" + tag_input_val + "</span>");
                    }
                });
            })
        });
    })
}

$("#cancel-receipt").click(function() {
	$("#add-receipt").click();
	$("#merchant").val('');
	$("#amount").val('');
})


get_netid();
get_receipts();
add_receipt();
