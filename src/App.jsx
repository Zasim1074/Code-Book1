import { HashRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./screens/HomeScreen";
import { PlaygroundScreen } from "./screens/PlaygroundScreen";
import { PlaygroundProvider } from "./Providers/PlaygroundProviders";
import { ModalProvider } from "./Providers/ModalProvider";
import PrivateRoute from "./Components/PrivateRoute";
import Auth from "./screens/Auth/AuthPage";

export default function App() {
  return (
    <>
      <PlaygroundProvider>
        <ModalProvider>
          <HashRouter>
            <Routes>
              <Route path="" element={<Auth />} />
              {/* Protected Routes */}
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <HomeScreen />
                  </PrivateRoute>
                }
              />
              <Route
                path="/playground/:fileId/:folderId"
                element={
                  <PrivateRoute>
                    <PlaygroundScreen />
                  </PrivateRoute>
                }
              />
            </Routes>
          </HashRouter>
        </ModalProvider>
      </PlaygroundProvider>
    </>
  );
}
