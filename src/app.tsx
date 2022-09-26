import { QueryClientProvider } from 'react-query';
import { useRoutes } from 'react-router';
import { routes } from './routes';
import { getClient } from './queryClient'
import {ReactQueryDevtools} from 'react-query/devtools'
import Gnb from "./component/gnb";
import {RecoilRoot} from "recoil";

function app() {
    const elem = useRoutes(routes);
    const queryClient = getClient();

   return (
    <QueryClientProvider client={queryClient}>
        <RecoilRoot>
            <Gnb />
            {elem}
            <ReactQueryDevtools initialIsOpen={false} />
        </RecoilRoot>
    </QueryClientProvider>
   )
}

export default app;
