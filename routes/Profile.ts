import Router from '@koa/router';
import passport from 'koa-passport';
import { User } from '../entities/User.entity';

const router = new Router();

router.get('/profile', passport.authenticate('jwt', { session: false }), async (ctx: any, next) => {
    const user: User = ctx.state.user;
    ctx.status = 200;
    ctx.body = {
        user,
    };
})



export default router;