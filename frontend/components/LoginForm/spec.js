import { mount } from "enzyme";
import LoginForm from "./index";
import { Provider } from "react-redux";
import store from "../../store";
describe("LoginForm 컴포넌트 테스트.", () => {
  it("LoginForm 컴포넌트가 렌더링됩니다.", () => {
    const component = mount(
      <Provider store={store()}>
        <LoginForm />
      </Provider>
    );
    const loginFormContainer = component.find(".loginFormContainer");
    expect(loginFormContainer.debug()).toMatchSnapshot();
  });
});
