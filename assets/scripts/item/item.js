$(document).ready(function(){
      $(".navbar-part").load("../../components/navbar.html",function(){
            $(".sidebar-part").load("../../components/sidebar.html", function(){
                  $(".page-header").load("../../components/page-header.html", function(){
                        load();
                        $("#itemLink").css("background-color", "#00D6FF");
                        $("#btnAdd").click(add);
                        $("#btnEdit").click(edit);
                        //NOTWORKING
                        $("#btnDelete").click(remove);
                        // $("#itemNameSearch").keyup(searchByName);
                        // $("#skuSearch").keyup(searchBySku);
                        $(".search-id").hide();
                        $(".search-employee-name").hide();
                  })
            });
      });
});

// //Finished
// function searchBySku(){
//       $("#skuResult").html('');
//       var searchField = $("#skuSearch").val();
//       var exp = new RegExp(searchField, "i");
//       $.ajax({
//             type: "GET",
//             url: "http://localhost:8080/item",
//             success: function(response){
//                   $.each(response.value, function(key, val){
//                         if(val.itemSku.search(exp) != -1){
//                               $("#skuResult").append("<li class = list-group-item data-toggle = modal data-target = #modalDetail data-sku = "+val.itemSku+">" + val.itemSku + " <span> | </span>"+ val.name+ "</li>");
//                         }
//                   });
//             },
//             error: function(response){
//                   console.log(response);
//             }
//       });
//       $("body").click(function(){
//             $("#skuResult").html('');
//       })
// }
// //Finished
// function searchByName(){
//       $("#itemNameResult").html('');
//       var searchField = $("#itemNameSearch").val();
//       var exp = new RegExp(searchField, "i");
//       $.ajax({
//             type: "GET",
//             url: "http://localhost:8080/item/",
//             success: function(response){
//                   $.each(response.value, function(key, val){
//                         if(val.name.search(exp) != -1){
//                               $("#itemNameResult").append("<li class = list-group-item data-toggle = modal data-target = #modalDetail data-sku = "+val.itemSku+">" + val.itemSku + " <span> | </span>"+ val.name+ "</li>");
//                         }
//                   });
//             },
//             error: function(response){
//                   console.log(response);
//             }
//       });
//       $("body").click(function(){
//             $("#itemNameResult").html('');
//       })
// }