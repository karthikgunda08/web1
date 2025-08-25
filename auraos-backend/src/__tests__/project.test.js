// src/__tests__/project.test.js
import request from 'supertest';
import { app } from '../server.js';
import { createTestUser, createTestProject, clearTestData, getAuthHeader } from './utils/testSetup.js';
import Project from '../models/Project.js';

describe('Project Endpoints', () => {
    let testUser;
    let authToken;

    beforeEach(async () => {
        await clearTestData();
        const result = await createTestUser();
        testUser = result.user;
        authToken = result.token;
    });

    describe('POST /api/projects', () => {
        it('should create a new project', async () => {
            const projectData = {
                name: 'New Villa Design',
                projectType: 'building',
                location: 'Mountain View, CA'
            };

            const res = await request(app)
                .post('/api/projects')
                .set(getAuthHeader(authToken))
                .send(projectData);

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('name', projectData.name);
            expect(res.body).toHaveProperty('projectType', projectData.projectType);
            expect(res.body).toHaveProperty('userId', testUser.id);
        });

        it('should not create project without authentication', async () => {
            const res = await request(app)
                .post('/api/projects')
                .send({ name: 'Test Project' });

            expect(res.statusCode).toBe(401);
        });
    });

    describe('GET /api/projects', () => {
        beforeEach(async () => {
            // Create some test projects
            await createTestProject(testUser._id, { name: 'Project 1' });
            await createTestProject(testUser._id, { name: 'Project 2' });
        });

        it('should get all user projects', async () => {
            const res = await request(app)
                .get('/api/projects')
                .set(getAuthHeader(authToken));

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(res.body).toHaveLength(2);
        });

        it('should return projects sorted by updatedAt', async () => {
            const res = await request(app)
                .get('/api/projects')
                .set(getAuthHeader(authToken))
                .query({ sort: 'updatedAt' });

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(new Date(res.body[0].updatedAt)).toBeGreaterThan(new Date(res.body[1].updatedAt));
        });
    });

    describe('GET /api/projects/:projectId', () => {
        let testProject;

        beforeEach(async () => {
            testProject = await createTestProject(testUser._id);
        });

        it('should get project by id', async () => {
            const res = await request(app)
                .get(`/api/projects/${testProject._id}`)
                .set(getAuthHeader(authToken));

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('_id', testProject._id.toString());
            expect(res.body).toHaveProperty('name', testProject.name);
        });

        it('should not get project with invalid id', async () => {
            const res = await request(app)
                .get('/api/projects/invalid-id')
                .set(getAuthHeader(authToken));

            expect(res.statusCode).toBe(400);
        });

        it('should not get project belonging to another user', async () => {
            const otherUser = await createTestUser({ email: 'other@example.com' });
            const otherProject = await createTestProject(otherUser.user._id);

            const res = await request(app)
                .get(`/api/projects/${otherProject._id}`)
                .set(getAuthHeader(authToken));

            expect(res.statusCode).toBe(403);
        });
    });

    describe('DELETE /api/projects/:projectId', () => {
        let testProject;

        beforeEach(async () => {
            testProject = await createTestProject(testUser._id);
        });

        it('should delete project', async () => {
            const res = await request(app)
                .delete(`/api/projects/${testProject._id}`)
                .set(getAuthHeader(authToken));

            expect(res.statusCode).toBe(200);

            // Verify project is deleted
            const deletedProject = await Project.findById(testProject._id);
            expect(deletedProject).toBeNull();
        });

        it('should not delete project belonging to another user', async () => {
            const otherUser = await createTestUser({ email: 'other@example.com' });
            const otherProject = await createTestProject(otherUser.user._id);

            const res = await request(app)
                .delete(`/api/projects/${otherProject._id}`)
                .set(getAuthHeader(authToken));

            expect(res.statusCode).toBe(403);

            // Verify project still exists
            const project = await Project.findById(otherProject._id);
            expect(project).toBeTruthy();
        });
    });

    describe('PUT /api/projects/:projectId', () => {
        let testProject;

        beforeEach(async () => {
            testProject = await createTestProject(testUser._id);
        });

        it('should update project', async () => {
            const updates = {
                name: 'Updated Project Name',
                location: 'New Location'
            };

            const res = await request(app)
                .put(`/api/projects/${testProject._id}`)
                .set(getAuthHeader(authToken))
                .send(updates);

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('name', updates.name);
            expect(res.body).toHaveProperty('location', updates.location);
        });

        it('should not update sensitive fields', async () => {
            const updates = {
                userId: 'some-other-user-id',
                credits: 1000000
            };

            const res = await request(app)
                .put(`/api/projects/${testProject._id}`)
                .set(getAuthHeader(authToken))
                .send(updates);

            expect(res.statusCode).toBe(200);
            expect(res.body.userId).toBe(testUser.id);
        });
    });
});
