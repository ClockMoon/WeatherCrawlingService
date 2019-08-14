import { mount } from "enzyme";
import LocationSelect from "./index";
import { Provider } from "react-redux";
import store from "../../store";
describe("locationSelect 컴포넌트 테스트.", () => {
  it("locationSelect 컴포넌트가 렌더링됩니다.", () => {
    const component = mount(
      <Provider store={store()}>
        <LocationSelect />
      </Provider>
    );
    const locationSelectContainer = component.find(".locationSelectContainer");
    expect(locationSelectContainer.debug()).toMatchSnapshot();
  });
});
