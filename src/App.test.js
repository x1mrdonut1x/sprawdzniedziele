import App from './App';
import {OPEN_DAYS} from './App'
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
  const wrapper = shallow(<App />);
  const instance = wrapper.instance();
  
  for (let i = 0; i < OPEN_DAYS.length; ++i) {
    let test = instance.isShopSunday(moment(OPEN_DAYS[i]));
    expect(test).toBe(true);
  }

});

it('checks if not last sunday', () => {
  let mockState = {
    isTodayOpen: false,
    isSunday: true
  }
  const wrapper = shallow(<App />);
  wrapper.setState({ ...mockState });
  const title = wrapper.find('.Text'); 
  const subtext = wrapper.find('.Subheader'); 
  
  expect(title.text()).toEqual('NIE');
  expect(subtext).toEqual({});
});

it('checks if not last sunday', () => {
  let mockState = {
    isTodayOpen: true,
    isSunday: true
  }
  const wrapper = shallow(<App />);
  wrapper.setState({ ...mockState });
  const title = wrapper.find('.Text'); 
  const subtext = wrapper.find('.Subheader'); 
  
  expect(title.text()).toEqual('TAK!');
  expect(subtext).toEqual({});
});
