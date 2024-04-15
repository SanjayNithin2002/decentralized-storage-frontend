const pageAccessList = (userType) => {
    const pages = {
        "users": [
            {
                'name': 'Home',
                'endpoint': '/home'
            },
            {
                'name': 'Files',
                'endpoint': '/files'
            }
        ],
        "dataowners": [
            {
                'name': 'Home',
                'endpoint': '/home'
            },
            {
                'name': 'Files',
                'endpoint': '/files'
            }, 
            {
                'name': 'Users',
                'endpoint': '/users'
            }, 
            {
                'name': 'Upload',
                'endpoint': '/upload'
            }
        ]
    }

    return pages[userType];
}

export default pageAccessList;