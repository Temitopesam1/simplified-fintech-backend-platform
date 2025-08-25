import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
constructor() {
super({
jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
ignoreExpiration: false,
secretOrKey: process.env.JWT_SECRET || 'supersecret_jwt_key',
});
}


async validate(payload: any) {
// The validated payload will be attached to req.user
return { sub: payload.sub, email: payload.email, roles: payload.roles };
}
}
