import Router from '@koa/router';
import fetch, { Headers } from 'node-fetch';
import { EntityManager } from "typeorm";
import { User } from '../entities/User.entity';
const router = new Router();

router.prefix('/');
router.post('/login', async (ctx, next) => {
    const connection: EntityManager = ctx.state.connection;
    const { id, login, email, accessToken } = ctx.request.body;
    const user: User = await connection.findOne(User, { where: { client_id: id } });

    if (!user) {
        const user = connection.create<User>(User, { client_id: id, login: login, email: email });
        await connection.save<User>(user)

        ctx.status = 200;
        ctx.body = {
            _id: user.client_id,
            token: user.getToken()
        };

    } else {
        const headers = new Headers({
            "Authorization": "OAuth " + accessToken,
            'Content-Type': 'application/json'
        })
        const reps = await fetch('https://id.twitch.tv/oauth2/validate', { method: "GET", headers });
        const json = await reps.json();

        if (json.user_id === user.client_id) {
            ctx.status = 200;
            ctx.body = {
                token: user.getToken()
            };
        } else {
            throw new Error('Forbidden')
        }
    }
})


export default router;