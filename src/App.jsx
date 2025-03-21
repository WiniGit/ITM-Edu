import WiniProvider, { Route } from "wini-web-components";
import config from "./config";
import './App.css';

export default function App() {
    return <WiniProvider
        pid={config.pid}
        url={config.url}
        imgUrlId={config.imgUrlId}
    >
        <Route path="/*" element={<PageView />} />
        {/* <Route path="/login" element={<LoginView />} /> */}
        {/* <Route path="/*" element={checkToken() ? <MainLayout /> : <Navigate to={'/login'} replace />} /> */}
    </WiniProvider>
}