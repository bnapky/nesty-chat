const users = [
    { username: 'napky', password: '!321drowssaP' },
];

export const userRepositoryMock = jest.fn(() => ({
    findOne: jest.fn(() => users[0]),
    insert: jest.fn(x => x),
    create: jest.fn(x => x),
    metadata: {
        columns: [],
        relations: [],
    },
}));
