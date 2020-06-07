import Router from '@koa/router';
import passport from 'koa-passport';
import { User } from '../entities/User.entity';

const router = new Router();

router.get('/', async (ctx: any, next) => {
    if (ctx.isAuthenticated()) {
        const user: User = ctx.state.user;
        ctx.status = 200;
        ctx.body = user;
    } else {
        ctx.status = 401;
    }
})

router.get('/logout', async (ctx: any, next) => {
    if (ctx.isAuthenticated()) {
        await ctx.logout();
        ctx.status = 204;
    } else {
        ctx.status = 204;
    }
})

router.get('/me', async (ctx: any, next) => {
    if (ctx.isAuthenticated()) {
        const user: User = ctx.state.user;
        ctx.status = 200;
        ctx.body = user;
    } else {
        ctx.status = 401;
    }
});

export default router;