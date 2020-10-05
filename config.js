const paths = {
    test: {
        data: './cheese-board/user_data/data.json',
        settings: './cheese-board/user_data/settings.json',
        userImages: 'C:\\msf\\cheese-dash\\cheese-board\\images'
    },
    production: {
        data: '/cheese-board/user_data/data.json',
        settings: '/cheese-board/user_data/settings.json',
        userImages: '/cheese-board/images'
    }
}

module.exports = paths.production;