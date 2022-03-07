export default data = [
    {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
    },
    {
        _id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true,
    },
];
