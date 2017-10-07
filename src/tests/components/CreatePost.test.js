import React from 'react'
import { mount } from 'enzyme'
import CreatePost from '../../components/CreatePost'
import { configure } from 'enzyme';

describe('CreatePost', () => {
  let component

  beforeEach(() => {
    component = mount(<CreatePost />)
  })

  it('should render a form with the correct inputs', () => {
    expect(component.contains(<form></form>)).toEqual(true);
    expect(component.contains(<input type="text" />)).toEqual(true);
    //expect(component.contains(<form></form>)).toEqual(true);
  })

})
