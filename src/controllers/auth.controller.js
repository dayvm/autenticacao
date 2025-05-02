import * as authService from '../services/auth.service.js'

export async function login (req, res) {
    try {
        const { email, password } = req.body
        const tokens = await authService.login(email, password)
        res.status(200).json(tokens)

    } catch (error) {
        res.status(401).json({message: error.message || 'falha no login'})
    }
    
}

export async function refresh(req, res) {
    try {
        const refreshToken = req.body
        const newTokens = await authService.refreshToken(refreshToken)
        res.status(200).json(newTokens)

    } catch (error) {
        res.status(403).json({message: error.message || 'falha ao renovar token'})
    }
}