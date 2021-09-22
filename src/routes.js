import NotFoundComponent from './components/NotFound.vue';

const HelloWorld = () => import('./components/HelloWorld.vue')
const UserPage = () => import('./components/User.vue')

const routes = [
    { path: '/', component: HelloWorld },
    { path: '/user/:id', component: UserPage },
    { path: '/:pathMatch(.*)*', component: NotFoundComponent },
];

export default routes;