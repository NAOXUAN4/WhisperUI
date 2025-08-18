import { describe, test, assert } from "vitest";
import { mount } from "@vue/test-utils";
import WsButton from "./Button.vue";

describe('ButtonTestSet', () => {
  test('测试按钮基本属性', () => {
    const wrapper = mount(WsButton, {
      props: {
        type: 'primary',
        plain: true
      },
      slots: {
        default: 'testButton'
      }
    });

    // 断言组件渲染正确
    assert.isTrue(wrapper.classes().includes('ws-button'), '应该包含基础按钮类');
    assert.isTrue(wrapper.classes().includes('ws-button--primary'), '应该包含 primary 类型样式');
    assert.isTrue(wrapper.classes().includes('is-plain'), '应该包含 plain 样式');
    assert.strictEqual(wrapper.text(), 'testButton', '按钮文本应该正确显示');

    // 断言不包含未设置的类
    assert.isFalse(wrapper.classes().includes('is-disabled'), '不应该包含 disabled 类');
    assert.isFalse(wrapper.classes().includes('is-round'), '不应该包含 round 类');
    assert.isFalse(wrapper.classes().includes('is-circle'), '不应该包含 circle 类');
  });

  test('测试按钮禁用状态', () => {
    const wrapper = mount(WsButton, {
      props: {
        disabled: true
      },
      slots: {
        default: 'Disabled Button'
      }
    });

    assert.isTrue(wrapper.classes().includes('is-disabled'), '应该包含 disabled 类');
    assert.isTrue(wrapper.attributes().hasOwnProperty('disabled'), '应该有 disabled 属性');
  });
});
