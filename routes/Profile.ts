import Router from '@koa/router';
import passport from 'koa-passport';
import { Alert, Location, User } from '../entities';
import { AlertServices, LocationServices } from '../services';
const router = new Router();

router.get('/profile', passport.authenticate('jwt', { session: false }), async (ctx: any, next) => {
    const user: User = ctx.state.user;

    const alert: Alert = await new AlertServices().FindByUser({ user });
    const location: Location = await new LocationServices().FindByUser({ user });

    ctx.status = 200;
    ctx.body = {
        user,
        alert,
        location
    };
})



export default router;