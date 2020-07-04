import passport from 'koa-passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { UserServices } from '../services/UserServices';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.COOKIE_SECRET
}

passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
    try {
        const userServices = new UserServices();
        const user = await userServices.FindByCliendId({ client_id: jwtPayload.id });
        return done(null, user ?? false);
    } catch (err) {
        return done(err, false);
    }
}))