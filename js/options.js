$("#color_picker_switch").on("click", function (){
    check_stat = document.querySelector('#color_picker_switch').checked;

    browser.storage.local.set({
        "color_picker_save": check_stat
    });
})