import auth from './Auth';
import profile from './Profile';
import location from './Location';

export const controller = (app: any) => {
    app.use(auth.routes());
    app.use(auth.allowedMethods());

    app.use(profile.routes());
    app.use(profile.allowedMethods())

    app.use(location.routes());
    app.use(location.allowedMethods())
}