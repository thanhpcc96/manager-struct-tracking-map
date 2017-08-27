const kue= require('kue');
// kue.redisClientFactory.createClient=()=>{
//     let client = Redis.createClient(6379, 'redis://localhost');
//     return client;
// }
const jobs= kue.createQueue({
    redis: 'redis://localhost:6379'
});
jobs.process("sendMail",(job, done)=>{
    console.log(`du lieu cong viec cua ban ${job.data}`);
    done();
})