function showAlert(type, msgTxt, locationUrl, formId = 'form', formArray) {
    //console.log(type);
    //console.log(msgTxt);
    // return program exception error
    if (type == "" || msgTxt == "") {
        alert('PROGRAM_EX: Try again later');
        return false;
    } else {
        // show sweetalert message
        if (type == 1 || type == -1) {
            swal({
                title: (type == '1') ? 'Great!' : 'OOPS!',
                text: msgTxt,
                type: (type == '1') ? 'success' : 'error',
                confirmButtonText: 'OK'
            }, function (isConfirm) {
                // redirect only if valid locationUrl is passed
                if (locationUrl != "") {
                    if (isConfirm) {
                        window.location.href = locationUrl;
                    }
                }
            });
        }
        // show form wise single validation message
        else if (type == "00") {
            $("#" + formId + "-error").show();
            $("#" + formId + "-error").text(msgTxt);

            // remove error from fields that have passed validation
            if (formArray.length > 0) {
                $.each(formArray, function (inputKey, formInput) {
                    $("#" + formInput + "-error").text('');
                });
            }
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        }
        // show field wise validation message
        else if (type == "0") {
            // display form error message
            var formMsg = $.parseHTML("<i class='icon-alert-circled'></i> Please enter mandatory fields as highlighted in red color below");
            $("#" + formId + "-error").html(formMsg);
            $("#" + formId + "-error").show();

            var msgArray = msgTxt.split("~");
            $.each(msgArray, function (intKey, inputData) {
                var objInput = inputData.split("::");
                $("#" + objInput[0] + "-error").text(objInput[1]);

                // splice error field from main formArray
                if (formArray.length > 0) {
                    formArray.splice($.inArray(objInput[0], formArray), 1);
                }
            });

            //console.log(formArray);

            // remove error from fields that have passed validation
            if (formArray.length > 0) {
                $.each(formArray, function (inputKey, formInput) {
                    $("#" + formInput + "-error").text('');
                });
            }
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        } else if (type == "11") {
            return false;
        } else {
            alert('PROGRAM_EX: Try again later');
            return false;
        }
    }
}

function isProperAlNum(variable_3) {
    if (!variable_3) {
        return false;
    }
    if (variable_3["search"](/^.*(?=.{8,})(?=.*[!@$%^&()]).*$/) != -1) {
        return true;
    } else {
        return false;
    }
}

// password validation (min 8 length, alphabet, number and special character each) 
function checkPassword(password) {
    //var regExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    // var regExp = /^(?!.*([a-zA-Z0-9!@#$%&*])\1{2})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&*])[A-Za-z0-9!@#$%&*]{8,16}$/;
    var regExp = /^(?!.*([a-zA-Z0-9!@#$%&*])\1{2})(?!.*(?:012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz))(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&*])[A-Za-z0-9!@#$%&*]{8,16}$/;


    if (password.match(regExp))
        return true;
    else
        return false;

}