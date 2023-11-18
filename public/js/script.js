function formatCnpj(i) {
    var num = i.value;
    if (isNaN(num[num.length-1])) {
        i.value = num.substring(0, num.length-1);
        return;
    }
    i.setAttribute("maxlength", 18);
    if (num.length == 2 || num.length == 6) i.value += '.';
    if (num.length == 10) i.value += "\/";
    if (num.length == 15) i.value += "-";
}

