import axios from 'axios'
import { UnauthorizedError } from './errors/unauthorizedError'
import { InternalError } from './errors/internalError'
import { BadRequestError } from './errors/badRequestError'
import { NotFoundError } from './errors/notFoundError'
import { NotAcceptableError } from './errors/notAcceptableError'

const BASE_URL = import.meta.env.VITE_API_URL;
const MAX_RETRIES = 3;


export interface SuccessResponse {
	success: boolean
}

const refreshToken = async (): Promise<SuccessResponse> => {
	for (let i = 0; i < 3; i++) {
		try {
			const refreshToken = localStorage.getItem('refreshToken')
			const response = await axios.post(`${BASE_URL}/refresh-token`, null, {
				headers: {
					Authorization: `Bearer ${refreshToken}`
				}
			})

			localStorage.setItem('accessToken', response.data.accessToken)
			localStorage.setItem('refreshToken', response.data.refreshToken)

			return { success: true }
		} catch (error) {
            console.log(error)
		}
	}
	return { success: false }
}

const post = async function (path: string, body: any, headers?: any, retried = 0): Promise<any> {
	const token = localStorage.getItem('accessToken')
	headers = {
		...headers,
		Authorization: `Bearer ${token}`
	}

	try {
		const response = await axios.post(`${BASE_URL}${path}`, body, {
			headers
		})
		return response.data
	} catch (error: any) {
		if (error.response && error.response.status === 401) {
			const result = await refreshToken()
			if (result.success && retried < MAX_RETRIES) {
				return post(path, body, headers, retried + 1)
			} else {
				throw new UnauthorizedError()
			}
		} else if (error.response && error.response.status === 400) {
			throw new BadRequestError()
		} else if (error.response && error.response.status === 404) {
			throw new NotFoundError()
		} else if (error.response && error.response.status === 406) {
			throw new NotAcceptableError()
		}
		throw new InternalError()
	}
}

const get = async function (path: string, params?: any, headers?: any, retried = 0): Promise<any> {
	const token = localStorage.getItem('accessToken')
	headers = {
		...headers,
		Authorization: `Bearer ${token}`
	}
	params = new URLSearchParams(params)
	try {
		const response = await axios.get(
			`${BASE_URL}${path}?${params.toString()}`,
			{
				headers
			}
		)
		return response.data
	} catch (error: any) {
		if (error.response && error.response.status === 401) {
			const result = await refreshToken()
			if (result.success && retried < MAX_RETRIES) {
				return get(path, params, headers, retried + 1)
			} else {
				throw new UnauthorizedError()
			}
		} else if (error.response && error.response.status === 400) {
			throw new BadRequestError()
		} else if (error.response && error.response.status === 404) {
			throw new NotFoundError()
		} else if (error.response && error.response.status === 406) {
			throw new NotAcceptableError()
		}
		throw new InternalError()
	}
}

export default { get, post }