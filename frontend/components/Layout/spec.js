import { mount } from "enzyme";
import Layout from "./index";
import { Provider } from "react-redux";
import store from "../../store";
describe("Layout 컴포넌트 테스트.", () => {
  it("Layout의 header가 렌더링됩니다.", () => {
    const component = mount(
      <Provider store={store()}>
        <Layout />
      </Provider>
    );
    const header = component.find(".header");
    expect(header.debug()).toMatchSnapshot();
  });
});
