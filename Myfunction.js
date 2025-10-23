$(document).ready(function () {
    $('.toggle-details').change(function () {

        $(this).closest('tr').next('.app-details').slideToggle(400);
    });


    $('#addAppForm').submit(function (e) {
        e.preventDefault();

        var ok = true;
        $('.error-message').hide();
        var appName = $('#appName').val().trim();
        var nameReg = /^[a-zA-Z]+$/;
        if (appName.length === 0 || !nameReg.test(appName)) {
            $('#appNameError').show().text("يرجى كتابة اسم التطبيق بحروف انجليزية فقط.");
            ok = false;
        }

        var appMaker = $('#appMaker').val().trim();
        var makerReg = /^[a-zA-Z0-9]+$/;
        if (appMaker.length === 0 || !makerReg.test(appMaker)) {
            $('#appMakerError').show().text("يرجى كتابة اسم الشركة بحروف وأرقام فقط.");
            ok = false;
        }


        var appURL = $('#appURL').val().trim();
        if (appURL.length === 0 || !(appURL.startsWith('http://') || appURL.startsWith('https://'))) {
            $('#appURLError').show().text("الرجاء إدخال رابط صحيح يبدأ بـ http أو https.");
            ok = false;
        }


        var appField = $('#appField').val();
        if (appField === "") {
            $('#appFieldError').show().text("الرجاء اختيار مجال الاستخدام.");
            ok = false;
        }


        if (ok) {
            var newApp = {
                name: appName,
                maker: appMaker,
                url: appURL,
                field: appField,
                free: $('#appFree').is(':checked') ? 'نعم' : 'لا'
            };


            var oldApps = JSON.parse(localStorage.getItem('userApps')) || [];
            oldApps.push(newApp);

            // نخزنها من جديد
            localStorage.setItem('userApps', JSON.stringify(oldApps));

            alert("✅ تم إضافة التطبيق بنجاح!");
            window.location.href = "Apps.html";
        }
    });

    if (window.location.pathname.includes('Apps.html')) {
        var userApps = JSON.parse(localStorage.getItem('userApps'));
        var tbody = $('#appsTableBody');

        if (userApps && userApps.length > 0) {
            $.each(userApps, function (i, app) {
                var row = "<tr>" +
                    "<td>" + app.name + " (مضاف)" + "</td>" +
                    "<td>" + app.maker + "</td>" +
                    "<td>" + app.field + "</td>" +
                    "<td>" + app.free + "</td>" +
                    "<td><input type='checkbox' disabled></td>" +
                    "</tr>";
                tbody.append(row);
            });
        }
    }

});