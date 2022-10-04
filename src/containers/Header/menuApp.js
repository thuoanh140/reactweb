export const adminMenu = [
    { //Quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
            },
            // {
            //     name: 'menu.admin.crud-redux', link: '/system/user-redux'
            //     // subMenus: [
            //     //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
            //     //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

            //     // ]
            // },
            {
                name: 'menu.admin.manage-admin', link: '/system/user-admin'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
            },
            {
                name: 'menu.admin.manage-staff', link: '/system/user-staff'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
            },
            {
                name: 'menu.admin.manage-membership', link: '/system/user-membership'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
            },

        ]
    },
    { //Quản lý phim
        name: 'menu.admin.movie',
        menus: [
            {
                name: 'menu.admin.manage-movie', link: '/system/manage-movie'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
            },
            {
                name: 'menu.admin.manage-showtime', link: '/system/manage-showtime'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
            },
        ]
    },
    { //Quản lý vé
        name: 'menu.admin.ticket',
        menus: [
            {
                name: 'menu.admin.manage-ticket', link: '/system/manage-ticket'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
            }
        ]
    },
    { //Quản lý rạp
        name: 'menu.admin.theater',
        menus: [
            {
                name: 'menu.admin.manage-theater', link: '/system/manage-theater'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
            },
            {
                name: 'menu.admin.manage-room', link: '/system/manage-room'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
            }

        ]
    },
    { //Quản lý thức ăn
        name: 'menu.admin.food',
        menus: [
            {
                name: 'menu.admin.manage-food', link: '/system/manage-food'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
            }

        ]
    },
    { //Quản lý khuyến mãi
        name: 'menu.admin.discount',
        menus: [
            {
                name: 'menu.admin.manage-discount', link: '/system/manage-discount'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
            }

        ]
    },
];