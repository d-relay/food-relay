import Router from '@koa/router';
import passport from 'koa-passport';
import { User } from '../entities/User.entity';
import { LocationServices } from '../services/LocationServices'
const router = new Router();

router.get('/location', passport.authenticate('jwt', { session: false }), async (ctx: any, next) => {
    const user: User = ctx.state.user;

    const locationServices = new LocationServices();
    const location = await locationServices.FindLocationById({ id: user.locationId });

    ctx.status = 200;
    ctx.body = {
        location
    };
})



export default router;