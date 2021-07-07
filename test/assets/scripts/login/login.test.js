var expect = chai.expect;

define(['../../../../assets/scripts/login/login'], function(){
    describe('Login', function(){
        it('should return correct json data', function(){
            checkCredential('Baechu', 'asdasdQ1');

            expectedData = {
                "username": 'Baechu',
                "password": 'asdasdQ1'
            }

            expect(credentialData).to.eql(expectedData);
        });

        it('should create the right token', function(){
            createToken('7F543DEC8661FD1BDCE5F89D0595FAB2-ADMIN');

            expectedData = "token=7F543DEC8661FD1BDCE5F89D0595FAB2-ADMIN";

            expect(token).to.eql(expectedData);
        })
    })
})