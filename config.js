const paths = {
    test: {
        data: './cheese-board/user_data/data.json',
        settings: './cheese-board/user_data/settings.json',
        userIcons: 'C:\\msf\\cheese-dash\\cheese-board\\icons',
        userWallpapers: 'C:\\msf\\cheese-dash\\cheese-board\\wallpapers'
    },
    production: {
        data: '/cheese-board/user_data/data.json',
        settings: '/cheese-board/user_data/settings.json',
        userIcons: '/cheese-board/icons',
        userWallpapers: '/cheese-board/wallpaper'
    }
}

module.exports = paths.production;