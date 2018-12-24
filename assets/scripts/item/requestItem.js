function requestItem() {
    var check = [];
    for (var i = 0; i <= 10; i++) { //Change i's limit to amount of data in a page
        if ($("input:checkbox[id = 'item[" + i + "]checkbox']").is(':checked')) {
            check.push($("input:checkbox[id= 'item[" + i + "]checkbox']").val());
        }
    }
    if (check.length === 0) {
        alert("ERROR");
    }
    else {
       $(".modal-part").load("../../components/modal.html", function () {
            $("#modalTemplate").modal({ show: true });
            $("#modalTitle").html("Request Items");
            $("#modalSaveChanges").html("Request Items");
            $("#modalRequest").show();
            check.forEach(element => {
                $.ajax({
                    type: "GET",
                    dataType: "json",
                    url: "http://localhost:8080/item/" + element,
                    success: function (response) {
                        var itemDataContainer = response.value;
                        var itemData = "";
                        itemData += "<tr class='requestItemRow'>";
                        if (itemDataContainer.imagePath) {
                            var image = itemDataContainer.imagePath;
                            image = image.split("/");
                            image = image.pop();

                            itemData += "<td><img width='100%' src = '../assets/images/items/" + image + "' style='display:block;'></td>";
                        }
                        else {
                            itemData += "Image not found";
                        }
                        itemData += "<td>" + itemDataContainer.itemSku + "</td>";
                        itemData += "<td>" + itemDataContainer.name + "</td>";
                        itemData += "<td class = 'requestQuantityData'><input type= 'number' name='requestQuantity' id='requestQuantity[" + itemDataContainer.itemSku + "]' class='form-control form-control-sm'></td>";
                        itemData += "<td class = 'requestNotesData'><input type= 'text' name='requestNotes' id='requestNotes[" + itemDataContainer.itemSku + "]' class='form-control form-control-sm'></td>";
                        itemData += "</tr>";
                        $("#requestItemTable>tbody").append(itemData);
                    },
                    error: function (response) {
                        alert(response.errorMessage);
                    }
                });
            });
            $(document).on("click", '#modalSaveChanges', function (e) {
                e.stopPropagation();
                
                let assignments = [];

                check.forEach(element => {
                    requestedQuantity = $(".requestQuantityData>input").val();
                    requestedNote = $(".requestNotesData>input").val();
                     let assignmentData = {
                        "employeeId": "EMP-55", //Change to logged in user
                        "itemSku": element,
                        "status": "PENDING",
                        "quantity": requestedQuantity,
                        "note": requestedNote
                    }
                    assignments.push(assignmentData);
                });
                let data = {
                    "username": "davidwk",  //Change to logged in user
                    "value": assignments
                }
                $.ajax({
                    type: "POST",
                    data: JSON.stringify(data),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: "http://localhost:8080/assignment",
                    success: function(response){
                        alert("Request Completed");
                        window.location.reload();
                    },
                    error: function(response){
                        console.log(response);
                    }
                })
            })
        })
    }
}