import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from 'react-query'
import {request, RequestDocument} from 'graphql-request'

const BASE_URL ='/';


type ANY = {[key: string]: any}
  export const getClient = (() => {
      let client: QueryClient | null =  null;
      return () => {
          if (!client){
            client = new QueryClient({
                defaultOptions: {
                    queries: {
                        cacheTime: 1000 * 60 * 60 * 24, //inactive 상태인 캐시 데이터가 메모리에 남아있는 시간이다. 이 시간이 지나면 캐시 데이터는 가비지 컬렉터에 의해 삭제 default는 5분이다.
                        staleTime: 1000 * 60, // data가 fresh 상태로 유지되는 시간이다. 해당 시간이 지나면 stale 상태가 된다. default는 0이다.
                        refetchOnMount: false, // 데이터가 stale 상태인 경우 마운트 시 마다 refetch를 실행하는 옵션
                        refetchOnReconnect: false, // 데이터가 stale 상태인 경우 재 연결될 때 refetch를 실행하는 옵션
                        refetchOnWindowFocus: false, //데이터가 stale 상태인 경우 윈도우 포커싱 될 때 마다 refetch를 실행하는 옵션
                    }
                }
            });
          }
          return client
      }
  })();


  export const restFetcher = async({
        method,
        path,
        body,
        params,
  } : {
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
      path: string
      body?: ANY
      params?: ANY
  }) => {

      try {
          let url = `${BASE_URL}${path}`
          const fetchOption: RequestInit = {
              method,
              headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin' : BASE_URL
              }
          }
          if (params) {
              const searchParams = new URLSearchParams(params)
              url += '?' + searchParams.toString()
          }

          if (body) fetchOption.body = JSON.stringify(body);
          const result = await fetch(url, fetchOption)
          const json = await result.json()
          return json
      } catch (e) {
          console.log(e)
      }
  }

  export const graphqlFetcher = (query: RequestDocument, variables = {}) => request(
      BASE_URL, query, variables
  )

  export const QueryKeys = {
      PRODUCTS: 'PRODUCTS',
      CART: 'CART'
  }
