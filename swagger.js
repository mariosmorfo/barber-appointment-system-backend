const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');
const Barber = require('./models/barber.model');
const Appointment = require('./models/appointment.model');

exports.options = {
  openapi: '3.1.0',

  info: {
    version: '1.0.0',
    title: 'Barber Booking API',
    description: 'CRUD for Users, Barbers and Appointments with JWT auth',
    contact: { email: 'support@example.com' }
  },

  servers: [
    { url: 'http://localhost:3000', description: 'Local server' }
  ],

  components: {
    schemas: {
      User: m2s(User),
      Barber: m2s(Barber),
      Appointment: m2s(Appointment),
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },

  security: [
    { bearerAuth: [] }
  ],

  tags: [
    { name: 'Auth', description: 'Login endpoint' },
    { name: 'Users', description: 'User CRUD operations' },
    { name: 'Barbers', description: 'Barber CRUD operations' },
    { name: 'Appointments', description: 'Booking and management' },
  ],

  paths: {
    // Authentication
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Log in and receive a JWT',
         requestBody: {
         required: true,
         content: {
           'application/json': {
            schema: {
                type: 'object',
                properties: {
                  username: { type: 'string', example: 'alice' },
                  password: { type: 'string', example: 'supersecret' }
                },
                required: ['username','password']
              }
            }
          }
        },
        responses: { '200': { description: 'JWT token returned' } }
      }
    },
    '/api/auth/barber-login': {
      post: {
        tags: ['Auth'],
        summary: 'Barber log in and receive a JWT',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: { type: 'string', example: 'evansharp' },
                  password: { type: 'string', example: 'cutandshave123' }
                },
                required: ['username','password']
              }
            }
          }
        },
        responses: { '200': { description: 'JWT token returned' } }
      }
    },

    // User endpoints
    '/api/user': {
      get: {
        tags: ['Users'],
        summary: 'Fetch all users',
        responses: { '200': { description: 'Array of User' } }
      }
    },
    '/api/user/create': {
      post: {
        tags: ['Users'],
        summary: 'Create a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' }
            }
          }
        },
        responses: { '200': { description: 'Created User' } }
      }
    },
    '/api/user/{username}': {
      get: {
        tags: ['Users'],
        summary: 'Get a user by username',
        parameters: [
          { name: 'username', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: { '200': { description: 'User object' } }
      }
    },
    '/api/user/update/{username}': {
      patch: {
        tags: ['Users'],
        summary: 'Update a user by username',
        parameters: [
          { name: 'username', in: 'path', required: true, schema: { type: 'string' } }
        ],
         requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' }
            }
          }
        },
        responses: { '200': { description: 'Updated User' } }
      }
    },
    '/api/user/delete/{username}': {
      delete: {
        tags: ['Users'],
        summary: 'Delete a user by username',
        parameters: [
          { name: 'username', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: { '200': { description: 'Deleted User' } }
      }
    },

    // Barber endpoints
    '/api/barber': {
      get: {
        tags: ['Barbers'],
        summary: 'Fetch all barbers',
        responses: { '200': { description: 'Array of Barber' } }
      }
    },
    '/api/barber/create': {
      post: {
        tags: ['Barbers'],
        summary: 'Create a new barber',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Barber' }
            }
          }
        },
        responses: { '200': { description: 'Created Barber' } }
      }
    },
    '/api/barber/{username}': {
      get: {
        tags: ['Barbers'],
        summary: 'Get a barber by username',
        parameters: [
          { name: 'username', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: { '200': { description: 'Barber object' } }
      }
    },
    '/api/barber/update/{username}': {
      patch: {
        tags: ['Barbers'],
        summary: 'Update a barber by username',
        parameters: [
          { name: 'username', in: 'path', required: true, schema: { type: 'string' } }
        ],
         requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Barber' }
            }
          }
        },
        responses: { '200': { description: 'Updated Barber' } }
      }
    },
    '/api/barber/delete/{username}': {
      delete: {
        tags: ['Barbers'],
        summary: 'Delete a barber by username',
        parameters: [
          { name: 'username', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: { '200': { description: 'Deleted Barber' } }
      }
    },

    // Appointment endpoints
    '/api/appointment': {
      get: {
        tags: ['Appointments'],
        summary: 'Fetch all appointments',
        responses: { '200': { description: 'Array of Appointment' } }
      }
    },
    '/api/appointment/create': {
      post: {
        tags: ['Appointments'],
        summary: 'Book a new appointment',
         requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Appointment' }
            }
          }
        },
        responses: { '200': { description: 'Created Appointment' } }
      }
    },
    '/api/appointment/cancel/{id}': {
      delete: {
        tags: ['Appointments'],
        summary: 'Cancel an appointment',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: { '200': { description: 'Canceled Appointment' } }
      }
    },
    '/api/appointment/status/{id}': {
      patch: {
        tags: ['Appointments'],
        summary: 'Update appointment status',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
         requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    enum: ['booked','cancelled','completed'],
                    example: 'completed'
                  }
                },
                required: ['status']
              }
            }
          }
        },
        responses: { '200': { description: 'Updated Appointment' } }
      }
    },

    // Customer-specific
    '/api/appointment/user/{userId}': {
      get: {
        tags: ['Appointments'],
        summary: 'Get all appointments for the logged-in customer',
        parameters: [
          { name: 'userId', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: { '200': { description: 'Array of Appointment' } }
      }
    },
    '/api/appointment/barber/{barberId}': {
      get: {
        tags: ['Appointments'],
        summary: 'Get all appointments for a given barber',
        parameters: [
          { name: 'barberId', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: { '200': { description: 'Array of Appointment' } }
      }
    }
  }
};

