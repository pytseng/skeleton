// const api = "http://ec2-52-15-200-86.us-east-2.compute.amazonaws.com:8080";
const api = "http://localhost:8080";


var all_tags = {};

var get_tags = function(){
    $.ajax({
        url: api + "/tags",
        dataType: 'json',
    }).done(function(tags) {
        console.log(tags);
        all_tags = tags;
    });
}

var fxn_add_tag = function(merchantID, tagName){
    $.ajax({
        method: "PUT",
        url: api + "/tags/" + tagName,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(merchantID),
        async: false,
    }).done(function() {
        console.log(merchantID,":", tagName)
    })
}

var activate_tag = function() {
    $(".tag_input").on('keyup', function (e) {
        var tag_input_val = $(this).val();
        if (e.keyCode == 13) {
            $(this).parent().append("<span>" + tag_input_val + "</span>");
        }
    });
}


$(".tag_input")

var get_receipts = function(){
    get_tags();
    $.getJSON(api+"/receipts", function(receipts){
        for(var i=0; i < receipts.length; i++) {
            var receipt = receipts[i];
            var receipt_id = receipt.id;
            var tag = [];
            //get tags and put them into each receipt
            for(var j = 0 ; j < all_tags.length ; j++) {

                if (all_tags[j].id == receipt_id) {
                        tag.push(all_tags[j].tag_name);
                    }
                }
            //append them into receipt row
            $(`<div class="row receipt">
                <div class="col-sm-2 time">${receipt.created}</div>
                <div class="col-sm-3 merchant">${receipt.merchantName}</div>
                <div class="col-sm-1 amount">${receipt.value}</div>
                <div class="col-sm-6 tags">
                    <button class="add_tag">add tag</button>
                    <input type="text" class="tag_input">
                    <span class="tagValue">${tag}</span>
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
                        <button class="add_tag">add tag</button>
                        <input type="text" class="tag_input">
                        <span class="tagValue"></span>
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
