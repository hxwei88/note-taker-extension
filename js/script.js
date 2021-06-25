var latest_focus_cat = "";
var id_count = 0;
var sub_id_count = [];

var cat_id = [];
var note_id = [];

function init() {
    var html = "";
    notes_json = browser.storage.local.get(["category", "count"]);
    console.log(notes_json)
    notes_json.then(function (data) {
        console.log(data);
        if(data.category != null)
        {
            if(data.category.length > 0)
            {
                id_count = data.category.length;
                for(var i = 0; i < data.category.length; i++)
                {
                    html += '<div class="card" id="cat_' + i + '">' +
                                '<div class="card-body" style="background-color: #f5f5f5;">' +
                                '<div class="row d-flex">' +
                                    '<div id="delete_' + i + '" class="col-2 align-self-center pt-3 pb-3">' +
                                        '<div>' +
                                            '<a href="#"><i class="fa fa-minus" aria-hidden="true" style="font-size:20px; color:black;"></i></a>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="col-8 me-auto align-self-center">' +
                                    '<div>' +
                                        '<input type="text" value="' + data.category[i].category + '" class="font-weight-bold" readonly id="category_title_' + i + '" style="cursor:default; width:100%; background: transparent; border: 0 none; outline: none; color:black; font-size:24px; resize: none; overflow:auto;">' +
                                    '</div>' +
                                    '</div>' +
                                    '<div id="dropdown_' + i + '" class="col-2 align-self-center pt-3 pb-3" data-bs-toggle="collapse" href="#card_content_' + i + '" role="button" aria-expanded="false" aria-controls="card_content_' + i + '">' +
                                    '<div>' +
                                        '<a href="#"><i id="down_icon_' + i + '" class="fa fa-angle-right" aria-hidden="true" style="font-size:24px; color:black;"></i></a>' +
                                    '</div>' +
                                    '</div>' +
                                '</div>' +
                                '</div>' +
                            '</div>';

                    console.log("cat running")
                    
                    html += '<div id="card_content_' + i + '" class="collapse">';
                           
                    sub_id_count.push({"cat_id": i, "sub_id_count": data.category[i].notes.length});
                    cat_id.push(i);

                    var temparray = [];

                    for(var j=0; j < data.category[i].notes.length; j++) {
                        html += '<div class="d-flex justify-content-center mt-2" id="note_' + i + '_' + j + '">' +
                                    '<div class="row card text-white bg-' + data.category[i].notes[j].color + ' mb-2" style="max-width: 17rem;">' +
                                    '<div class="card-header d-flex justify-content-end">' +
                                        '<div class="align-self-center">';

                                    if(data.category[i].notes[j].color=="light")
                                        html += '<a href="#" id="notes_del_btn_' + i + '_' + j + '"><i class="fa fa-minus" aria-hidden="true" style="font-size:12px; color:black;"></i></a>';
                                    else
                                        html += '<a href="#" id="notes_del_btn_' + i + '_' + j + '"><i class="fa fa-minus" aria-hidden="true" style="font-size:12px; color:white;"></i></a>';
                                        
                        html +=          '</div>' +
                                    '</div>' +
                                    '<div class="card-body">';

                                    if(data.category[i].notes[j].color=="light")
                                    {
                                        html += '<input value="' + data.category[i].notes[j].title + '" type="text" class="font-weight-bold" id="note_title_' + i + '_' + j + '" style="width:100%; background: transparent; border: 0 none; outline: none; color:black; font-size:24px; resize: none; overflow:auto;">' +
                                                '<textarea id="note_desc_' + i + '_' + j + '" style="width:250px; background: transparent; border: 0 none; outline: none; color:black; height: 200px; resize: none; overflow:auto;">' + data.category[i].notes[j].desc + '</textarea>';
                                    }
                                    else
                                    {
                                        html += '<input value="' + data.category[i].notes[j].title + '" type="text" class="font-weight-bold" id="note_title_' + i + '_' + j + '" style="width:100%; background: transparent; border: 0 none; outline: none; color:white; font-size:24px; resize: none; overflow:auto;">' +
                                                '<textarea id="note_desc_' + i + '_' + j + '" style="width:250px; background: transparent; border: 0 none; outline: none; color:white; height: 200px; resize: none; overflow:auto;">' + data.category[i].notes[j].desc + '</textarea>';
                                    }
                                    
                        html +=         '</div>' +
                                    '</div>' +
                                '</div>';

                        temparray.push(j)
                    }

                    note_id.push({"cat_id": i, "note_id": temparray});

                    html += '</div>';
                }
            } 
        } 
        else {
            var category = [];
            browser.storage.local.set({category, "count": 1})
            console.log("no data")
        }

        $("#category_div").append(html);

        browser.storage.local.get("color_picker_save").then(function (data) {
            var color_picker;

            if(data.color_picker_save == null)
            {   
                browser.storage.local.set({
                    "color_picker_save": true
                });

                color_picker = "primary";
                $("#color_picker_btn").removeClass().addClass("btn btn-" + color_picker);
                $("#color_picker_btn").val(color_picker);
            }
            else
            {
                if(data.color_picker_save)
                {
                    browser.storage.local.get("color_picker").then(function (cp_data) {
                        if(cp_data != null)
                        {
                            if(cp_data.color_picker.length > 0)
                            {
                                console.log("color picker: " + cp_data.color_picker)
                                color_picker = cp_data.color_picker;
                            }
                            else {
                                color_picker = "primary";
                            }
                        }
                        else {
                            color_picker = "primary";
                        }

                        $("#color_picker_btn").removeClass().addClass("btn btn-" + color_picker);
                        $("#color_picker_btn").val(color_picker);
                    })
                }
                else {
                    color_picker = "primary";
                    $("#color_picker_btn").removeClass().addClass("btn btn-" + color_picker);
                    $("#color_picker_btn").val(color_picker);
                }
            }
        })

        if(data.category != null)
        {
            for(var j = 0; j < data.category.length; j++)
            {
                console.log(j)
                $('#category_title_' + j).on('dblclick', function() {
                    $(this).attr("readonly", false);
                    $(this).css("cursor", "text")
                });
                
                $('#category_title_' + j).on('focusout', function() {
                    var num = parseInt(this.id.slice(-1));

                    var element = this;

                    browser.storage.local.get("category").then(function (data) {
                        console.log("data: \n" + cat_id.indexOf(num));
                        
                        data.category[cat_id.indexOf(num)].category = $(element).val();
                        console.log("changed title: " + data.category[cat_id.indexOf(num)].category)

                        console.log("data: \n" + data.category);
                        browser.storage.local.set({category: data.category})
                    })

                    $(this).attr("readonly", true);
                    $(this).css("cursor", "default")
                });

                $('#delete_' + j).on('click', function() {
                    console.log(this.id.slice(-1))

                    $("#cat_" + this.id.slice(-1)).remove();
                    $("#card_content_" + this.id.slice(-1)).remove()

                    console.log(cat_id.indexOf(parseInt(this.id.slice(-1))))

                    var num = parseInt(this.id.slice(-1));

                    browser.storage.local.get("category").then(function (data) {
                        console.log("data: \n" + cat_id.indexOf(num));
                        
                        data.category.splice(cat_id.indexOf(num), 1);
                        cat_id.splice(cat_id.indexOf(num), 1)
                        note_id.splice(cat_id.indexOf(num), 1);

                        console.log("data: \n" + data.category);
                        browser.storage.local.set({category: data.category})
                    })
                });

                $("#card_content_" + j).on('show.bs.collapse', function () {
                    $("#down_icon_" + this.id.slice(-1)).removeClass().addClass("fas fa-angle-down")
                });
                 
                $("#card_content_" + j).on('hide.bs.collapse', function () {
                    $("#down_icon_" + this.id.slice(-1)).removeClass().addClass("fas fa-angle-right")
                });

                $("#cat_" + j).on("click", function () {
                    latest_focus_cat = this.id;
                    console.log(latest_focus_cat)
                    //can insert highlight for better nav
                })

                console.log(sub_id_count[j].sub_id_count + " sub id");

                for(var z = 0; z < sub_id_count[j].sub_id_count; z++)
                {
                    $('#notes_del_btn_' + j + "_" + z).on('click', function() {
                        console.log(this.id.slice(-3))

                        var num = this.id.slice(-3);
                        var temp_cat_id = num.charAt(0);
                        var temp_note_id = num.charAt(2);

                        for(var y = 0; y < note_id.length; y++)
                        {
                            if(note_id[y].cat_id == temp_cat_id)
                            {
                                temp_cat_id = y;
                            }
                        }

                        temp_note_id = note_id[temp_cat_id].note_id.indexOf(parseInt(temp_note_id));

                        browser.storage.local.get("category").then(function (data) {
                            console.log("data: \n" + cat_id.indexOf(num));
                            
                            data.category[temp_cat_id].notes.splice(cat_id.indexOf(temp_note_id), 1);

                            note_id[temp_cat_id].note_id.splice(temp_note_id, 1);
                
                            console.log("data: \n" + data.category);
                            browser.storage.local.set({category: data.category})
                        })

                        $("#note_" + num).remove();
                        console.log("del running")
                    });

                    $('#note_title_' + j + "_" + z).on('focusout', function() {
                        var num = this.id.slice(-3);
                        var temp_cat_id = num.charAt(0);
                        var temp_note_id = num.charAt(2);

                        for(var y = 0; y < note_id.length; y++)
                        {
                            if(note_id[y].cat_id == temp_cat_id)
                            {
                                temp_cat_id = y;
                            }
                        }

                        temp_note_id = note_id[temp_cat_id].note_id.indexOf(parseInt(temp_note_id));

                        var element = this;

                        browser.storage.local.get("category").then(function (data) {
                            console.log("data: \n" + cat_id.indexOf(num));

                            data.category[temp_cat_id].notes[temp_note_id].title = $(element).val();
                
                            console.log("data: \n" + JSON.stringify(data.category[temp_cat_id]));
                            console.log("ran note title change");
                            browser.storage.local.set({category: data.category})
                        })
                    })

                    $('#note_desc_' + j + "_" + z).on('focusout', function() {
                        var num = this.id.slice(-3);
                        var temp_cat_id = num.charAt(0);
                        var temp_note_id = num.charAt(2);

                        for(var y = 0; y < note_id.length; y++)
                        {
                            if(note_id[y].cat_id == temp_cat_id)
                            {
                                temp_cat_id = y;
                            }
                        }

                        temp_note_id = note_id[temp_cat_id].note_id.indexOf(parseInt(temp_note_id));

                        var element = this;

                        browser.storage.local.get("category").then(function (data) {
                            console.log("data: \n" + cat_id.indexOf(num));

                            data.category[temp_cat_id].notes[temp_note_id].desc = $(element).val();
                
                            console.log("data: \n" + JSON.stringify(data.category[temp_cat_id]));
                            console.log("ran note title change");
                            browser.storage.local.set({category: data.category})
                        })
                    })
                }
            }
        }
    });
}

init()

// function cat_dblclick(element) {

// }

// function cat_focusout(element) {

// }

// function cat_delete(element) {

// }

// function cat_focus_record(element) {

// }

function add_card() {
    if(latest_focus_cat == "")
    {
        //alert("Select Category");
    }
    else {
        var html = '<div class="d-flex justify-content-center mt-2" id="note_' + latest_focus_cat.slice(-1) + '_' + sub_id_count[parseInt(latest_focus_cat.slice(-1))].sub_id_count + '">' +
                        '<div class="row card text-white bg-' + $("#color_picker_btn").val() + ' mb-2" style="max-width: 17rem;">' +
                        '<div class="card-header d-flex justify-content-end">' +
                            '<div class="align-self-center">';
                            
                            if($("#color_picker_btn").val()=="light")
                                html += '<a href="#" id="notes_del_btn_' + latest_focus_cat.slice(-1) + '_' + sub_id_count[parseInt(latest_focus_cat.slice(-1))].sub_id_count + '"><i class="fa fa-minus" aria-hidden="true" style="font-size:12px; color:black;"></i></a>';
                            else
                                html += '<a href="#" id="notes_del_btn_' + latest_focus_cat.slice(-1) + '_' + sub_id_count[parseInt(latest_focus_cat.slice(-1))].sub_id_count + '"><i class="fa fa-minus" aria-hidden="true" style="font-size:12px; color:white;"></i></a>';
                            
        html +=             '</div>' +
                        '</div>' +
                        '<div class="card-body">';
                            
                        if($("#color_picker_btn").val()=="light")
                        {
                            html += '<input value="Title" type="text" class="font-weight-bold" id="note_title_' + latest_focus_cat.slice(-1) + '_' + sub_id_count[parseInt(latest_focus_cat.slice(-1))].sub_id_count + '" style="width:100%; background: transparent; border: 0 none; outline: none; color:black; font-size:24px; resize: none; overflow:auto;">' +
                                    '<textarea id="note_desc_' + latest_focus_cat.slice(-1) + '_' + sub_id_count[parseInt(latest_focus_cat.slice(-1))].sub_id_count + '" style="width:250px; background: transparent; border: 0 none; outline: none; color:black; height: 200px; resize: none; overflow:auto;">Description</textarea>';
                        }
                        else
                        {
                            html += '<input value="Title" type="text" class="font-weight-bold" id="note_title_' + latest_focus_cat.slice(-1) + '_' + sub_id_count[parseInt(latest_focus_cat.slice(-1))].sub_id_count + '" style="width:100%; background: transparent; border: 0 none; outline: none; color:white; font-size:24px; resize: none; overflow:auto;">' +
                                    '<textarea id="note_desc_' + latest_focus_cat.slice(-1) + '_' + sub_id_count[parseInt(latest_focus_cat.slice(-1))].sub_id_count + '" style="width:250px; background: transparent; border: 0 none; outline: none; color:white; height: 200px; resize: none; overflow:auto;">Description</textarea>';
                        }

        html +=             '</div>' +
                        '</div>' +
                    '</div>';

        $("#card_content_" + latest_focus_cat.slice(-1)).append(html);

        $('#notes_del_btn_' + latest_focus_cat.slice(-1) + "_" + sub_id_count[parseInt(latest_focus_cat.slice(-1))].sub_id_count).on('click', function() {
            console.log(this.id.slice(-3))

            var num = this.id.slice(-3);
            var temp_cat_id = num.charAt(0);
            var temp_note_id = num.charAt(2);

            for(var y = 0; y < note_id.length; y++)
            {
                if(note_id[y].cat_id == temp_cat_id)
                {
                    temp_cat_id = y;
                }
            }

            temp_note_id = note_id[temp_cat_id].note_id.indexOf(parseInt(temp_note_id));

            browser.storage.local.get("category").then(function (data) {
                console.log("data: \n" + cat_id.indexOf(num));
                
                data.category[temp_cat_id].notes.splice(cat_id.indexOf(temp_note_id), 1);

                note_id[temp_cat_id].note_id.splice(temp_note_id, 1);
    
                console.log("data: \n" + data.category);
                browser.storage.local.set({category: data.category})
            })

            $("#note_" + num).remove();
            console.log("del running")
        });

        $('#note_title_' + latest_focus_cat.slice(-1) + "_" + sub_id_count[parseInt(latest_focus_cat.slice(-1))].sub_id_count).on('focusout', function() {
            var num = this.id.slice(-3);
            var temp_cat_id = num.charAt(0);
            var temp_note_id = num.charAt(2);

            for(var y = 0; y < note_id.length; y++)
            {
                if(note_id[y].cat_id == temp_cat_id)
                {
                    temp_cat_id = y;
                }
            }

            temp_note_id = note_id[temp_cat_id].note_id.indexOf(parseInt(temp_note_id));

            var element = this;

            browser.storage.local.get("category").then(function (data) {
                console.log("data: \n" + cat_id.indexOf(num));

                data.category[temp_cat_id].notes[temp_note_id].title = $(element).val();
    
                console.log("data: \n" + JSON.stringify(data.category[temp_cat_id]));
                console.log("ran note title change");
                browser.storage.local.set({category: data.category})
            })
        })

        $('#note_desc_' + latest_focus_cat.slice(-1) + "_" + sub_id_count[parseInt(latest_focus_cat.slice(-1))].sub_id_count).on('focusout', function() {
            var num = this.id.slice(-3);
            var temp_cat_id = num.charAt(0);
            var temp_note_id = num.charAt(2);

            for(var y = 0; y < note_id.length; y++)
            {
                if(note_id[y].cat_id == temp_cat_id)
                {
                    temp_cat_id = y;
                }
            }

            temp_note_id = note_id[temp_cat_id].note_id.indexOf(parseInt(temp_note_id));

            var element = this;

            browser.storage.local.get("category").then(function (data) {
                console.log("data: \n" + cat_id.indexOf(num));

                data.category[temp_cat_id].notes[temp_note_id].desc = $(element).val();
    
                console.log("data: \n" + JSON.stringify(data.category[temp_cat_id]));
                console.log("ran note title change");
                browser.storage.local.set({category: data.category})
            })
        })

        //note_id.push({"cat_id": latest_focus_cat.slice(-1), "note_id": sub_id_count[parseInt(latest_focus_cat.slice(-1))].sub_id_count});

        for(var i = 0; i < note_id.length; i++)
        {
            if(note_id[i].cat_id == parseInt(latest_focus_cat.slice(-1)))
            {
                note_id[i].note_id.push(sub_id_count[parseInt(latest_focus_cat.slice(-1))].sub_id_count);
            }
        }

        var num = parseInt(latest_focus_cat.slice(-1));

        var new_note = {
            "title": "Title",
            "desc": "Description",
            "color": $("#color_picker_btn").val()
        }

        browser.storage.local.get("category").then(function (data) {
            console.log("data to add node: \n" + cat_id.indexOf(num));
            
            console.log(data.category[cat_id.indexOf(num)]);
            data.category[cat_id.indexOf(num)].notes.push(new_note);

            console.log("data to add node:: \n" + data.category);
            browser.storage.local.set({category: data.category})
        })

        sub_id_count[parseInt(latest_focus_cat.slice(-1))].sub_id_count++;
        console.log(latest_focus_cat);
        console.log(sub_id_count[parseInt(latest_focus_cat.slice(-1))].sub_id_count + " number of note");
    }
}

function category_add_card() {
    html = '<div class="card" id="cat_' + id_count + '">' +
                '<div class="card-body" style="background-color: #f5f5f5;">' +
                '<div class="row d-flex">' +
                    '<div id="delete_' + id_count + '" class="col-2 align-self-center pt-3 pb-3">' +
                        '<div>' +
                            '<a href="#"><i class="fa fa-minus" aria-hidden="true" style="font-size:20px; color:black;"></i></a>' +
                        '</div>' +
                    '</div>' +
                    '<div class="col-8 me-auto align-self-center">' +
                    '<div>' +
                        '<input type="text" value="Title" class="font-weight-bold" readonly id="category_title_' + id_count + '" style="cursor:default; width:100%; background: transparent; border: 0 none; outline: none; color:black; font-size:24px; resize: none; overflow:auto;">' +
                    '</div>' +
                    '</div>' +
                    '<div id="dropdown_' + id_count + '" class="col-2 align-self-center pt-3 pb-3" data-bs-toggle="collapse" href="#card_content_' + id_count + '" role="button" aria-expanded="false" aria-controls="card_content_' + id_count + '">' +
                    '<div>' +
                        '<a href="#"><i id="down_icon_' + id_count + '" class="fa fa-angle-right" aria-hidden="true" style="font-size:24px; color:black;"></i></a>' +
                    '</div>' +
                    '</div>' +
                '</div>' +
                '</div>' +
            '</div>';

    html += '<div id="card_content_' + id_count + '" class="collapse">';

    html += '<div class="d-flex justify-content-center mt-2" id="note_' + id_count + '_0">' +
                '<div class="row card text-white bg-' + $("#color_picker_btn").val() + ' mb-2" style="max-width: 17rem;">' +
                '<div class="card-header d-flex justify-content-end">' +
                    '<div class="align-self-center">';
                    
                    if($("#color_picker_btn").val()=="light")
                        html += '<a href="#" id="notes_del_btn_' + id_count + '_0"><i class="fa fa-minus" aria-hidden="true" style="font-size:12px; color:black;"></i></a>';
                    else
                        html += '<a href="#" id="notes_del_btn_' + id_count + '_0"><i class="fa fa-minus" aria-hidden="true" style="font-size:12px; color:white;"></i></a>';
                    
    html +=         '</div>' +
                '</div>' +
                '<div class="card-body">';

                if($("#color_picker_btn").val()=="light")
                {
                    html += '<input value="Title" type="text" class="font-weight-bold" id="note_title_' + id_count + '_0" style="width:100%; background: transparent; border: 0 none; outline: none; color:black; font-size:24px; resize: none; overflow:auto;">' +
                            '<textarea id="note_desc_' + id_count + '_0" style="width:250px; background: transparent; border: 0 none; outline: none; color:black; height: 200px; resize: none; overflow:auto;">Description</textarea>';
                }
                else
                {
                    html += '<input value="Title" type="text" class="font-weight-bold" id="note_title_' + id_count + '_0" style="width:100%; background: transparent; border: 0 none; outline: none; color:white; font-size:24px; resize: none; overflow:auto;">' +
                            '<textarea id="note_desc_' + id_count + '_0" style="width:250px; background: transparent; border: 0 none; outline: none; color:white; height: 200px; resize: none; overflow:auto;">Description</textarea>';
                }

    html +=         '</div>' +
                '</div>' +
            '</div>';

    html += '</div>';
            
    $("#category_div").append(html);

    $('#category_title_' + id_count).on('dblclick', function() {
        $(this).attr("readonly", false);
        $(this).css("cursor", "text")
    });

    $('#category_title_' + id_count).on('focusout', function() { 
        var num = parseInt(this.id.slice(-1));

        var element = this;

        browser.storage.local.get("category").then(function (data) {
            console.log("data: \n" + cat_id.indexOf(num));
            
            data.category[cat_id.indexOf(num)].category = $(element).val();
            console.log("changed title: " + data.category[cat_id.indexOf(num)].category)

            console.log("data: \n" + data.category);
            browser.storage.local.set({category: data.category})
        })

        $(this).attr("readonly", true);
        $(this).css("cursor", "default")
    });

    $('#delete_' + id_count).on('click', function() {
        console.log(this.id.slice(-1))

        $("#cat_" + this.id.slice(-1)).remove();
        $("#card_content_" + this.id.slice(-1)).remove()

        console.log(cat_id.indexOf(parseInt(this.id.slice(-1))))

        var num = parseInt(this.id.slice(-1));

        browser.storage.local.get("category").then(function (data) {
            console.log("data: \n" + cat_id.indexOf(num));
            
            data.category.splice(cat_id.indexOf(num), 1);
            cat_id.splice(cat_id.indexOf(num), 1)
            note_id.splice(cat_id.indexOf(num), 1);

            console.log("data: \n" + data.category);
            browser.storage.local.set({category: data.category})
        })
    });

    $("#card_content_" + id_count).on('show.bs.collapse', function () {
        $("#down_icon_" + this.id.slice(-1)).removeClass().addClass("fas fa-angle-down")
    });
     
    $("#card_content_" + id_count).on('hide.bs.collapse', function () {
        $("#down_icon_" + this.id.slice(-1)).removeClass().addClass("fas fa-angle-right")
    });

    $("#cat_" + id_count).on("click", function () {
        latest_focus_cat = this.id;
        console.log(latest_focus_cat)
        //can insert highlight for better nav
    })

    $('#notes_del_btn_' + id_count + '_0').on('click', function() {
        console.log(this.id.slice(-3))

        var num = this.id.slice(-3);
        var temp_cat_id = num.charAt(0);
        var temp_note_id = num.charAt(2);

        for(var y = 0; y < note_id.length; y++)
        {
            if(note_id[y].cat_id == temp_cat_id)
            {
                temp_cat_id = y;
            }
        }

        temp_note_id = note_id[temp_cat_id].note_id.indexOf(parseInt(temp_note_id));

        browser.storage.local.get("category").then(function (data) {
            console.log("data: \n" + cat_id.indexOf(num));
            
            data.category[temp_cat_id].notes.splice(cat_id.indexOf(temp_note_id), 1);

            note_id[temp_cat_id].note_id.splice(temp_note_id, 1);

            console.log("data: \n" + data.category);
            browser.storage.local.set({category: data.category})
        })

        $("#note_" + num).remove();
        console.log("del running")
    });

    $('#note_title_' + id_count + '_0').on('focusout', function() {
        var num = this.id.slice(-3);
        var temp_cat_id = num.charAt(0);
        var temp_note_id = num.charAt(2);

        for(var y = 0; y < note_id.length; y++)
        {
            if(note_id[y].cat_id == temp_cat_id)
            {
                temp_cat_id = y;
            }
        }

        temp_note_id = note_id[temp_cat_id].note_id.indexOf(parseInt(temp_note_id));

        var element = this;

        browser.storage.local.get("category").then(function (data) {
            console.log("data: \n" + cat_id.indexOf(num));

            data.category[temp_cat_id].notes[temp_note_id].title = $(element).val();

            console.log("data: \n" + JSON.stringify(data.category[temp_cat_id]));
            console.log("ran note title change");
            browser.storage.local.set({category: data.category})
        })
    })

    $('#note_desc_' + id_count + '_0').on('focusout', function() {
        var num = this.id.slice(-3);
        var temp_cat_id = num.charAt(0);
        var temp_note_id = num.charAt(2);

        for(var y = 0; y < note_id.length; y++)
        {
            if(note_id[y].cat_id == temp_cat_id)
            {
                temp_cat_id = y;
            }
        }

        temp_note_id = note_id[temp_cat_id].note_id.indexOf(parseInt(temp_note_id));

        var element = this;

        browser.storage.local.get("category").then(function (data) {
            console.log("data: \n" + cat_id.indexOf(num));

            data.category[temp_cat_id].notes[temp_note_id].desc = $(element).val();

            console.log("data: \n" + JSON.stringify(data.category[temp_cat_id]));
            console.log("ran note title change");
            browser.storage.local.set({category: data.category})
        })
    })

    // browser.storage.local.get("count").then(function (data) {
    //     browser.storage.local.set({count: data.count + 1});
    // })

    var new_cat = {
        "category": "Title",
        "notes": [
            {
                "title": "Title",
                "desc": "Description",
                "color": $("#color_picker_btn").val()
            }
        ],
        "count": 1
    }

    browser.storage.local.get("category").then(function (data) {
        data.category.push(new_cat);
        console.log("data: \n" + data.category);
        browser.storage.local.set({category: data.category})
    })

    sub_id_count.push({"cat_id": id_count, "sub_id_count": 1});
    cat_id.push(id_count);
    note_id.push({"cat_id": id_count, "note_id": [0]});

    id_count++;
}


console.log("running")

document.getElementById('note_add_btn').addEventListener('click', add_card);
document.getElementById('category_add_button').addEventListener('click', category_add_card);
document.getElementById('settings').addEventListener('click', function () {
    browser.runtime.openOptionsPage();
});

$("#color_picker li a").on('click', function(){
    $("#color_picker_btn").removeClass().addClass("btn btn-" + $(this).data("value"));
    console.log($(this).data("value"));
    $("#color_picker").removeClass("show");
    $("#color_picker_btn").val($(this).data("value"));

    browser.storage.local.set({
        "color_picker": $("#color_picker_btn").val()
    });
    console.log($("#color_picker_btn").val());
 });






//  var category = [
//     {
//         "category": "test1",
//         "notes": [
//             {
//                 "title": "lmao",
//                 "desc": "xd",
//                 "color": "info"  
//             },
//             {
//                 "title": "wat",
//                 "desc": "lul",
//                 "color": "dark"  
//             }
//         ],
//         "count": 2
//     },
//     {
//         "category": "test2",
//         "notes": [
//             {
//                 "title": "yes",
//                 "desc": "yes",
//                 "color": "primary"   
//             },
//             {
//                 "title": "no",
//                 "desc": "no",
//                 "color": "success"  
//             }
//         ],
//         "count": 2
//     }
// ];

// var count = 2

// browser.storage.local.set({category, count});



// var id_count = 2;

// browser.storage.local.set({id_count});