import kue from 'kue';
import config from '../../config/config';

const jobs = kue.createQueue({
    redis: config.REDIS_URI
});
export function _phanCongviec(){ 
    jobs.process();
}