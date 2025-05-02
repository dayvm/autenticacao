import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const {
    ACCESS_TOKEN_SECRET,
REFRESH_TOKEN_SECRET,
ACCESS_TOKEN_EXPIRATION,
REFRESH_TOKEN_EXPIRATION,
} = process.env;

export function generateAccessToken (payload) {
    return jwt.sign(payload, ACCESS_TOKEN_EXPIRATION, {
        expiresIn: ACCESS_TOKEN_EXPIRATION
    })
}

export function generateRefreshToken (payload) {
    return jwt.sign(payload, REFRESH_TOKEN_EXPIRATION, {
        expiresIn: REFRESH_TOKEN_EXPIRATION
    })
}

export function verifyAccessToken (token) {
    return jwt.verify(token, ACCESS_TOKEN_SECRET)
}

export function verifyRefreshToken (token){
    return jwt.verify(token, REFRESH_TOKEN_SECRET)
}