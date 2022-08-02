@Istest
public class ControllerTest {
    private class ExampleCalloutMock implements HttpCalloutMock{
        public HttpResponse respond(HTTPRequest req){
            HttpResponse res = new HttpResponse();
            res.setStatus('OK');
            res.setStatusCode(200);
            res.setBody('SUCCESS');
            return res;
        }
    }
    
    static testMethod void ControllerTestMethod(){
        Test.startTest();
        
        Test.setMock(HttpCalloutMock.class, new ExampleCalloutMock());
        
        Map<String, String> Credit = new Map<String, String>();
        Credit.put('creditorName', 'CBNA');
        Credit.put('firstName', 'Suman');
        Credit.put('lastName', 'Tester79');
        Credit.put('minPaymentPercentagetName', '2.00');
        Credit.put('balance', '1363.00');
        Controller.getAndParse();
        Test.stopTest();
    }
}