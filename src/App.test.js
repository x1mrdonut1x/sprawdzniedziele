import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('checks if last sunday', () => {
  let mockState = {
    isTodayTheLastSunday: true,
    isSunday: true
  }
  const wrapper = shallow(<App />);
  wrapper.setState({ ...mockState });
  const text = wrapper.find('.Text'); 
  expect(text.text()).toEqual('TAK');
});

it('checks if not last sunday', () => {
  let mockState = {
    isTodayTheLastSunday: false,
    isSunday: true
  }
  const wrapper = shallow(<App />);
  wrapper.setState({ ...mockState });
  const text = wrapper.find('.Text'); 
  const subtext = wrapper.find('.Subheader'); 

  expect(text.text()).toEqual('NIE');
  expect(subtext).toEqual({});
});

it('checks if not last sunday but day of week', () => {
  let mockState = {
    isTodayTheLastSunday: false,
    isSunday: false
  }
  const wrapper = shallow(<App />);
  wrapper.setState({ ...mockState });
  const text = wrapper.find('.Text'); 
  const subtext = wrapper.find('.Subheader');

  expect(text.text()).toEqual('NIE');
  expect(subtext.text()).toEqual('ale dzisiaj zrobisz zakupy!');
});
