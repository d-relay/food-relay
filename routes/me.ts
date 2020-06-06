import Router from '@koa/router';
import passport from 'koa-passport';
import { User } from '../entities/User.entity';
const router = new Router();

router.get('/me', async (ctx: any, next) => {
    if (ctx.isAuthenticated()) {
        const user: User = ctx.state.user;
        await ctx.render('main', {
            title: user.login,
            content: user.client_id
        })
    } else {
        await ctx.redirect('/auth/twitch');
    }
});

export default router;