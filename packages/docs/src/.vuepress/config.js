module.exports = {
	dest: "./dist/",
    title: 'Scotch VuePress',
    description: "A demo documentation using VuePress",
    themeConfig:{
        nav: [
            { text: 'DEV', link: '/dev/' },
        ],
        sidebar: [
            {
                title: 'DEV App Docs',
                collapsable: false,
                children: [
                    ['/dev/app/docs/', 'Dev Docs'],
                    ['/dev/app/contribute/', 'Dev Contribute'],
                    ['/dev/app/design/', 'App Design'],
                ]
            }
            ]
    }
}