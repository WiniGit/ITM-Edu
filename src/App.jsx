import WiniProvider, { Route } from "wini-web-components";
import config from "./config";
import './App.css';
import { PageView } from "./screen/layout";
import LoginView from "./screen/module/login/login";
import CourseView from "./screen/module/course/course";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {
    return (
      <GoogleOAuthProvider clientId={config.ggClientId}>
        <WiniProvider
          pid={config.pid}
          url={config.url}
          imgUrlId={config.imgUrlId}
        >
          <Route path="/login" element={<LoginView />} />
          <Route path="/course" element={<CourseView />} />
          {/* <Route path="/login" element={<LoginView />} /> */}
          {/* <Route path="/*" element={checkToken() ? <MainLayout /> : <Navigate to={'/login'} replace />} /> */}
        </WiniProvider>
      </GoogleOAuthProvider>
    );
}