import { mount } from "enzyme";
import DashBoard from "./index";
import { Provider } from "react-redux";
import store from "../../store";
describe("DashBoard 컴포넌트 테스트.", () => {
  it("DashBoard가 정상적으로 렌더링됩니다.", () => {
    const component = mount(
      <Provider store={store()}>
        <DashBoard />
      </Provider>
    );
    const dashboardContainer = component.find(".dashboardContainer");
    expect(dashboardContainer.debug()).toMatchSnapshot();
  });
});
