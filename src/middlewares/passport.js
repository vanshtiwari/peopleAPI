import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import db from '../models/index.js';
import of from '../helpers/awaitof.js';

export default (passport) => {
  passport.use(
    new JwtStrategy({
      secretOrKey: process.env.AUTH_SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
      async (jwt_payload, next) => {
        const [user, err] = await of(db.users.findOne({ where: { id: jwt_payload.id, uuid: jwt_payload.uuid } }));

        if (err) {
          return next(err, false);
        }
        if (user) {
          next(null, user);
        } else {
          next(null, false);
        }
      }
    )
  )
}
