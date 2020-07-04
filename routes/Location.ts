import Router from '@koa/router';
import passport from 'koa-passport';
import { User } from '../entities/User.entity';
import { Location } from '../entities/Location.entity';
import { EntityManager } from 'typeorm';

const router = new Router();


router.post('/location', passport.authenticate('jwt', { session: false }), async (ctx: any, next) => {
    const user: User = ctx.state.user;
    const connection: EntityManager = ctx.state.connection;

    const location: Location = await connection.findOne<Location>(Location, { where: { id: user.location } });

    

    ctx.status = 200;
    ctx.body = {
        user,
        location
    };
})



export default router;