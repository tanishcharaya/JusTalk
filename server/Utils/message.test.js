var expect=require('expect');
var {generateMessage,generateLocationMessage}=require('./message'); 
	describe('generateMessage',()=>{
		it('should generate correct message object',()=>{
			 var from='tanish';
			 var text='Some Message';
			 var message=generateMessage(from,text);
			 expect(typeof message.createdAt).toBe('number');
			 expect(message).toMatchObject({from,text});
		});
});

	describe('generateLocationMessage',()=>{
		it('should generate valid generateLocationMessage object',()=>{
			var from='tanish';
			var latitude=10,
				longitude=15;
			var url='https://www.google.com/maps?q=10,15';
			var message=generateLocationMessage(from,latitude,longitude);
			expect(typeof message.createdAt).toBe('number');
			expect(message).toMatchObject({from,url});
		});
	});