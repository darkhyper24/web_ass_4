require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');
const authRoutes = require('./routes/routes');
const taskRoutes = require('./routes/task_routes');

const app = express();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();