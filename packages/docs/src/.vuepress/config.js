module.exports = {
	dest: "./dist/",
    title: 'Scotch VuePress',
    description: "A demo documentation using VuePress",
    themeConfig:{
        nav: [
            { text: 'GUIDE', link: '/guide/' },
        ],
        sidebar: [
            {
                title: 'API Guide',
                collapsable: false,
                children: [
                    ['/guide/', 'Dev Guide'],
                ]
            }
            ]
    }
}