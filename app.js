import express from 'express';
import dwitterRouter from './router/dwitter.js';

const app = express();
app.use('/dwitter', dwitterRouter);

app.listen(8000, function () {
  console.log("server start~!!")
});


