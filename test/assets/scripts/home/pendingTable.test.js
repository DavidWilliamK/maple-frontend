var expect = chai.expect;

define(['../../../../assets/scripts/home/pendingTable'], function(){
    describe('Pending Table', function(){
        it('should make the right pagination component', function(){
            let result = createPagination(2, 0);
            
            var expectedData = '<ul><li class="page-number active"><a>1</a></li><li class="page-number no"><a>2</a></li><li class="page-item next no"><a>&raquo;</a></li></ul>'

            expect(result).to.eql(expectedData);
        });
    })
})