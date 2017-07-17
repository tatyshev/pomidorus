import { mount } from 'avoriaz';
import Root from './Root.vue';

let root = null;
let state = null;
let button = null;

beforeEach(() => {
  root = mount(Root);
  state = root.vm.$refs.state;
  button = root.vm.$refs.button;
});

describe('initial', () => {
  it('should set initial values', () => {
    expect(state).toBeInstanceOf(HTMLElement);
    expect(button).toBeInstanceOf(HTMLElement);
    expect(state.innerHTML).toBe('0');
  });

  it('should increment state when button clicked', (done) => {
    button.click();
    button.click();

    root.vm.$nextTick(() => {
      expect(state.innerHTML).toBe('2');
      done();
    });
  });
});
