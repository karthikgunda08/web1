// src/__tests__/utils/testSetup.js
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import Project from '../../models/Project.js';

export const createTestUser = async (userData = {}) => {
    const defaultUser = {
        email: 'test@example.com',
        passwordHash: await bcrypt.hash('password123', 10),
        name: 'Test User',
        credits: 100,
        role: 'user'
    };

    const user = await User.create({ ...defaultUser, ...userData });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    
    return { user, token };
};

export const createTestProject = async (userId, projectData = {}) => {
    const defaultProject = {
        name: 'Test Project',
        projectType: 'building',
        userId,
        status: 'design',
        isPublic: false,
        levels: [{
            id: 'level-1',
            name: 'Ground Floor',
            elevation: 0,
            walls: [],
            rooms: [],
            placements: [],
            activeLayerId: 'default-layer'
        }]
    };

    return await Project.create({ ...defaultProject, ...projectData });
};

export const clearTestData = async () => {
    await User.deleteMany({});
    await Project.deleteMany({});
};

export const getAuthHeader = (token) => ({
    Authorization: `Bearer ${token}`
});
