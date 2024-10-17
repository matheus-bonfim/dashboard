export function get_date(days, last_date){
    let dates_list = [];
    //dates_list[days-1] = last_date;
    
    

    for (let i=days-1; i>=0; i--){
    
        dates_list[i] = new Date(last_date);
        dates_list[i].setDate(dates_list[i].getDate() - (days-1 - i));
        console.log(dates_list[i].getDate());
    }
    return dates_list;
}



/*   let last_year = '';
    let last_day = '';
    let last_month = '';
    for(let i=0;i<4;i++){
        last_year = last_year + last_date[i];
    }
    for(let i=8;i<10;i++){
        last_day = last_day + last_day[i];
    }
    for(let i=5;i<7;i++){
        last_month = last_month + last_month[i];
    }*/