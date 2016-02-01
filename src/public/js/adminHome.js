function whenReady() {
    $(document).ready(function() {
        $.ajax({
            type: "GET",
            url: "/admin/getList",
            success: function(data) {
                var len = Object.keys(data).length
                    //window.alert(len);                        
                for (var i = 0; i < len; i++) {
                    $("#EmpList").append("<option>" + data[i]["Name"] + "</option>");
                }
            },
            error: function() {
                console.log('process error');
            }
        });
    });
    $("button").click(function() {
        var txt = $("#name").val();
        $.ajax({
            type: "POST",
            url: "/admin/search",
            data: {
                "Name": txt
            },
            success: function(data) {
                var len = Object.keys(data).length
                for (var i = 0; i < len; i++) {
                    $("#searchRes").append("<a href=" + data[i]["_id"] + ">" + data[i]["Name"] + "</a><br><br>");
                }
            },
            error: function() {
                $("#searchRes").append("Error");
            }
        });
    });
}
