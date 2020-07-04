import Router from '@koa/router';
import { UserServices } from '../services/UserServices';
const router = new Router();

router.post('/login', async (ctx, next) => {
    const { id: client_id, login, email, accessToken } = ctx.request.body;
    const userServises = new UserServices();
    const user = await userServises.FindByCliendId({ client_id });

    if (!user) {
        const user = await userServises.UserRegistration({ client_id, login, email });
        ctx.status = 200;
        ctx.body = {
            _id: user.client_id,
            token: user.getToken()
        };
    } else {
        await userServises.UserTokenValidation({ client_id, accessToken })

        ctx.status = 200;
        ctx.body = {
            _id: user.client_id,
            token: user.getToken()
        };

    }
})


export default router;