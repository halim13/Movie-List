export const BASE_URL = 'https://api.themoviedb.org/3'

export const requestGet = async (url, params, isRefreshed = false) => {
    try {
      console.log(`${url}${parseParamToString(params)}`)

      const response = await fetch(`${url}${parseParamToString(params)}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNmY4ODI4N2I2MTVmMDdjN2VmOWNiNWVkNmM4MmMyOSIsInN1YiI6IjVlNGYzZTM1YTc2YWM1MDAxNTlmMTNjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OM0grhBP_6_Wa7gYdavkkOjKKPNEB5sPzS1zCM4eSdY'
        }
      })
      if (response.status === 200) {
        return response.json()
      } else {
        const message = await response.text()
        console.log(`${url}${parseParamToString(params)}`, message)
        try {
          const errJson = JSON.parse(message)
          return Promise.reject(errJson)
        } catch (err) {
          return Promise.reject(message)
        }
      }
    } catch (err) {
        console.log(`${url}${parseParamToString(params)}`, err)
        if (!isRefreshed) {
          return requestGet(url, params, true)
        } else return Promise.reject(err)
    }
}

export const parseParamToString = (data) => {
	if(data) {
		var url = '?'
		for(var key in data) {
			if(data[key] !== null && data[key] !== undefined)
				url += (`${key}=${data[key]}&`)
		}
		return url
	}
	return ''
}
