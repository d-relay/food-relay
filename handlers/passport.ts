import passport from 'koa-passport';
import { getManager } from "typeorm";
import { User } from "../entities/User.entity";
import { Strategy as TwitchStrategy } from 'passport-twitch';

const options = {
    clientID: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:5000/auth/twitch/callback",
    scope: "user:read:email analytics:read:games",
    state: true
}

passport.serializeUser(function (profile, done) {
    done(null, profile);
});

passport.deserializeUser(function (profile, done) {
    done(null, profile);
});

passport.use('twitch', new TwitchStrategy(options, async function (accessToken: string, refreshToken: string, profile: any, done: any) {
    try {
        const connection = getManager();
        profile.accessToken = accessToken;
        profile.refreshToken = refreshToken;

        const user = await connection.findOne(User, { where: { client_id: profile.id } });

        if (user) {
            return done(null, user ?? false);
        } else {
            const user = connection.create(User, {
                client_id: profile.id,
                accessToken: profile.accessToken,
                refreshToken: profile.refreshToken,
                login: profile.login
            })
            const updated = await connection.save(user);
            return done(null, updated ?? false);
        }
    } catch (err) {
        return done(err, false);
    }
}))

