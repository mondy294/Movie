import Home from '@/pages/Home'
import Center from '@/pages/center'
import Register from '@/pages/register'
import UpLoad from '@/pages/center/upload.vue'
import Category from '@/pages/category'
import Message from '@/pages/center/message/message.vue'
import Bigupload from '@/pages/bigupload'


export default [
    {
        path: '*',
        component: Home,
    },
    {
        path: "/home",
        name: 'home',
        component: Home,

    },
    {
        path: '/center',
        component: Center,
        name: 'center',
        // beforeEnter: (to, from, next) => {
        //     if (from.path.indexOf("center") == -1) {
        //         console.log(from.path.indexOf("center"));
        //         next()
        //     } else {
        //         console.log(123);
        //         next(false)
        //     }
        // },
        children: [
            {
                path: 'upload',
                component: UpLoad,
            },
            {
                name: 'message',
                path: 'message',
                component: Message,
            },
            {
                path: '/center',
                redirect: '/center/message'
            }

        ],

    },
    {
        name: 'register',
        path: '/register',
        component: Register
    },
    {
        path: '/category',
        component: Category,
        name: 'category'
    },
    {
        path: '/bigupload',
        component: Bigupload,
        name: 'bigupload'
    }
]

