const paths = {
    test: {
        data: './cheese-board/user_data/data.json',
        userImages: 'C:\\msf\\cheese-dash\\cheese-board\\images'
    },
    production: {
        data: '/cheese-board/user_data/data.json',
        userImages: '/cheese-board/images'
    }
}

module.exports = paths.production;