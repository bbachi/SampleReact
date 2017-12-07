

export class DateUtil {

    public static getTimeStamp(): string {
        var date = new Date();
        return date.getMonth()+1+"/"+date.getDate()+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes();
    }

}
