import passport from 'koa-passport';
import { getManager } from "typeorm";
import { User } from "../entities/User.entity";
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.COOKIE_SECRET
}

passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
    try {
        const connection = getManager();
        const user = await connection.findOne(User, { where: { id: jwtPayload.id } });
        return done(null, user ?? false);
    } catch (err) {
        return done(err, false);
    }
}))