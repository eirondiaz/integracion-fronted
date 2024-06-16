import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const useAxios = ({
  path,
  method = 'GET',
  initValue = {},
  params = {},
  finallyCB = null,
  tryCB = null,
  catchCB = null,
}) => {
  const [data, setData] = useState(initValue)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendRequest = useCallback(
    async (body = null) => {
      setLoading(true)
      setError(null)
      try {
        const res = await axios({
          url: `${process.env.REACT_APP_API_URL}${path}`,
          method,
          params,
          data: body,
        })
        setData(res.data.data)
        if (tryCB) tryCB()
      } catch (err) {
        console.log(err)
        const messageError = err?.response?.data?.message || 'Error'
        setError(messageError)
        if (catchCB) catchCB(messageError)
      } finally {
        setLoading(false)
        if (finallyCB) finallyCB()
      }
    },
    [path, method, params]
  )

  return { data, loading, error, sendRequest }
}

export default useAxios
