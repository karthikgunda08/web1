// src/__tests__/socket.test.js
import { createServer } from 'http';
import { Server } from 'socket.io';
import Client from 'socket.io-client';
import { app } from '../server.js';
import { createTestUser, createTestProject, clearTestData } from './utils/testSetup.js';
import jwt from 'jsonwebtoken';

describe('WebSocket Tests', () => {
    let io;
    let serverSocket;
    let clientSocket;
    let httpServer;
    let testUser;
    let testProject;
    let authToken;

    beforeAll(async () => {
        httpServer = createServer(app);
        io = new Server(httpServer);
        httpServer.listen(() => {
            const port = httpServer.address().port;
            Client.connect(`http://localhost:${port}`, {
                auth: {
                    token: authToken
                }
            });
        });
    });

    afterAll(() => {
        io.close();
        httpServer.close();
    });

    beforeEach(async () => {
        await clearTestData();
        const result = await createTestUser();
        testUser = result.user;
        authToken = result.token;
        testProject = await createTestProject(testUser._id);

        // Connect client socket
        await new Promise((resolve) => {
            clientSocket = Client(`http://localhost:${httpServer.address().port}`, {
                auth: { token: authToken }
            });
            clientSocket.on('connect', resolve);
        });
    });

    afterEach(() => {
        if (clientSocket) {
            clientSocket.close();
        }
    });

    test('should authenticate socket connection', (done) => {
        clientSocket.on('connect', () => {
            expect(clientSocket.connected).toBe(true);
            done();
        });
    });

    test('should join project room', (done) => {
        clientSocket.emit('join_project', testProject._id.toString());
        
        clientSocket.on('project_joined', (data) => {
            expect(data.projectId).toBe(testProject._id.toString());
            done();
        });
    });

    test('should broadcast wall updates to room members', (done) => {
        const wallUpdate = {
            projectId: testProject._id.toString(),
            wall: {
                id: 'wall-1',
                x1: 0,
                y1: 0,
                x2: 100,
                y2: 0,
                thickness: 200,
                height: 3000
            }
        };

        clientSocket.emit('join_project', testProject._id.toString());

        clientSocket.on('project_joined', () => {
            clientSocket.emit('wall_update', wallUpdate);
        });

        clientSocket.on('wall_updated', (data) => {
            expect(data.projectId).toBe(wallUpdate.projectId);
            expect(data.wall).toEqual(wallUpdate.wall);
            done();
        });
    });

    test('should handle disconnection gracefully', (done) => {
        clientSocket.emit('join_project', testProject._id.toString());
        
        clientSocket.on('project_joined', () => {
            clientSocket.disconnect();
        });

        clientSocket.on('disconnect', () => {
            expect(clientSocket.connected).toBe(false);
            done();
        });
    });

    test('should handle invalid project ID', (done) => {
        clientSocket.emit('join_project', 'invalid-id');
        
        clientSocket.on('error_message', (error) => {
            expect(error).toBe('Project not found.');
            done();
        });
    });

    test('should broadcast room updates to all members', (done) => {
        const roomUpdate = {
            projectId: testProject._id.toString(),
            room: {
                id: 'room-1',
                name: 'Living Room',
                type: 'living',
                wallIds: ['wall-1', 'wall-2'],
                area: 240000
            }
        };

        clientSocket.emit('join_project', testProject._id.toString());

        clientSocket.on('project_joined', () => {
            clientSocket.emit('room_update', roomUpdate);
        });

        clientSocket.on('room_updated', (data) => {
            expect(data.projectId).toBe(roomUpdate.projectId);
            expect(data.room).toEqual(roomUpdate.room);
            done();
        });
    });
});
