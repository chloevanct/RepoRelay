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
        updateMany: jest.fn(),
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
        const mockOwnerUpdateResult = { userID: mockProject.projectOwner, ownedProjects: [] };
        const mockSubscriberUpdateResult = { nModified: 0 };

        Project.findOne.mockResolvedValue(mockProject);
        Project.deleteOne.mockResolvedValue({ deletedCount: 1 });
        User.findOneAndUpdate.mockResolvedValue(mockOwnerUpdateResult);
        User.updateMany.mockResolvedValue(mockSubscriberUpdateResult);

        const response = await request(app).delete(`/projects/${mockProject.projectID}`);
        expect(response.status).toBe(204);
        expect(Project.findOne).toHaveBeenCalledWith({ projectID: mockProject.projectID });
        expect(Project.deleteOne).toHaveBeenCalledWith({ projectID: mockProject.projectID });
        expect(User.findOneAndUpdate).toHaveBeenCalledWith(
            { userID: mockProject.projectOwner },
            { $pull: { ownedProjects: mockProject.projectID } },
            { new: true }
        );
        expect(User.updateMany).toHaveBeenCalledWith(
            { subscribedProjects: mockProject.projectID },
            { $pull: { subscribedProjects: mockProject.projectID } }
        );
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