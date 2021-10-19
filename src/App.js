import { Provider as MobxProvider } from "mobx-react";
import { Provider as ReduxProvider } from "react-redux";
import Router from "router";
import mobxStores from "mobxStore";
import reduxStore from "reduxStore";
import { RecoilRoot } from "recoil";
import reduxToolkit from "reduxToolkitStore/";

function App() {
  return (
    <MobxProvider {...mobxStores}>
      <ReduxProvider store={reduxStore}>
        <ReduxProvider store={reduxToolkit}>
          <RecoilRoot>
            <div className="text-base">
              <Router />
            </div>
          </RecoilRoot>
        </ReduxProvider>
      </ReduxProvider>
    </MobxProvider>
  );
}

export default App;
