const api = "http://ec2-52-15-161-162.us-east-2.compute.amazonaws.com:8080";
// const api = "http://localhost:8080";

var all_receipts = {};
var all_tags = {};

var m_name = "";
var m_amount = 0;


getReceipts();

$("#add-receipt").click(function() {
    $("#merchant").val("");
    $("#amount").val("");
});

$("#cancel-receipt").click(function() {
    $("#add-receipt").click();
    $("#merchant").val('');
    $("#amount").val('');
})

$("#save-receipt").click(function() {
    var m_name = $("#merchant").val();
    var m_amount = $("#amount").val();
    postReceipt(m_name, parseInt(m_amount));
    $("#receiptList").empty();
    getReceipts();
    $("#add-receipt").click();
});

function getReceipts() {
    $.ajax({
        url: api + "/receipts",
        dataType: 'json',
        async: false,
    }).done(function(receipts){
        all_receipts = receipts;
        var receipt_count = all_receipts.length;

        $.ajax({
            url: api + "/tags",
            dataType: 'json',
            async: false,
        }).done(function(data){
            all_tags = data;
        });

        var all_tags_count = all_tags.length;

        for(var i=0; i<receipt_count; i++) {
            var receipt = all_receipts[i];
            var receipt_id = receipt.id;
            
            // get tag for each receipt
            var tag = [];
            for(var j=0; j<all_tags_count; j++) {
                if (all_tags[j].receipt_id === receipt.id) {
                    tag.push(all_tags[j].tag_name);
                }
            }

            // append receipt row
            var mark = i + receipt.merchantName;
            var raw_component = $(`
                <div class="receipt row" id="${mark}">
                    <div class="time col-sm-2"> ${receipt.created}</div>
                    <div class="merchant col-sm-3">${receipt.merchantName}</div>
                    <div class="amount col-sm-1">${receipt.value}</div>
                    <div class="tags" col-sm-6></div>
                </div>`);

            $("#receiptList").append(raw_component);

            $("#" + mark).append("<input type='button' class='add-tag' name='" + receipt.id + "' value='Add tag'>");
            
            for (var j=0; j<tag.length; j++) {
                $("#"+mark).append("<a href='#' class='tagValue' name='" + receipt.id + "," + tag[j] + "'>" + tag[j] +"</a> ");
            }

        }       
    });
    
    $(".tag_input").hide();
    activateClicks();
}

function postReceipt(m_name, m_amount) {
    var receipt_info = {
        "merchant": m_name,
        "amount": m_amount
    };

    $.ajax({
        method: "POST",
        url: api + "/receipts",
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify(receipt_info),
        async: false
    });
}

function addTag(temp_id, tag) {
    $.ajax({
        method: "PUT",
        url: api + "/tags/" + tag,
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify(temp_id),
        async: false
    });
}


function activateClicks() {
    var temp_id = 0;
    $(".add-tag").click(function() {
        temp_id = parseInt(this.name);
        var x = temp_id - 1;
        var mark = x + all_receipts[temp_id-1].merchantName;
        // append 
        $(".tag_input").detach().appendTo("#" + mark);
        $(".tag_input").val("");
        $(".tag_input").toggle();

    });

    $(".tagValue").click(function() {
        var s = this.name.split(",")
        addTag(parseInt(s[0]),s[1]);
        $("#receiptList").empty();
        getReceipts();
    });

    $(".tag_input").on('keyup', function (e) {
        var tag_input_val = $(this).val();
        if (e.keyCode == 13) {
            $(".tag_input").detach().appendTo("#receiptHeader");
            $(".tag_input").toggle();
            addTag(temp_id, tag_input_val);
            
            $("#receiptList").empty();
            temp_id = 0;
            getReceipts();
        }
    });    
}