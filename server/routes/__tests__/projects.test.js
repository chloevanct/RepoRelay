/* ChatGPT 4.0 July 21 2024
Prompts used were “Help me build a test suite for my routers using Jest and supertest"
The generated code was adopted*/

const request = require('supertest');
const app = require('../../app');
const Project = require('../../db/models/project');
const User = require('../../db/models/user');
const { v4: uuidv4 } = require('uuid');

// Mock the mongoose connection to prevent actual db connection during testing
jest.mock('mongoose', () => {
    const actualMongoose = jest.requireActual('mongoose');
    return {
        ...actualMongoose,
        connect: jest.fn().mockResolvedValue(() => {
            console.log('Mocked Mongoose connection');
        }),
        connection: {
            on: jest.fn(),
            once: jest.fn(),
        },
    };
});

jest.mock('../../db/models/project', () => {
    const mockProjectModel = {
        find: jest.fn(),
        findOne: jest.fn(),
        deleteOne: jest.fn(),
        findOneAndUpdate: jest.fn(),
    };

    function Project(data) {
        this.save = jest.fn().mockResolvedValue(data);
        Object.assign(this, data);
    }

    Project.find = mockProjectModel.find;
    Project.findOne = mockProjectModel.findOne;
    Project.deleteOne = mockProjectModel.deleteOne;
    Project.findOneAndUpdate = mockProjectModel.findOneAndUpdate;

    return Project;
});

jest.mock('../../db/models/user', () => {
    return {
        findOneAndUpdate: jest.fn(),
    };
});

describe('Projects API', () => {
    let mockProject;

    beforeEach(() => {
        mockProject = {
            projectID: uuidv4(),
            name: 'Test Project',
            description: 'Test project description',
            projectOwner: 'owner-id-123',
            tasks: [],
            comments: [],
        };
    });

    it('should fetch all projects', async () => {
        Project.find.mockResolvedValue([mockProject]);

        const response = await request(app).get('/projects');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([mockProject]);
    });

    it('should add a new project', async () => {
        User.findOneAndUpdate.mockResolvedValue({ userID: mockProject.projectOwner, ownedProjects: [mockProject.projectID] });

        const response = await request(app).post('/projects').send(mockProject);
        console.log('Response status:', response.status);
        console.log('Response body:', response.body);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockProject);
    });

    it('should delete a project', async () => {
        Project.deleteOne.mockResolvedValue({ deletedCount: 1 });

        const response = await request(app).delete(`/projects/${mockProject.projectID}`);
        expect(response.status).toBe(204);
    });

    it('should update a project', async () => {
        const updatedProject = { ...mockProject, name: 'Updated Name' };
        Project.findOneAndUpdate.mockResolvedValue(updatedProject);

        const response = await request(app).put(`/projects/${mockProject.projectID}`).send(updatedProject);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedProject);
    });

    it('should partially update a project', async () => {
        const partialUpdate = { description: 'Updated Description' };
        const updatedProject = { ...mockProject, ...partialUpdate };
        Project.findOneAndUpdate.mockResolvedValue(updatedProject);

        const response = await request(app).patch(`/projects/${mockProject.projectID}`).send(partialUpdate);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedProject);
    });
});