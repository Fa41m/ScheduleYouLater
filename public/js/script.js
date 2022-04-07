document.addEventListener("DOMContentLoaded", () => {
    var today = new Date();
    var dd = String(today.getDate());
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var day = today.getDay();
    console.log(dd+mm+yyyy);
    console.log(day);
    let row_cal = 1;
    while (row_cal < 4) {
        col_cal = 1
        if (row_cal == 1) {
            if (day > 0) {
                col_cal = col_cal + day;
            }
        }
        while (col_cal != 8) {
            console.log(row_cal +'/'+ col_cal);
            document.getElementById('r'+row_cal+'c'+col_cal).innerHTML = dd+"/"+mm;
            
            dd++
            if ((mm == 01)||(mm == 03)||(mm == 05)||(mm == 07)||(mm == 08)||(mm == 10)||(mm == 12)) {
                if (dd == 32) {
                    mm = mm + 1
                    dd = 1
                }
                if (mm == 13) {
                    yyyy = yyyy + 1
                    mm = 1
                }
            } else if ((mm == 04)||(mm == 06)||(mm == 09)||(mm == 11)) {
                if (dd == 31) {
                    mm = mm + 1
                    dd = 1
                }
            } else if (mm == 02) {
                if (dd == 30) {
                    mm = mm + 1
                    dd = 1
                }
            }
            col_cal++
        }
        row_cal++ 
    }

})