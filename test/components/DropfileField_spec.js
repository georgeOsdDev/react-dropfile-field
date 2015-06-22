'use strict';
import React from 'react/addons';
import chai from 'chai';
let expect = chai.expect;

import DropfileField from '../../lib/components/DropfileField';
const {TestUtils} = React.addons;

describe('Test of DropfileField', () => {
  let component;

  beforeEach(() => {
    // component = TestUtils.renderIntoDocument(<Tabs></Tabs>);
  });

  describe('Test of default props', () => {
    it('should have default properties', function () {
      component = TestUtils.renderIntoDocument(<DropfileField/>);

      expect(component.props.textField).to.be.an('object');
      expect(component.props.iconClassNamesByExtension).to.be.an('object');
      expect(component.props.maxFileCount).to.be.eql(1);
      expect(component.props.onDrop).to.be.an('function');
    });
  });

  describe('Test of file handling', () => {

    let canvas = document.createElement('canvas');
    let file1, file2;
    beforeEach((done) => {
      canvas.toBlob(
        function (blob) {
          file1 = blob;
        },
        'image/jpeg'
      );

      canvas.toBlob(
        function (blob) {
          file2 = blob;
          done();
        },
        'text/html'
      );
    });

    it('should call onDrop prop when files dropped to component', function () {
      let result, called;
      component = TestUtils.renderIntoDocument(<DropfileField onDrop={(e, files) => {called = true; result = files}}/>);
      component.setFiles([file1]);
      expect(called).to.be.eql(true);
      expect(result).to.be.an('array');
      expect(result[0]).to.be.eql(file1);

    });

    it('should call onDrop with files limited by maxFileCount prop', function () {
      let result, called;
      component = TestUtils.renderIntoDocument(<DropfileField maxFileCount={2} onDrop={(e, files) => {called = true; result = files}}/>);
      component.setFiles([file1, file2, file1]);
      expect(called).to.be.eql(true);
      expect(result).to.be.an('array');
      expect(result).to.be.length(2);
      expect(result[0]).to.be.eql(file1);
      expect(result[1]).to.be.eql(file2);
    });


  })


  // @TODO
  // How to test drop file input?



});
