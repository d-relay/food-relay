import Router from '@koa/router';
import passport from 'koa-passport';
import { User } from '../entities';
import { AlertServices } from '../services';
const router = new Router();

router.get('/alert', passport.authenticate('jwt', { session: false }), async (ctx: any, next) => {
    const user: User = ctx.state.user;

    const alertServices = new AlertServices();
    const alert = await alertServices.FindByUser({ user });

    ctx.status = 200;
    ctx.body = {
        alert
    };
})

router.post('/alert', passport.authenticate('jwt', { session: false }), async (ctx: any, next) => {
    const user: User = ctx.state.user;

    const alertServices = new AlertServices();
    const alert = await alertServices.UpdateFields({
        user, params: ctx.request.body
    });

    ctx.status = 200;
    ctx.body = { alert };
})

router.post('/alert/test/:alertToken', passport.authenticate('jwt', { session: false }), async (ctx: any, next) => {
    const { alertToken } = ctx.params;
    if (ctx.wss) {
        try {
            const wss = [...ctx.wss.clients].filter(ws => ws.id === alertToken);
            return wss.map(ws => ws.send(alertToken));
        } catch (error) {
            return next();
        }
    }
    ctx.status = 200;
    ctx.body = {};
})

export default router;