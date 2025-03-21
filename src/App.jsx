import WiniProvider, { Route } from "wini-web-components";
import config from "./config";
import './App.css';
import { PageView } from "./screen/layout";
import LoginView from "./screen/module/login/login";
export default function App() {
    return <WiniProvider
        pid={config.pid}
        url={config.url}
        imgUrlId={config.imgUrlId}
    >
        <Route path="/login" element={<LoginView />} />
        <Route path="/*" element={<PageView />} />
        {/* <Route path="/login" element={<LoginView />} /> */}
        {/* <Route path="/*" element={checkToken() ? <MainLayout /> : <Navigate to={'/login'} replace />} /> */}
    </WiniProvider>
}