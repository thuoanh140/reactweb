export const adminMenu = [
    { //Quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [


            {
                name: 'menu.admin.manage-staff', link: '/system/user-manage'
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
        name: 'menu.admin.cinema-room',
        menus: [

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
                name: 'menu.admin.manage-discount', link: '/system/manage-event'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
            }

        ]
    },
    { //Quản lý doanh thu
        name: 'menu.admin.revenue',
        menus: [
            {
                name: 'menu.admin.ticket-revenue', link: '/system/manage-revenue-ticket'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
            },
            {
                name: 'menu.admin.food-revenue', link: '/system/manage-revenue-food'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
            }

        ]
    },
    { //Quản lý báo xấu
        name: 'menu.admin.report',
        menus: [
            {
                name: 'menu.admin.manage-report', link: '/system/manage-report'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
            }

        ]
    },
];