/**
 *
 * @param { String } file path name of the desired collection
 * @param { boolean | undefined } fetchOptions.onMounted if true run query on mount
 */

import { axios } from 'axios'

export default function () {
  const getCSRDCollection = async fileNm => {
    const data = await axios.get(`/JSON/CSRD/${fileNm}`)
    return data
  }

  return {
    getCSRDCollection: getCSRDCollection
  }
}
