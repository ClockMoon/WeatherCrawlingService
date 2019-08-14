import { shallow, mount } from "enzyme";
import { PreviousMoveButton } from "./index";
import { Provider } from "react-redux";
import store from "../../store";
describe("PreviousMoveButton 컴포넌트 테스트.", () => {
  it("PreviousMoveButton 컴포넌트가 렌더링됩니다.", () => {
    const previousMoveButton = shallow(<PreviousMoveButton />);
    const previousContainer = previousMoveButton.find(".previousContainer");
    expect(previousContainer.debug()).toMatchSnapshot();
  });
});
