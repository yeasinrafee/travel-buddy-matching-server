import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello from travel buddy batching server!');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
