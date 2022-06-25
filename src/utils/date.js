import moment from 'moment';
import 'moment/locale/tr'

export default (timestamp) => {
    var date=new Date(timestamp);
    moment.locale('tr');
    const formattedDate=moment(date).fromNow(); 
    return formattedDate;
};