const expect=require('expect');
var {isRealString}=require('./validation');
describe('isRealString',()=>{
	it('It Should reject a non-valid String',()=>{
		var res=isRealString(98);
		expect(res).toBe(false);
	});
	it('It Should reject string with only spaces',()=>{
		var res=isRealString(' ');
		expect(res).toBe(false);
	});
	it('It Should allow a valid String',()=>{
		var res=isRealString('  12  ');
		expect(res).toBe(true);
	});

});
