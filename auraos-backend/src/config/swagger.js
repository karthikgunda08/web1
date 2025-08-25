// src/config/swagger.js
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'AuraOS API Documentation',
            version: '1.0.0',
            description: 'API documentation for the AuraOS Backend Services',
            contact: {
                name: 'Dakshin Vaarahi Team',
                url: 'https://dakshin-vaarahi.ai',
            },
        },
        servers: [
            {
                url: process.env.NODE_ENV === 'production'
                    ? 'https://api.dakshin-vaarahi.ai'
                    : `http://localhost:${process.env.PORT || 3001}`,
                description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                Error: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            example: 'error',
                        },
                        message: {
                            type: 'string',
                            example: 'Error message description',
                        },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            example: '507f1f77bcf86cd799439011',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'user@example.com',
                        },
                        name: {
                            type: 'string',
                            example: 'John Doe',
                        },
                        role: {
                            type: 'string',
                            enum: ['user', 'owner'],
                            example: 'user',
                        },
                        credits: {
                            type: 'number',
                            example: 100,
                        },
                    },
                },
                Project: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            example: '507f1f77bcf86cd799439011',
                        },
                        name: {
                            type: 'string',
                            example: 'Modern Villa Design',
                        },
                        projectType: {
                            type: 'string',
                            enum: ['building', 'masterPlan'],
                            example: 'building',
                        },
                        status: {
                            type: 'string',
                            example: 'design',
                        },
                        isPublic: {
                            type: 'boolean',
                            example: false,
                        },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.js'], // Path to the API routes
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
