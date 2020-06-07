import Router from '@koa/router';
import passport from 'koa-passport';
const router = new Router();

router.get('/auth/twitch', passport.authenticate("twitch"));
router.get('/auth/twitch/callback', passport.authenticate("twitch", { successRedirect: '/', failureRedirect: '/' }));

export default router;