import auth from './Auth';
import profile from './Profile';

export const controller = (app: any) => {
    app.use(auth.routes());
    app.use(auth.allowedMethods());

    app.use(profile.routes());
    app.use(profile.allowedMethods())
}