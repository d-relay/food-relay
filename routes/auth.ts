import Router from '@koa/router';
import passport from 'koa-passport';
const router = new Router();

router.get('/auth/twitch', passport.authenticate("twitch", { forceVerify: true }));
router.get('/auth/twitch/callback', passport.authenticate("twitch", { successRedirect: '/me', failureRedirect: '/' }));

export default router;