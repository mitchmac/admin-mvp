import dynamic from "next/dynamic";
import { TinaEditProvider } from "tinacms/dist/edit-state";
const TinaCMS = dynamic(() => import("tinacms"), { ssr: false });

const App = ({ Component, pageProps }) => {
    // @TODO: does this work for builds and hosted use?
    let isLocal = (typeof window === 'undefined' || window.location.hostname === 'localhost');

    return (
        <>
            <TinaEditProvider
                showEditButton={true}
                editMode={
                    <TinaCMS
                        branch="main"
                        isLocalClient={isLocal}
                        clientId={process.env.NEXT_PUBLIC_TINA_CLIENT_ID || ''}
                        cmsCallback={(cms) => {
                            cms.flags.set("tina-admin", true);
                        }}
                        {...pageProps}
                    >
                        {(livePageProps) => (
                            <Component {...livePageProps} />
                        )}
                    </TinaCMS>
                }
            >
                <Component {...pageProps} />
            </TinaEditProvider>
        </>
    );
};

export default App;