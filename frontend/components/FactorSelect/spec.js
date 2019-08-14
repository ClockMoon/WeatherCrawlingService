import { mount } from "enzyme";
import FactorSelect from "./index";
import { Provider } from "react-redux";
import store from "../../store";
describe("FactorSelect 컴포넌트 테스트.", () => {
  it("FactorSelect가 정상적으로 렌더링 됩니다.", () => {
    const component = mount(
      <Provider store={store()}>
        <FactorSelect />
      </Provider>
    );
    const factorSelectContainer = component.find(".factorSelectContainer");
    expect(factorSelectContainer.debug()).toMatchSnapshot();
  });
});
