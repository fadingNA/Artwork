import {SWRConfig} from "swr";
import Layout from "@/components/layout/Layout";
import "../styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../public/data/validObjectIDList.json'
import {SSRProvider} from "react-bootstrap";
import RouteGuard from "@/components/routeguard/RouteGuard";


function MyApp({Component, pageProps}) {
    return (

        <SSRProvider
            // add SSR PROVIDER To ensure consistent ids are generated between the client and sv.
        >
            <SWRConfig
                value={{
                    fetcher: async (url) => {
                        const res = await fetch(url);

                        // If the status code is not in the range 200-299,
                        // we still try to parse and throw it.
                        if (!res.ok) {
                            const error = new Error("An error occurred while fetching the data.");
                            // Attach extra info to the error object.
                            error.info = await res.json();
                            error.status = res.status;
                            throw error;
                        }
                        return res.json();
                    },
                }}>
                <RouteGuard>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
                </RouteGuard>
            </SWRConfig>
        </SSRProvider>
    );
}

export default MyApp;
