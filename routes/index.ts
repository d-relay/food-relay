import auth from './auth';
import me from './me';
// import profile from './profiles';

export const controller = (app: any) => {
    app.use(auth.routes());
    app.use(auth.allowedMethods());

    app.use(me.routes());
    app.use(me.allowedMethods())

    // app.use(profile.routes());
    // app.use(profile.allowedMethods())
}