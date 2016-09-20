'use strict';
import React from 'react';
import chai from 'chai';
const expect = chai.expect;

import DropfileField from '../../src/components/DropfileField';
import TestUtils from 'react-addons-test-utils';

describe('Test of DropfileField', () => {
  let component;

  beforeEach(() => {
    // component = TestUtils.renderIntoDocument(<Tabs></Tabs>);
  });

  describe('Test of default props', () => {
    it('should have default properties', () => {
      component = TestUtils.renderIntoDocument(<DropfileField/>);

      expect(component.props.textField).to.be.an('object');
      expect(component.props.iconClassNamesByExtension).to.be.an('object');
      expect(component.props.maxFileCount).to.be.eql(1);
      expect(component.props.onDrop).to.be.an('function');
    });
  });

  describe('Test of preview image', () => {
    const canvas = document.createElement('canvas');
    let file1;
    let file2;
    beforeEach((done) => {
      let d1 = false;
      let d2 = false;

      canvas.toBlob(
        (blob) => {
          file1 = blob;
          d1 = true;
          if (d1 && d2) done();
        },
        'image/jpeg'
      );

      canvas.toBlob(
        (blob) => {
          file2 = blob;
          d2 = true;
          if (d1 && d2) done();
        },
        'text/html'
      );
    });

    it('should render preview image with default style', () => {
      component = TestUtils.renderIntoDocument(<DropfileField maxFileCount={2}/>);
      component.setFiles([file1, file2]);
      const preview = TestUtils.scryRenderedDOMComponentsWithClass(component, 'df-preview')[0];
      const previewImage = preview.getElementsByTagName('img')[0];
      expect(previewImage.style.width).to.be.eql('100%');
    });

    it('should render preview image with custom style', () => {
      component = TestUtils.renderIntoDocument(<DropfileField maxFileCount={2} previewImageStyle={{ width: '90px' }}/>);
      component.setFiles([file1, file2]);
      const preview = TestUtils.scryRenderedDOMComponentsWithClass(component, 'df-preview')[0];
      const previewImage = preview.getElementsByTagName('img')[0];
      expect(previewImage.style.width).to.be.eql('90px');
    });
  });

  describe('Test of preview icon', () => {
    const canvas = document.createElement('canvas');
    let file1;
    const file2 = new Blob(['<html></html>'], { type: 'text/html' });
    beforeEach((done) => {
      canvas.toBlob(
        (blob) => {
          file1 = blob;
          done();
        },
        'image/jpeg'
      );
    });

    it('should render preview icon with default style', () => {
      component = TestUtils.renderIntoDocument(<DropfileField maxFileCount={2}/>);
      component.setFiles([file1, file2]);
      const preview = TestUtils.scryRenderedDOMComponentsWithClass(component, 'df-preview')[1];
      const previewIcon = preview.getElementsByTagName('icon')[0];
      expect(previewIcon.style.fontSize).to.be.eql('200%');
    });

    it('should render preview icon with custom style', () => {
      component = TestUtils.renderIntoDocument(<DropfileField maxFileCount={2} previewIconStyle={{ fontSize: '90px' }}/>);
      component.setFiles([file1, file2]);
      const preview = TestUtils.scryRenderedDOMComponentsWithClass(component, 'df-preview')[1];
      const previewIcon = preview.getElementsByTagName('icon')[0];
      expect(previewIcon.style.fontSize).to.be.eql('90px');
    });

    it('should render preview icon without className', () => {
      component = TestUtils.renderIntoDocument(<DropfileField maxFileCount={2} />);
      component.setFiles([file1, file2]);
      const preview = TestUtils.scryRenderedDOMComponentsWithClass(component, 'df-preview')[1];
      const previewIcon = preview.getElementsByTagName('icon')[0];
      expect(previewIcon.className).to.be.eql('');
    });

    it('should render preview icon with specified className', () => {
      component = TestUtils.renderIntoDocument(<DropfileField maxFileCount={2} iconClassNamesByExtension={{ default: 'myIcon' }}/>);
      component.setFiles([file1, file2]);
      const preview = TestUtils.scryRenderedDOMComponentsWithClass(component, 'df-preview')[1];
      const previewIcon = preview.getElementsByClassName('myIcon');
      expect(previewIcon).to.be.length(1);
    });
  });


  describe('Test of file handling', () => {
    const canvas = document.createElement('canvas');
    let file1;
    let file2;
    beforeEach((done) => {
      let d1 = false;
      let d2 = false;

      canvas.toBlob(
        (blob) => {
          file1 = blob;
          d1 = true;
          if (d1 && d2) done();
        },
        'image/jpeg'
      );

      canvas.toBlob(
        (blob) => {
          file2 = blob;
          d2 = true;
          if (d1 && d2) done();
        },
        'text/html'
      );
    });

    it('should call onDrop prop when files dropped to component', () => {
      let result;
      let called;
      component = TestUtils.renderIntoDocument(<DropfileField onDrop={(e, files) => {called = true; result = files; }}/>);
      component.setFiles([file1]);
      expect(called).to.be.eql(true);
      expect(result).to.be.an('array');
      expect(result[0]).to.be.eql(file1);
    });

    it('should call onDrop with files limited by maxFileCount prop', () => {
      let result;
      let called;
      component = TestUtils.renderIntoDocument(<DropfileField maxFileCount={2} onDrop={(e, files) => {called = true; result = files; }}/>);
      component.setFiles([file1, file2, file1]);
      expect(called).to.be.eql(true);
      expect(result).to.be.an('array');
      expect(result).to.be.length(2);
      expect(result[0]).to.be.eql(file1);
      expect(result[1]).to.be.eql(file2);
    });

    it('should call onFileClear when file cleared', () => {
      let called;
      component = TestUtils.renderIntoDocument(<DropfileField maxFileCount={2} onFileClear={() => {called = true; }}/>);
      component.setFiles([file1, file2, file1]);
      component.clearFiles();
      expect(called).to.be.eql(true);
    });

    it('should clear files when no file passed', () => {
      let called;
      component = TestUtils.renderIntoDocument(<DropfileField maxFileCount={2} onFileClear={() => {called = true; }}/>);
      component.setFiles([file1]); // set file
      component.setFiles([]); // set empty list
      expect(called).to.be.eql(true);
    });
  });

  // @TODO
  // How to test drop file input?
});
