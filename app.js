var ip = document.querySelector("#ip");
var btn = document.querySelector("#btn");
var op = document.querySelector("#op");
const dateinmonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function check() {
    op.style.display = "none"; document.querySelector(".loader").style.display = "block";
    btn.style.display = "none";
    if (ip.value == "") op.innerText = "Please select your birthdate";
    else {
        var datevalue = ip.value.split("-");
        var year = datevalue[0];
        var month = datevalue[1];
        var day = datevalue[2];
        var palindrome = dateformat(year, month, day);
        setTimeout(() => {
            op.style.display = "block";
            btn.style.display = "inline"; document.querySelector(".loader").style.display = "none";
            if (palindrome) {
                op.innerText =
                    "Yes!!, your birthday " + palindrome + " is a Palindrome Birthday";
            } else {
                var [nextdate, diff] = nextpalindrome(year, month, day);
                op.innerText =
                    "No, your birthday isn't palindrome, but the nearest date is " +
                    nextdate +
                    ".You have missed by " +
                    diff.toString() +
                    " days";
            }
        }, 6000);
    }
}
function palindromecheck(birthdate) {
    var revdate = birthdate.split("").reverse("").join("");
    return revdate == birthdate;
}
function dateformat(year, month, day) {
    var yyyymmdd = year + month + day;
    var mmddyyyy = month + day + year;
    var ddmmyyyy = day + month + year;
    var year2digit = year.slice(-2);
    var yymmdd = year2digit + month + day;
    var mmddyy = month + day + year2digit;
    var ddmmyy = day + month + year2digit;

    if (palindromecheck(yyyymmdd)) {
        return year.toString() + "-" + month.toString() + "-" + day.toString();
    }
    if (palindromecheck(mmddyyyy)) {
        return month.toString() + "-" + day.toString() + "-" + year.toString();
    }
    if (palindromecheck(ddmmyyyy)) {
        return day.toString() + "-" + month.toString() + "-" + month.toString();
    }
    if (palindromecheck(yymmdd)) {
        return (
            year2digit.toString() + "-" + month.toString() + "-" + day.toString()
        );
    }
    if (palindromecheck(mmddyy)) {
        return (
            month.toString() + "-" + day.toString() + "-" + year2digit.toString()
        );
    }
    if (palindromecheck(ddmmyy)) {
        return (
            day.toString() + "-" + month.toString() + "-" + year2digit.toString()
        );
    } else {
        return null;
    }
}
function nextpalindrome(year, month, day) {
    var d1 = Number(day);
    var d2 = Number(day);
    var m1 = Number(month);
    var m2 = Number(month);
    var y1 = Number(year);
    var y2 = Number(year);
    for (var i = 1; i > 0; i++) {
        d1 = d1 + 1;
        if (d1 > Number(dateinmonth[m1 - 1])) {
            d1 = 1;
            m1 = m1 + 1;
            if (m1 > 12) {
                m1 = 1;
                y1 = y1 + 1;
            }
        }
        var y1string = y1.toString();
        var m1string = m1.toString();
        var d1string = d1.toString();
        if (d1string.length == 1) {
            d1string = "0" + d1string;
        }
        if (m1string.length == 1) {
            m1string = "0" + m1string;
        }
        var nextdate = dateformat(y1string, m1string, d1string);
        if (nextdate) {
            return [nextdate, i];
        }
        if (y2 > 1) {
            d2 = d2 - 1;
            if (d2 < 1) {
                m2 = m2 - 1;
                if (m2 < 1) {
                    m2 = 12;
                    y2 = y2 - 1;
                    if (y2 < 1) {
                        break;
                    }
                    d2 = dateinmonth[m2 - 1];
                }
            }
            var y2string = y2.toString();
            var m2string = m2.toString();
            var d2string = d2.toString();
            if (d2string.length == 1) {
                d2string = "0" + d2string;
            }
            if (m2string.length == 1) {
                m2string = "0" + m2string;
            }
            var nextdate = dateformat(y2string, m2string, d2string);
            if (nextdate) {
                return [nextdate, i];
            }
        }
    }
}
btn.addEventListener("click", check);
