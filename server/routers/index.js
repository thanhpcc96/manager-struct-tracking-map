import clientRoute from './client.router';

export default app=>{
    app.use('/api/v1/client',clientRoute);
}