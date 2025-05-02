import { Error } from 'mongoose';
import User from '../models/user.model.js'
import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} from '../utils/token.js'

export async function login (email, password) {
    const user = await User.findOne ({ email });
    if (!user) {
        throw new Error ('Usuário não encontrado')
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid){
        throw new Error("Senha inválida");
    }

    const payload = {userId: user._id, role: user.role}

    const accessToken = generateAccessToken(payload)
    const refreshToken = generateRefreshToken(payload)

    user.refreshToken = refreshToken;
    await user.save()

    return { accessToken, refreshToken}
}

export async function refreshToken (oldRefreshToken) {
    try {
        const payload = verifyRefreshToken(oldRefreshToken)

        const user = await User.findById(payload.userId)
        if (!user || user.refreshToken !== oldRefreshToken){
            throw new Error("Refresh token inválido");            
        }

        const newPayload = {userId:user.id, role: user.role}
        const newAccessToken = generateAccessToken(newPayload)
        const newRefreshToken = generateRefreshToken(newPayload)

        user.refreshToken=newRefreshToken;
        await user.save()

        return { accessToken: newAccessToken, refreshToken: newRefreshToken}

    } catch (error) {
        throw new Error("Falha ao renovar token");
        
    }
}