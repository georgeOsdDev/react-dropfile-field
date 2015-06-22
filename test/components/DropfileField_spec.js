'use strict';
import React from 'react/addons';
import chai from 'chai';
let expect = chai.expect;

import DropfileField from '../../lib/components/DropfileField';
const {TestUtils} = React.addons;

describe('Test of Tabs', () => {
  let component;

  beforeEach(() => {
    // component = TestUtils.renderIntoDocument(<Tabs></Tabs>);
  });

  it('should have default properties', function () {
    component = TestUtils.renderIntoDocument(<DropfileField/>);

    expect(component.props.textField).to.be.an('object');
    expect(component.props.iconClassNamesByExtension).to.be.an('object');
    expect(component.props.onDrop).to.be.an('function');
  });


  // @TODO
  // How to test drop file input?

});
