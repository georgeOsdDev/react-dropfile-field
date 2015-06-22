'use strict';
import chai from 'chai';
let expect = chai.expect;
import Helper from '../../lib/helper/Helper';

describe('Test of Helper', () => {

  describe('Helper offer merge helper', () => {
    let src = {
      color:'red',
      fontSize:'10px'
    };

    let src2 = {
      color: 'blue',
      textAlign: 'center'
    };

    it('merge source style with other style', (done) => {
      let result = Helper.merge(src, src2);
      expect(result).to.be.eql({
        color: 'blue',
        fontSize:'10px',
        textAlign: 'center'
      });
      done();
    });
  });

  describe('Helper offer getFileExtension helper', () => {
    const image = 'file.jpg';
    const image2 = 'file.jpg.png';
    const pdf = 'file.pdf';
    const unknown = 'file';

    it('detect extention', () => {
      let result1 = Helper.getFileExtension(image);
      expect(result1).to.be.eql('jpg');

      let result2 = Helper.getFileExtension(image2);
      expect(result2).to.be.eql('png');

      let result3 = Helper.getFileExtension(pdf);
      expect(result3).to.be.eql('pdf');

      let resul4 = Helper.getFileExtension(unknown);
      expect(resul4).to.be.eql('');
    });
  });
});
