const expect=require('expect');
const {Users}=require('./users');
describe('Users',()=>{
	var users;
	beforeEach(()=>{
		users=new Users();
		users.users=[{
			id:'1',
			name:'Tanish',
			room:'T1'
		},{
			id:'2',
			name:'Hardik',
			room:'T2'
		},{
			id:'3',
			name:'Sakshi',
			room:'T1'
		}]
	});

	it('should add new user',()=>{
		var users=new Users ();
		var user={
			id:'123',
			name:'Tanish',
			room:'T1'
		};
		var resUser=users.addUser(user.id,user.name,user.room);

		expect(users.users).toEqual([user]);
	});
	it('should find a user',()=>{
		var userId='2';
		var user=users.getUser(userId);

		expect(user.id).toBe(userId);
	});
	it('should not find a user',()=>{
		var userId='99';
		var user=users.getUser(userId);

		expect(user).toBeFalsy();
	});
	it('should remove a user',()=>{
		var userId='1';
		var user=users.removeUser(userId);

		expect(user.id).toBe(userId);
		expect(users.users.length).toBe(2);
	});
	it('should not remove a user',()=>{
		var userId='99';
		var user=users.removeUser(userId);
		
		expect(user).toBeFalsy();
		expect(users.users.length).toBe(3);
	});
	it('should return users for T1',()=>{
		var userList=users.getUserList('T1');

		expect(userList).toEqual(['Tanish','Sakshi']); 
	});
	it('should return users for T2',()=>{
		var userList=users.getUserList('T2');

		expect(userList).toEqual(['Hardik']); 
	});
})