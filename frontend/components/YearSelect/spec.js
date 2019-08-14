import { mount } from "enzyme";
import YearSelect from "./index";
import { Provider } from "react-redux";
import store from "../../store";
describe("YearSelect 컴포넌트 테스트.", () => {
  it("YearSelect 컴포넌트가 렌더링됩니다.", () => {
    const component = mount(
      <Provider store={store()}>
        <YearSelect />
      </Provider>
    );
    const yearSelectContainer = component.find(".yearSelectContainer");
    expect(yearSelectContainer.debug()).toMatchSnapshot();
  });
});
