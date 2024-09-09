const swaggerConfig = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'DoctorCel API',
        version: '1.0.0',
        description: 'API documentation for DoctorCel project',
      },
      servers: [
        {
          url: 'http://localhost:3000/api',
          description: 'Development server',
        },
      ],
    },
    apis: ['./pages/api/**/*.ts'], // Rutas a los archivos que contienen tus endpoints
  };
  
  module.exports = swaggerConfig;